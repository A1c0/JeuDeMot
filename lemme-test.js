const {Database} = require('arangojs');

const db = new Database();
const R = require('ramda');
const {
	wordMatch,
	wordMatchId,
	lemmeRelationForWord,
	varianteRelationForWord,
	equivRelationForWord
} = require('./lib/queries.js');

const tabWord = [
	'vcefbevsygfhbjs',
	'voyage',
	'petites',
	'contrattaque'
];

const findWords = async tabWord => {
	const tabRes = [];
	await tabWord.reduce(async (promise, word) => {
		await promise;
		const wRef = await wordMatch(word, db);
		if (wRef._result.length > 0) {
			tabRes.push({
				id: wRef._result[0]._id,
				word,
				ww: wRef._result[0].weight
			});
		} else {
			tabRes.push({
				id: null,
				word,
				ww: 0
			});
		}
	}, Promise.resolve());
	return tabRes;
};

const sortWordByWeight = async lemmeRelation => {
	const sortByWeight = [];
	await lemmeRelation._result.reduce(async (promise, lemme) => {
		await promise;
		const newLemme = await wordMatchId(lemme._to, db);
		sortByWeight.push({
			name: newLemme._result[0].word,
			value: newLemme._result[0].weight
		});
		sortByWeight.sort((a, b) => b.value - a.value);
	}, Promise.resolve());
	return sortByWeight;
};

const findLemmes = async tab => {
	const tabRes = [];
	await tab.reduce(async (promise, word) => {
		await promise;
		const lemmeRelation = await lemmeRelationForWord(word.id, db);

		if (lemmeRelation._result.length > 0) {
			await sortWordByWeight(lemmeRelation).then(res => {
				tabRes.push(res[0].name);
			});
		} else {
			tabRes.push(word.word);
		}
	}, Promise.resolve());

	return tabRes;
};

const findVariantes = async tab => {
	const tabRes = [];
	await tab.reduce(async (promise, word) => {
		await promise;
		const varianteRelation = await varianteRelationForWord(word.id, db);

		if (varianteRelation._result.length > 0) {
			await sortWordByWeight(varianteRelation).then(res => {
				tabRes.push(res[0].name);
			});
		} else {
			tabRes.push(word.word);
		}
	}, Promise.resolve());

	return tabRes;
};

const findEquiv = async tab => {
	const tabRes = [];
	await tab.reduce(async (promise, word) => {
		await promise;
		const equivRelation = await equivRelationForWord(word.id, db);

		if (equivRelation._result.length > 0) {
			await sortWordByWeight(equivRelation).then(res => {
				tabRes.push(res[0].name);
			});
		} else {
			tabRes.push(word.word);
		}
	}, Promise.resolve());

	return tabRes;
};

const giveLemme = R.pipe(
	findWords,
	R.then(findLemmes),
	R.then(R.tap(console.log))
);

const giveVariante = R.pipe(
	findWords,
	R.then(findVariantes),
	R.then(R.tap(console.log))
);

const giveEquiv = R.pipe(
	findWords,
	R.then(findEquiv),
	R.then(R.tap(console.log))
);

console.log(tabWord);
giveLemme(tabWord);
giveVariante(tabWord);
giveEquiv(tabWord);

