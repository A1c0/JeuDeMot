const {Database} = require('arangojs');
const R = require('ramda');
const {
	wordMatch,
	wordMatchId,
	synRelationForWord,
	posRelationForWord,
	familyRelationForWord,
	associatedRelationForWord,
	getAllVarianteRelations,
	varianteRelationForWord
} = require('./lib/queries.js');
const {
	parseFile,
	cleanPhrases,
	listAllWords
} = require('./lib/util-functions.js');
const {preprocessing} = require('./lib/preprocessing');
const Save = require('./lib/result-save');

const db = new Database();

const tabSentence = [
	'M.C.P.A.',
	'chiffre',
	'2'
];

const tabWord = [
	'faire',
	'randonnée',
	'voyager'
];

const computeRelScore = async tabWord =>
	new Promise(resolve => {
		tabWord.forEach(async word => {
			const wwMax = (1 / word.max.ww);
			const wRelMax = (1 / word.max.wRel);
			word.res.forEach(async res => {
				res.score = ((res.ww * wwMax) * 0.5) + ((res.wRel * wRelMax) * 0.5);
			});
		});
		tabWord.forEach(word => {
			word.res.sort((a, b) => b.score - a.score);
		});
		resolve(tabWord);
	});

const getMaxScore = async tabWord =>
	new Promise(resolve => {
		tabWord.forEach(async word => {
			const max = {ww: 0, wRel: 0};
			word.res.forEach(async res => {
				if (res.ww > max.ww) {
					max.ww = res.ww;
				}

				if (res.wRel > max.wRel) {
					max.wRel = res.wRel;
				}
			});
			word.max = max;
		});
		resolve(tabWord);
	});

const listWord = async tabWord => {
	const tabRes = [];
	await tabWord.reduce(async (promise, word) => {
		await promise;
		const wRef = await wordMatch(word.word, db);
		if (wRef._result.length > 0) {
			tabRes.push({
				word: word.word,
				originalWord: word.originalWord,
				ww: wRef._result[0].weight,
				res: await getClosestWord(wRef._result[0]._id)
			});
		} else {
			tabRes.push({
				word: word.word,
				originalWord: word.originalWord,
				ww: 0,
				res: []
			});
		}
	}, Promise.resolve());
	return new Promise(resolve => {
		getMaxScore(tabRes).then(resWithMax => {
			computeRelScore(resWithMax).then(resWithScore => {
				resolve(resWithScore);
			});
		});
	});
};

const getClosestWord = async wordID => {
	const resRelSyn = await synRelationForWord(wordID, db);
	const resRelAssociated = await associatedRelationForWord(wordID, db);
	const rels = resRelSyn._result.concat(resRelAssociated._result);
	const tabRel = [];
	await rels.reduce(async (promise, res) => {
		await promise;
		const wRef1 = await wordMatchId(res._from, db);
		let wRef2 = await wordMatchId(res._to, db);
		wRef2 = wRef2._result[0];
		if (wRef1 !== undefined && wRef2 !== undefined) {
			if (wRef1.word !== '_COM' && wRef2.word !== '_COM') {
				tabRel.push({
					word: wRef2.word,
					ww: wRef2.weight,
					wRel: res.weight
				});
			}
		}
	}, Promise.resolve());
	return tabRel.sort((a, b) => b.wRel - a.wRel)
		.splice(0, 10);
};

const getTagsBySentence = R.curry(async (tabSentence, tabRelWord) => {
	return new Promise(resolve => {
		const tabRes = [];
		tabSentence.forEach(sentence => {
			const tabResToPush = {sentence, tags: []};

			sentence.toString().split(' ')
				.forEach(wordFromSentence => {
					getIndexWordInTabRel(wordFromSentence, tabRelWord)
						.then(index => {
							if (index >= 0) {
								tabResToPush.tags.push(tabRelWord[index].word);
								tabRelWord[index].res
									.forEach(a => tabResToPush.tags.push(a.word));
							}
						});
				});
			tabRes.push(tabResToPush);
		});
		resolve(tabRes);
	});
});

const getIndexWordInTabRel = async (word, tabRelWord) => {
	return new Promise(resolve => {
		for (let i = 0; i < tabRelWord.length; i++) {
			if (tabRelWord[i].originalWord === word) {
				resolve(i);
			}
		}

		resolve(-1);
	});
};

const sortAndFilter = async tabWord => {
	return new Promise(resolve => {
		tabWord.forEach(word => {
			word.res = word.res.splice(0, 3)
				.filter(res => res.ww > word.ww);
		});
		resolve(tabWord);
	});
};

const listSentenceByTag = async tabSentence => {
	const tabRes = [];
	await tabSentence.reduce(async (promise, sentenceItem) => {
		await promise;
		await sentenceItem.tags.forEach(tagFromSentence => {
			getIndexTag(tagFromSentence, tabRes).then(index => {
				if (index >= 0) {
					tabRes[index].sentences.push(sentenceItem.sentence);
				} else {
					tabRes.push(
						{tag: tagFromSentence, sentences: [sentenceItem.sentence]});
				}
			});
		});
	}, Promise.resolve());
	return tabRes;
};

const getIndexTag = async (tag, tabTag) => {
	return new Promise(resolve => {
		for (let i = 0; i < tabTag.length; i++) {
			if (tag === tabTag[i].tag) {
				resolve(i);
			}
		}

		resolve(-1);
	});
};

const groupSameSentenceTag = async tabTagSentence => {
	const tabRes = [];
	const tabTagDone = [];

	return new Promise(resolve => {
		tabTagSentence.reduce(async (promise, tag1) => {
			await Promise;
			await computeTabEqual(tag1, tabTagSentence).then(tabTagEqual => {
				console.log('tabTagEqual');
				console.log(JSON.stringify(tabTagEqual, null, 1));
				if (tabTagEqual.length > 1) {
					const newTag = {tag: [], sentences: []};
					newTag.sentences = tabTagSentence[tabTagEqual[0]].sentences;
					tabTagEqual.forEach(index => {
						newTag.tag.push(tabTagSentence[index].tag);
					});
					if (newTag.sentences.length > 1) {
						console.log('if > 1 :');
						tabTagSentence.push(newTag);
						console.log('foreach');
						tabTagEqual.forEach(index => {
							console.log('index : ');
							console.log(index);
							console.log(JSON.stringify(tabTagSentence[index], null, 1));
							tabTagSentence.splice(index, 1);
						});
					}
				}
			});
		}, Promise.resolve());
		resolve(tabTagSentence);
	});
};

const sameSentences = (a, b) => R.equals(R.prop('sentences', a), R.prop('sentences', b));

const concatValues = (k, l, r) => k === 'sentences' ? R.uniq(R.concat(l, r)) :
	R.concat(R.concat(l, ' '), r);

const mergeObject = (a, b) => R.mergeWithKey(concatValues, a, b);

const groupSentences = R.pipe(
	R.groupWith(sameSentences),
	R.map(R.reduce(mergeObject, [])),
);

const computeTabEqual = async (tag1, tabTagSentence) => {
	return new Promise(resolve => {
		const tabTagEqual = [];
		for (let i = 0; i < tabTagSentence.length; i++) {
			arrayEqualArray(tag1.sentences, tabTagSentence[i].sentences)
				.then(equal => {
					if (equal) {
						tabTagEqual.push(i);
					}
				});
		}

		resolve(tabTagEqual);
	});
};

const tagEqualTag = async (tag1, tag2) => {
	return (JSON.stringify(tag1) === JSON.stringify(tag2));
};

const arrayEqualArray = async (array1, array2) => {
	return new Promise(resolve => {
		if (array1.length === array2.length) {
			array1.forEach(item => {
				if (array2.indexOf(item) < 0) {
					resolve(false);
				}
			});
			resolve(true);
		} else {
			resolve(false);
		}
	});
};

const sortTagByNumberOfSentences = tabTag => {
	return new Promise(resolve => {
		tabTag.sort((a, b) => b.sentences.length - a.sentences.length);
		resolve(tabTag);
	});
};

const testPosRelations = async tabWord => {
	const tabRes = [];
	await tabWord.reduce(async (promise, word) => {
		await promise;
		const wRef = await wordMatch(word, db);
		if (wRef._result.length > 0) {
			tabRes.push({
				word,
				res: await getPosWord(wRef._result[0]._id)
			});
		} else {
			tabRes.push({
				word,
				ww: 0,
				res: []
			});
		}
	}, Promise.resolve());
	return tabRes;
};

const getPosWord = async wordID => {
	const resRelPos = await posRelationForWord(wordID, db);
	const tabRel = [];
	await resRelPos.reduce(async (promise, res) => {
		await promise;
		const wRef1 = await wordMatchId(res._from, db);
		let wRef2 = await wordMatchId(res._to, db);
		wRef2 = wRef2._result[0];
		if (wRef1 !== undefined && wRef2 !== undefined) {
			tabRel.push({
				word: wRef2.word,
				wRel: res.weight
			});
		}
	}, Promise.resolve());
	return tabRel.sort((a, b) => b.wRel - a.wRel)
		.splice(0, 3);
};

const filterWordsByPos = async tabPos => {
	return new Promise(resolve => {
		const tabRes = [];
		for (let i = 0; i < tabPos.length; i++) {
			let usefull = true;
			tabPos[i].res.forEach(pos => {
				if (usefull) {
					switch (pos.word.substring(0, 4)) {
						case 'Pre:':
							usefull = false;
							break;
						case 'Pro:':
							usefull = false;
							break;
						case 'Det:':
							usefull = false;
							break;
						default:
							break;
					}
				}
			});
			if (usefull) {
				tabRes.push(tabPos[i].word);
			}
		}

		resolve(tabRes);
	});
};

const tagToOutput = async tabTag => {
	await tabTag.reduce(async (promise, tag) => {
		await promise;
		if (Array.isArray(tag.tag)) {
			if (tag.tag.length > 0) {
				tag.tag = tag.tag.join(' ');
			} else {
				tag.tag = tag.tag[0];
			}
		}
	}, Promise.resolve());
	return tabTag;
};

const computeTags = (tabWords, tabSentences) => R.pipe(
	listWord,
	R.then(sortAndFilter),
	R.then(getTagsBySentence(tabSentences)),
	R.then(R.tap(console.log)),
	R.then(R.forEach(sentence => sentence.tags = R.uniqBy(R.toLower, sentence.tags))),
	R.then(listSentenceByTag),
	R.then(groupSentences),
	R.then(sortTagByNumberOfSentences),
	R.then(R.tap(console.log))
)(tabWords);

const computeTags2 = (tabWords, tabSentences) => R.pipe(
	listWord,
	R.then(sortAndFilter),
	R.then(R.tap(console.log)),
	R.then(getTagsBySentence(tabSentences)),
	R.then(R.forEach(sentence => sentence.tags = R.uniqBy(R.toLower, sentence.tags))),
	R.then(listSentenceByTag),
	R.then(groupSentences),
	R.then(sortTagByNumberOfSentences),
	R.then(R.tap(console.log))
)(tabWords);

const main = async path => {
	let tabSentence = await parseFile(path);
	tabSentence = await cleanPhrases(tabSentence);
	tabSentence = tabSentence.splice(0, 200);

	let tabWords = await listAllWords(tabSentence);

	/* Console.log('tabWords 0 : ');
	console.log(tabWords); */

	tabWords = await preprocessing(tabWords);

	console.log('tabSentences : ');
	console.log(tabSentence);
	console.log('tabWords 1 : ');
	console.log(tabWords);

	console.log('tags : ');
	const output = await computeTags(tabWords, tabSentence);

	console.log(JSON.stringify(output, null, 1));

	const endTest = new Save('/home/victor/Documents/ESME/Js/arango/res/',
		'resArangoTestVINCI', ['tag', 'sentence']);
	endTest.data = output;
	endTest.saveAsCsv();
};

const test = async tabSentence => {
	// TabSentence = await cleanPhrases(tabSentence);
	// tabSentence = tabSentence.splice(0, 100);

	await tabSentence.forEach(async word => {
		const match = await wordMatch(word, db);
		console.log(match);
		const id = await match._result[0]._id;
		console.log(id);
		const rel = await varianteRelationForWord(id, db);
		const word1 = await wordMatchId(rel._result[0]._from, db);
		const word2 = await wordMatchId(rel._result[0]._to, db);
		const truc = {word1: word1._result[0].word, word2: word2._result[0].word};
		console.log(JSON.stringify(truc, null, 1));
	});

	/* Await getAllVarianteRelations(db).then(async tabWord => {
		//console.log(JSON.stringify(tabWord._result.splice(0,10), null, 1));
		tabWord._result.forEach(async word => {
			const word1 = await wordMatchId(word._from, db);
			const word2 = await wordMatchId(word._to, db);
			const truc = {word1: word1._result[0].word, word2: word2._result[0].word};
			console.log(JSON.stringify(truc, null, 1));
		});
	}); */

	/* tabWords = await preprocessing(tabWords);

	console.log('tabSentences : ');
	console.log(tabSentence);
	console.log('tabWords : ');
	console.log(tabWords);

	console.log('listword :'); */
};

const test2 = async path => {
	const tabSentence = await parseFile(path);
	console.log(JSON.stringify(tabSentence, null, 1));
};

// Test(tabSentence);
// test2('./files/psa-finance.csv');

main('./files/log-vinci.csv');

// ComputeTag(tabWord, tabSentence);

