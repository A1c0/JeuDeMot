const {Database} = require('arangojs');
const {
	wordMatch,
	lemmeRelationForWord,
	wordMatchId
} = require('./lib/queries.js');

const db = new Database();

const tabWord = [
	'fait'
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
		resolve(tabWord.map(x => x.res.sort((a, b) => b.score - a.score)));
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
	getMaxScore(tabRes).then(resWithMax => {
		computeRelScore(resWithMax).then(resWithScore => {
			resWithScore.forEach(word => {
				console.log(word);
			});
		});
	});
};

const getClosestWord = async wordID => {
	const resRelSyn = await lemmeRelationForWord(wordID, db);
	/* Const resRelFamily = await familyRelationForWord(wordID);
	const rels = resRelSyn._result.concat(resRelFamily._result); */
	const tabRel = [];
	await resRelSyn.reduce(async (promise, res) => {
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
		.splice(0, 15);
};

main(tabWord);

