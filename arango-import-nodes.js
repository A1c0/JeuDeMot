const fs = require('fs-extra');
const {Database} = require('arangojs');
const R = require('ramda');
const ProgressBar = require('progress');
const Bromise = require('bluebird');
const ntype = require('./ntid');

let bar;

const parseArray = arr => {
	const kv = R.pipe(R.split('='), R.prop('1'));
	const ga = R.prop(R.__, arr);
	if (R.equals(0, R.indexOf('eid', R.prop('0', arr)))) {
		return {
			_key: kv(ga('0')),
			word: R.replace(/"/g, '', kv(ga('1'))),
			type: ntype[kv(ga('2'))].name,
			weight: ga('3') ? Number(kv(ga('3'))) : -1
		};
	}

	return 'NOT HANDLED';
};

const parse = R.pipe(
	R.split('|'),
	parseArray,
	R.tap(() => bar.tick())
);

const bulkImportFile = R.pipeP(
	f => {
		console.log(`Now processing : ${f}`);
		return fs.readFile(`./files/${f}`, 'utf8');
	},
	R.split('\n'),
	R.filter(
		x => R.and(R.complement(R.equals(''))(x), R.gt(0, R.indexOf('/', x)))),
	R.tap(R.pipe(
		R.length,
		x => {
			bar = new ProgressBar('Parsing [:bar] :current/:total :etas :rate/s',
				{total: x, width: 40});
		})
	),
	R.map(parse),
	R.filter(R.complement(R.equals('NOT HANDLED'))),
	x => {
		const db = new Database();
		const graph = db.graph('lirmm');
		const words = graph.vertexCollection('words');
		words.import(x);
	}
);

const main = R.pipeP(
	() => fs.readdir('./files'),
	filesList => Bromise.each(filesList, bulkImportFile)
);

console.time('LIRMM to DB');
main().then(() => {
	console.timeEnd('LIRMM to DB');
});
