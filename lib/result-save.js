const R = require('ramda');
const fs = require('fs-extra');
const dateFormat = require('dateformat');

const dataToCSV_ = R.pipe(
	R.map(R.pipe(
		R.values,
		R.join(';')
	)),
	R.join('\n')
);

const headerToCSV_ = R.pipe(
	R.join(';')
);

class ResultSave {
	/**
   * Create a ResultSave object.
   * @param {String} pathDirectory The path of the result files
   * @param {String} nameOfMethode The first part of the result file
   * @param {Array.<String>} headers List of name for headers
   */
	constructor(pathDirectory, nameOfMethode, headers) {
		this._pathDirectory = pathDirectory;
		this._nameOfMethode = nameOfMethode;
		this._data = [];
		this._headers = headers;
	}

	/**
   * Getter of the data
   * @returns {Array.<Object>} the data
   */
	get data() {
		return this._data;
	}

	set data(value) {
		const lengthOfValueLine = Object.keys(value[0]).length;
		if (lengthOfValueLine !== this._headers.length) {
			throw new Error(
				'you must add ' + this._headers.length + ' elements and you add ' +
        lengthOfValueLine + ' elements');
		}

		this._data = value;
	}

	/**
   * Sort the data by a column value (descending)
   * @param {String} label The column name (header).
   */
	sortBy(label) {
		this._data = R.sortWith([R.descend(R.prop(label))], this._data);
	}

	/**
   * Add elements in data save.
   * @param {...Object} line Elements to add for a line of data save
   */
	add(...line) {
		if (line.length !== this._headers.length) {
			throw new Error(
				'you must add ' + this._headers.length + ' elements and you add ' +
        line.length + ' elements');
		}

		// A refaire parce que peut-être mieux
		for (const i in line) {
			if ({}.hasOwnProperty.call(line, i)) {
				line[i] = R.pair(this._headers[i], line[i]);
			}
		}

		this._data.push(R.fromPairs(line));
	}

	/**
   * Save all data in a .csv file
   */
	saveAsCsv() {
		const date = dateFormat(new Date(), '_dd-mm-yyyy_h:MM:ss');
		const dataToWrite = headerToCSV_(this._headers).concat('\n')
			.concat(dataToCSV_(this._data));
		fs.writeFileSync(
			this._pathDirectory.concat(this._nameOfMethode).concat(date)
				.concat('.csv'), dataToWrite);
	}

	/**
   * Save all data in a .json file
   */
	saveAsJson() {
		const date = dateFormat(new Date(), '_dd-mm-yyyy_h:MM:ss');
		fs.writeFileSync(
			this._pathDirectory.concat(this._nameOfMethode).concat(date)
				.concat('.json'), JSON.stringify(this._data));
	}
}

module.exports = ResultSave;
