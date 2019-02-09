const R = require('ramda');
const {Database, aql} = require('arangojs');
const Bromise = require('bluebird');

const db = new Database();
const graph = db.graph('lirmm');

const tabWord = [
	'vacances',
	'bientôt'
];

const wordMatch = w => db.query(aql`
  for w in words
  filter w.word == ${w}
  return w`
);

const wordMatchId = w => db.query(aql`
  for wl in words
  filter wl._id == ${w}
  return wl`
);

const synRelationForWord = fromId => db.query(aql`
  for rel in synRelations
  filter rel._from == ${fromId}
  return rel`
);

const familyRelationForWord = fromId => db.query(aql`
  for rel in familyRelations
  filter rel._from == ${fromId}
  return rel`
);

const varianteRelationForWord = fromId => db.query(aql`
  for rel in varianteRelations
  filter rel._from == ${fromId}
  return rel`
);

const equivRelationForWord = fromId => db.query(aql`
  for rel in equivRelations
  filter rel._from == ${fromId}
  return rel`
);

const getAllEquivRelations = () => db.query(aql`
  for rel in equivRelations
  return rel`
);

const getAllVarianteRelations = () => db.query(aql`
  for rel in varianteRelations
  return rel`
);

const getAllLemmeRelations = () => db.query(aql`
  for rel in lemmeRelations
  return rel`
);

/* Const getRelation = R.pipeP(
	relationForWord,
	c => c.all(),
	R.path(['0']),
	R.ifElse(
		R.isNil,
		R.always('NOPE'),
		R.prop('_to')
	)
);

const getWord = word => R.pipeP(
	wordMatch,
	c => c.all(),
	R.prop('0'),
	R.ifElse(
		R.isNil,
		R.always(word),
		R.prop('_id')
	)
)(word);

const getLemma = R.pipeP(
	wordMatchId(),
	c => c.all(),
	R.path(['0', 'word'])
);

const findLemma = async w => {
	const word = await getWord(w);
	if (R.equals(R.indexOf('words/', word), 0)) {
		const rel = await getRelation(word);
		if (R.equals(rel, 'NOPE')) {
			console.log(word);
			return w;
		}
		return await getLemma(rel);
	}
	return word;
};

const main = async ph => {
	const words = ph.split(' ');
	const bob = await Bromise.map(words, findLemma);
	console.log(bob);
}; */

/* console.time('Lemmatisation');
main('Salut ça va ?')
	.then(() => {
		console.timeEnd('Lemmatisation');
	}); */

const computeRelScore = async tabWord =>
	new Promise(async resolve => {
		await tabWord.forEach(async word => {
			const wwMax = (1 / word.max.ww);
			const wRelMax = (1 / word.max.wRel);
			word.res.forEach(async res => {
				res.score = ((res.ww * wwMax) * 0.5) + ((res.wRel * wRelMax) * 0.5);
			});
		});
		resolve(await tabWord.map(x => x.res.sort((a, b) => b.score - a.score)));
	});

const getMaxScore = async tabWord =>
	new Promise(async resolve => {
		await tabWord.forEach(async word => {
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
		const wRef = await wordMatch(word);
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
	const resRelSyn = await synRelationForWord(wordID);
	const resRelFamily = await familyRelationForWord(wordID);
	const rels = resRelSyn._result.concat(resRelFamily._result);
	const tabRel = [];
	await rels.reduce(async (promise, res) => {
		await promise;
		const wRef1 = await wordMatchId(res._from);
		let wRef2 = await wordMatchId(res._to);
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

const test = async word => {
	let wRef = await wordMatch(word);
	if (wRef._result.length > 0) {
		wRef = wRef._result[0];
		// Console.log(wRef);
		// const resRel = await equivRelationForWord(wRef._id);
		const resRel = await getAllLemmeRelations();
		// Console.log(resRel);
		console.log(`Famille de ${word}: `);
		await resRel._result.reduce(async (promise, res) => {
			await promise;
			let wRef1 = await wordMatchId(res._from);
			let wRef2 = await wordMatchId(res._to);
			wRef1 = wRef1._result[0];
			wRef2 = wRef2._result[0];
			// Console.log(wRef2);
			if (wRef1 !== undefined && wRef2 !== undefined) {
				tabRes.push({
					word1: wRef1.word,
					ww1: wRef1.weight,
					word2: wRef2.word,
					ww2: wRef2.weight,
					wRel: res.weight
				});
			}
		}, Promise.resolve());
	} else {
		console.log(`There is no family word of ${word}`);
	}
};

/* Test('').then(() => {
	console.log(tabRes.sort((a, b) => b.wRel - a.wRel));
}); */

main(tabWord);

