const {Database} = require('arangojs');
const {
	wordMatch,
	wordMatchId,
	synRelationForWord,
	familyRelationForWord
} = require('./lib/queries.js');

const db = new Database();

const tabSentence = [
	'faire randonnée',
	'voyager lille'
];

const tabWord = [
	'faire',
	'lille',
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

const main = async tabWord => {
	const tabRes = [];
	await tabWord.reduce(async (promise, word) => {
		await promise;
		const wRef = await wordMatch(word, db);
		if (wRef._result.length > 0) {
			tabRes.push({
				word,
				ww: wRef._result[0].weight,
				res: await getClosestWord(wRef._result[0]._id)
			});
		} else {
			tabRes.push({
				word,
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
	const resRelFamily = await familyRelationForWord(wordID, db);
	const rels = resRelSyn._result.concat(resRelFamily._result);
	const tabRel = [];
	await rels.reduce(async (promise, res) => {
		await promise;
		const wRef1 = await wordMatchId(res._from, db);
		let wRef2 = await wordMatchId(res._to, db);
		wRef2 = wRef2._result[0];
		if (wRef1 !== undefined && wRef2 !== undefined) {
			tabRel.push({
				word: wRef2.word,
				ww: wRef2.weight,
				wRel: res.weight
			});
		}
	}, Promise.resolve());
	return tabRel.sort((a, b) => b.wRel - a.wRel)
		.splice(0, 10);
};

const getTagsBySentence = async (tabSentence, tabRelWord) => {
	return new Promise(resolve => {
		const tabRes = [];
		tabSentence.forEach(sentence => {
			const tabResToPush = {sentence, tags: []};
			sentence.toString().split(' ')
				.forEach(wordFromSentence => {
					getIndexWordInTabRel(wordFromSentence, tabRelWord)
						.then(index => {
							if (index >= 0) {
								tabResToPush.tags.push(wordFromSentence);
								tabRelWord[index].res
									.forEach(a => tabResToPush.tags.push(a.word));
							}
						});
				});
			tabRes.push(tabResToPush);
		});
		resolve(tabRes);
	});
};

const getIndexWordInTabRel = async (word, tabRelWord) => {
	return new Promise(resolve => {
		for (let i = 0; i < tabRelWord.length; i++) {
			if (tabRelWord[i].word === word) {
				resolve(i);
			}
		}

		resolve(-1);
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
	return new Promise(resolve => {
		tabTagSentence.reduce(async (promise, tag1) => {
			await Promise;
			await computeTabEqual(tag1, tabTagSentence).then(tabTagEqual => {
				if (tabTagEqual.length > 1) {
					const newTag = {tag: [], sentences: []};
					newTag.sentences = tabTagSentence[tabTagEqual[0]].sentences;
					tabTagEqual.forEach(index => {
						newTag.tag.push(tabTagSentence[index].tag);
					});
					if (newTag.sentences.length > 1) {
						let test = true;
						tabTagSentence.forEach(tag => {
							if (test) {
								test = tagEqualTag(tag, newTag);
							}
						});
						if (test) {
							tabTagSentence.push(newTag);
						}
					}
				}
			});
		}, Promise.resolve());
		resolve(tabTagSentence);
	});
};

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

const sortAndFilter = async tabWord => {
	return new Promise(resolve => {
		tabWord.forEach(word => {
			word.res = word.res.splice(0, 3)
				.filter(res => res.ww > word.ww);
		});
		resolve(tabWord);
	});
};

const test = async tabWord => {
	await getTagsBySentence(tabSentence,
		await sortAndFilter(await main(tabWord)))
		.then(async resBySentence => {
			console.log(JSON.stringify(resBySentence, null, 1));
			await listSentenceByTag(resBySentence).then(async resByTag => {
				console.log(JSON.stringify(await groupSameSentenceTag(resByTag),
					null, 1));
			});
		});

	/* Await listSentenceByTag(tabTag).then(async resByTag => {
		console.log(JSON.stringify(resByTag, null, 1));
		console.log(JSON.stringify(
			await groupSameSentenceTag(resByTag), null, 1));
		//await groupSameSentenceTag(resByTag)
	}); */

	// console.log(await tagEqualTag(tabTag[0], tabTag[0]));
};

test(tabWord);

