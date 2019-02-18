const {Database} = require('arangojs');

const db = new Database();
const R = require('ramda');
const {
	wordMatch,
	wordMatchId,
	posRelationForWord,
	lemmeRelationForWord,
	varianteRelationForWord,
	equivRelationForWord
} = require('./queries.js');

const sortByWeight = async unsortedRelation => {
	const sortByWeight = [];
	await unsortedRelation._result.reduce(async (promise, lemme) => {
		await promise;
		const newLemme = await wordMatchId(lemme._to, db);
		sortByWeight.push({
			name: newLemme._result[0].word,
			value: newLemme._result[0].weight,
			id: newLemme._result[0]._id
		});
		sortByWeight.sort((a, b) => b.value - a.value);
	}, Promise.resolve());
	return sortByWeight;
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
						case 'Con:':
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

const findWords = async tabWord => {
	const tabRes = [];
	await tabWord.reduce(async (promise, word) => {
		await promise;
		const wRef = await wordMatch(word, db);
		if (wRef._result.length > 0) {
			tabRes.push({
				id: wRef._result[0]._id,
				word
			});
		} else {
			tabRes.push({
				id: null,
				word
			});
		}
	}, Promise.resolve());
	return tabRes;
};

const findEquiv = async tab => {
	const tabRes = [];
	await tab.reduce(async (promise, word) => {
		await promise;
		const equivsRelation = await equivRelationForWord(word.id, db);

		if (equivsRelation._result.length > 0) {
			await sortByWeight(equivsRelation).then(res => {
				tabRes.push({
					id: res[0].id,
					word: res[0].name
				});
			});
		} else {
			tabRes.push({
				id: word.id,
				word: word.word
			});
		}
	}, Promise.resolve());

	return tabRes;
};

const findVariantes = async tab => {
	const tabRes = [];
	await tab.reduce(async (promise, word) => {
		await promise;
		const variantesRelation = await varianteRelationForWord(word.id, db);

		if (variantesRelation._result.length > 0) {
			await sortByWeight(variantesRelation).then(res => {
				tabRes.push({
					id: res[0].id,
					word: res[0].name
				});
			});
		} else {
			tabRes.push({
				id: word.id,
				word: word.word
			});
		}
	}, Promise.resolve());

	return tabRes;
};

const findLemmes = async tab => {
	const tabRes = [];
	await tab.reduce(async (promise, word) => {
		await promise;
		const lemmeRelation = await lemmeRelationForWord(word.id, db);

		if (lemmeRelation._result.length > 0) {
			await sortByWeight(lemmeRelation).then(res => {
				tabRes.push(res[0].name);
			});
		} else {
			tabRes.push(word.word);
		}
	}, Promise.resolve());

	return tabRes;
};

const preprocessing = R.pipe(
	testPosRelations,
	R.then(filterWordsByPos),
	R.then(findWords),
	R.then(findEquiv),
	R.then(findVariantes),
	R.then(findLemmes),
	R.uniq
);

module.exports = {
	preprocessing
};
