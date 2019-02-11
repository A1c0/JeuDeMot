const R = require('ramda');
const {remove: removeDiacritics} = require('diacritics');

const deleteIgnoredChar = R.pipe(
    R.replace(/'/g, ' '),
    R.replace(/-/g, ' '),
    R.replace(/[^A-Za-z0-9 ]/g, ''),
    R.toLower()
);

const cleanPhrases = R.pipe(
    R.map(removeDiacritics),
    R.map(deleteIgnoredChar)
);

const listAllWords = R.pipe(
    cleanPhrases,
    R.map(R.split(' ')),
    R.flatten
);

module.exports = {
    deleteIgnoredChar,
    cleanPhrases,
    listAllWords
};
