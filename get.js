const fetch = require('node-fetch');
const convert = require('xml-js');

const url = `https://boardgamegeek.com/xmlapi2/collection?username=mekane&excludesubtype=boardgameexpansion&played=1`;

function getText(element) {
    const children = element.elements;
    const el = children.find(el => el.type === 'text');
    return el.text;
}

function parseXml(text) {
    return convert.xml2js(text);
}

function transformJson(jsonArray) {
    const collection = jsonArray[0];
    const list = collection.elements;

    const json = [];

    list.forEach(row => {
        attrs = row.attributes;

        const item = {
            id: attrs.objectid,
        }

        row.elements.forEach(propElement => {
            const prop = propElement.name;

            if (prop === 'name' || prop === 'image') {
                item[prop] = getText(propElement);
            }

            if (prop === 'numplays') {
                item.plays = getText(propElement);
            }
        });

        json.push(item);
    });

    return json;
}

async function getXmlFromBggApi() {
    const response = await fetch(url);

    if (response.status === 200) {
        const xml = await response.text();
        console.log(xml);
        return xml;
    }
    else {
        console.log(`Got response ${response.status}: ${response.statusText}`);
    }
}

async function getXmlFromSavedFile() {
    const fs = require('fs');

    const xml = fs.readFileSync('collection.xml');
    return xml;
}

async function fetchAndProcess() {
    const xml = await getXmlFromSavedFile();

    const json = parseXml(xml);
    const transformed = transformJson(json.elements);

    console.log(JSON.stringify(transformed));
}


fetchAndProcess();