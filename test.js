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

/*const getRelation = R.pipeP(
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
};*/

/*console.time('Lemmatisation');
main('Salut ça va ?')
	.then(() => {
		console.timeEnd('Lemmatisation');
	});*/

const main = async tabWord => {
	const tabRes = [];
	await tabWord.reduce(async (promise, word) => {
		await promise;
		let wRef = await wordMatch(word);
		tabRes.push({
			word: word,
			res: await getClosestWord(wRef._result[0]._id)
		});
	}, Promise.resolve());
	tabRes.forEach(word => {
		console.log(word);
	});
};

const getClosestWord = async wordID => {
	const resRel = await synRelationForWord(wordID);
	const tabRel = [];
	await resRel._result.reduce(async (promise, res) => {
		await promise;
		let wRef1 = await wordMatchId(res._from);
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
		.splice(0, 10);
};

const test = async word => {
	let wRef = await wordMatch(word);
	if (wRef._result.length > 0) {
		wRef = wRef._result[0];
		//console.log(wRef);
		//const resRel = await equivRelationForWord(wRef._id);
		const resRel = await getAllLemmeRelations();
		//console.log(resRel);
		console.log(`Famille de ${word}: `);
		await resRel._result.reduce(async (promise, res) => {
			await promise;
			let wRef1 = await wordMatchId(res._from);
			let wRef2 = await wordMatchId(res._to);
			wRef1 = wRef1._result[0];
			wRef2 = wRef2._result[0];
			//console.log(wRef2);
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

/*test('').then(() => {
	console.log(tabRes.sort((a, b) => b.wRel - a.wRel));
});*/

main(tabWord);



