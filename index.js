const {Database} = require('arangojs');

const db = new Database();
const graph = db.graph('jeuDeMot');

const main = async () => {
	console.log(await db.listGraphs());
	console.log(await db.listCollections());
	/* Const words = graph.vertexCollection('words');
  const relations = graph.edgeCollection('relations');

  const w1 = await words.save({name: 'bobby', weight: 10});
  const w2 = await words.save({name: 'bobette', weight: 5});
  const edge = await relations.save({type: 'gf'}, w1, w2); */
};

const init = async () => {
	await graph.create({
		edgeDefinitions: [
			{
				collection: 'synRelations',
				from: ['words'],
				to: ['words']
			},
			{
				collection: 'lemmeRelations',
				from: ['words'],
				to: ['words']
			},
			{
				collection: 'familyRelations',
				from: ['words'],
				to: ['words']
			},
			{
				collection: 'equivRelations',
				from: ['words'],
				to: ['words']
			},
			{
				collection: 'varianteRelations',
				from: ['words'],
				to: ['words']
			}
		]
	});
};

init().then(() => {
});

main();
