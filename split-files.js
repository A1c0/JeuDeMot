// Splits a given file into smaller subfiles by line number
const infileName = 'jeu-de-mot';
let fileCount = 1;
let count = 0;
const fs = require('fs');

let outStream;
let outfileName = `./files/${infileName}-${fileCount}.txt`;
newWriteStream();
const inStream = fs.createReadStream(`${infileName}.txt`);

const lineReader = require('readline').createInterface({
	input: inStream
});

function newWriteStream() {
	outfileName = `./files/${infileName}-${fileCount}.txt`;
	outStream = fs.createWriteStream(outfileName);
	count = 0;
}

lineReader.on('line', line => {
	count++;
	outStream.write(line + '\n');
	if (count >= 1000000) {
		fileCount++;
		console.log('file', outfileName, count);
		outStream.end();
		newWriteStream();
	}
});

lineReader.on('close', () => {
	if (count > 0) {
		console.log('Final close:', outfileName, count);
	}

	inStream.close();
	outStream.end();
	console.log('Done');
});
