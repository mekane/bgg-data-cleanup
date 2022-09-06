require("csv-parse")

function convert(csvList) {
    if (!Array.isArray(csvList) || csvList.length === 0) {
        return [];
    }

    const keys = csvList.shift();

    return csvList.map(row => {
        const item = {};

        keys.forEach((key, i) => {
            item[key] = row[i];
        });

        return item;
    });
}

function keepPlayedGames(jsonObj) {
    return typeof jsonObj === 'object' &&
        jsonObj.itemtype === 'standalone' &&
        !!jsonObj.numplays;
}

function filterProperties(jsonObj) {
    return {
        objectname: jsonObj.objectname,
        rating: jsonObj.rating,
        numplays: jsonObj.numplays,
        objectid: jsonObj.objectid,
        rank: jsonObj.rank
    };
}

function renameProperties(jsonObj) {
    return {
        name: jsonObj.objectname,
        rating: jsonObj.rating,
        plays: jsonObj.numplays,
        bggid: jsonObj.objectid,
        bggrank: jsonObj.rank
    }
}

module.exports = {
    convert,
    filterProperties,
    keepPlayedGames,
    renameProperties,
}