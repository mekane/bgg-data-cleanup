const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { convert, keepPlayedGames, filterProperties, renameProperties } = require('./lib/csv');

const fileName = process.argv[2];

if (fileName) {
    //console.log(`reading ${fileName}`);
    const input = fs.readFileSync(fileName);

    const rawRecords = parse(input);
    //console.log(`read in ${rawRecords.length - 1} lines of CSV`);

    //console.log('converting to JSON');
    const rawJson = convert(rawRecords);

    const json = rawJson.filter(keepPlayedGames).map(filterProperties).map(renameProperties);
    //console.log(`Filtering to just played games, kept ${filtered.length} records`);

    //console.log(json[0]);
    console.log(JSON.stringify(json));
}
else {
    console.log('usage: node convert.js <filename>');
}