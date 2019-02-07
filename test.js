const R = require('ramda');
const {Database, aql} = require('arangojs');
const Bromise = require('bluebird');

const db = new Database();
const graph = db.graph('lirmm');

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

const test = async word => {
	let wRef = await wordMatch(word);
	if (wRef._result.length > 0) {
		wRef = wRef._result[0];
		//console.log(wRef);
		const resRel = await synRelationForWord(wRef._id);
		//console.log(resRel);
		console.log(`Synonymes de ${word}: `);
		await resRel._result.reduce(async (promise, res) => {
			await promise;
			let wRef2 = await wordMatchId(res._to);
			wRef2 = wRef2._result[0];
			tabRes.push({
				word1: word,
				ww1: wRef.weight,
				word2: wRef2.word,
				ww2: wRef2.weight,
				wRel: res.weight
			});
		}, Promise.resolve());
	} else {
		console.log(`There is no synonyme of ${word}`);
	}
};

const tabRes = [];
test('ordinateur').then(() => {
	console.log(tabRes.sort((a, b) => b.wRel - a.wRel));
});



