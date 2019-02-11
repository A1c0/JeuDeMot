const {Database, aql} = require('arangojs');

const db = new Database();

const main = async () => {
  /*const collection = db.collection('lemmeRelations');
  await collection.drop();*/
  /*await graph.create({
    edgeDefinitions: [{
      collection: 'synRelations',
      from: ['words'],
      to: ['words']
    }]
  });*/
  const graph = db.graph('jeuDeMot');
  //const collection = db.collection("lemmeRelations");
  //console.log(collection);
  await graph.addEdgeDefinition({
    collection: 'lemmeRelations',
    from: ['words'],
    to: ['words']
  });
  console.log(await db.listDatabases());
  console.log(await db.listCollections());
};

main();

