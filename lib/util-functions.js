const R = require('ramda');
const {remove: removeDiacritics} = require('diacritics');
const papa = require('papaparse');
const fs = require('fs-extra');

// Clean Sentences

const deleteIgnoredChar = R.pipe(
	R.replace(/'/g, '\' '),
	R.replace(/[^A-Za-z0-9ÈÉÊËÛÙÏÎÀÂÔèéêëûùïîàâôÇç'\- ]/g, ''),
	R.replace(/^\s+|\s+$/g, ''),
	R.replace(/\d/g, 'chiffre '),
	R.replace(/ {2}/g, ' '),
	R.toLower()
);

const cleanPhrases = R.pipe(
	// R.map(removeDiacritics),
	R.map(deleteIgnoredChar),
	R.filter(sentence => sentence !== '')
);

const listAllWords = R.pipe(
	cleanPhrases,
	R.map(R.split(' ')),
	R.flatten,
	R.uniq
);

// ParseFile

const getFileContentAsString = R.pipe(
	fs.readFile,
	R.then(R.toString)
);

const parseTextFile = R.pipe(
	getFileContentAsString,
	R.then(R.split('\n')),
);

const papaparser = R.curry(x => papa.parse(x, {delimiter: ';', header: true}));

const parseCsvFile = R.pipe(
	getFileContentAsString,
	R.then(papaparser),
	R.then(R.prop('data')),
	R.then(R.map(R.prop('Log'))),
);

const parseFile = async path => {
	return (await path.slice(path.lastIndexOf('.')) === '.txt' ?
		await parseTextFile(path) :
		await parseCsvFile(path)).filter(a => a !== undefined);
};

module.exports = {
	deleteIgnoredChar,
	cleanPhrases,
	listAllWords,
	parseFile
};
