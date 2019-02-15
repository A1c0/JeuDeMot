const {Database} = require('arangojs');
const R = require('ramda');
const db = new Database();
const {
    wordMatch,
    wordMatchId,
    lemmeRelationForWord
} = require('./lib/queries.js');

const tabWord = [
    'faire',
    'voyage',
    'petites'
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

const findLemmes = async tab => {
    const tabRes = [];
    await tab.reduce(async (promise, word) => {
        await promise;
        const lemmeRelation = await lemmeRelationForWord(word.id, db);

        if (lemmeRelation._result.length > 0) {
            await sortLemme(lemmeRelation).then(res => {
                tabRes.push(res[0].name);
            });
        } else {
            tabRes.push(word.word)
        }
    }, Promise.resolve());

    return tabRes;
};

const sortLemme = async lemmeRelation => {
    const lemmesWeight = [];
    await lemmeRelation._result.reduce(async (promise, lemme) => {
        await promise;
        const newLemme = await wordMatchId(lemme._to, db);
        lemmesWeight.push({
            name: newLemme._result[0].word,
            value: newLemme._result[0].weight
        });
        lemmesWeight.sort( (a, b) => b.value - a.value);
    }, Promise.resolve());
    return lemmesWeight;
};

const main = R.pipe(
    findWords,
    R.then(findLemmes),
    R.then(R.tap(console.log))
);

console.log(tabWord);
main(tabWord);

