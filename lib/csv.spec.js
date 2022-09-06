const expect = require('chai').expect;
const { convert, keepPlayedGames, filterProperties, renameProperties } = require('./csv.js');

const testData = [
    ['col1', 'col2', 'col3'],
    ['row0c1', 'row0c2', 'row0c3'],
    ['row1c1', 'row1c2', 'row1c3'],
    ['row2c1', 'row2c2', 'row2c3']
];

describe('the csv conversion logic', () => {
    it('returns an empty array for bad input', () => {
        expect(convert()).to.deep.equal([]);
        expect(convert([])).to.deep.equal([]);
        expect(convert(false)).to.deep.equal([]);
        expect(convert(0)).to.deep.equal([]);
        expect(convert('foo')).to.deep.equal([]);
        expect(convert({})).to.deep.equal([]);
    });

    it('takes an array and uses the first list as the keys', () => {
        const result = convert(testData);

        expect(result).to.deep.equal([
            {
                col1: 'row0c1',
                col2: 'row0c2',
                col3: 'row0c3'
            },
            {
                col1: 'row1c1',
                col2: 'row1c2',
                col3: 'row1c3'
            },
            {
                col1: 'row2c1',
                col2: 'row2c2',
                col3: 'row2c3'
            },
        ])
    });
});

describe('filtering wanted records', () => {
    it('returns false for bogus JSON objects', () => {
        expect(keepPlayedGames()).to.equal(false);
        expect(keepPlayedGames({})).to.equal(false);
        expect(keepPlayedGames({ itemitemtypeType: 'foo' })).to.equal(false);
    });

    it('returns false for JSON objects with the wrong type', () => {
        expect(keepPlayedGames({ itemtype: 'foo', numplays: '1' })).to.equal(false);
        expect(keepPlayedGames({ itemtype: 'expansion', numplays: '1' })).to.equal(false);
    });

    it('returns false for JSON objects with no numplayed', () => {
        expect(keepPlayedGames({ itemtype: 'standalone', })).to.equal(false);
        expect(keepPlayedGames({ numplays: '', itemtype: 'standalone', })).to.equal(false);
    });

    it('returns true with the correct type and non-empty numplays', () => {
        expect(keepPlayedGames({ itemtype: 'standalone', numplays: '1' })).to.equal(true);
    });
});

describe('cutting out unwanted properties from JSON objects', () => {
    it('returns just the desired properties', () => {
        expect(filterProperties({
            objectname: '4 First Games',
            rating: '5',
            numplays: '19',
            objectid: '2094',
            itemtype: 'standalone',
            weight: '0',
            own: '0',
            fortrade: '0',
            want: '0',
            wanttobuy: '0',
            wanttoplay: '0',
            prevowned: '1',
            preordered: '0',
            wishlist: '0',
            wishlistpriority: '3',
            wishlistcomment: '',
            comment: "Wow, I grew up with this game in the early 80's. I haven't thought about it in years. Those crazy dogs and their sausage-stealing antics! This was my introduction to board games!",
            conditiontext: '',
            haspartslist: '',
            wantpartslist: '',
            collid: '18569655',
            baverage: '5.45599',
            average: '4.85536',
            avgweight: '1',
            rank: '22183',
            numowned: '245',
            objecttype: 'thing',
            originalname: '4 First Games',
            minplayers: '2',
            maxplayers: '6',
            playingtime: '15',
            maxplaytime: '15',
            minplaytime: '10',
            yearpublished: '0',
            bggrecplayers: '2,3,4,5,6',
            bggbestplayers: '2,3,4',
            bggrecagerange: '3–4',
            bgglanguagedependence: 'No necessary in-game text',
            publisherid: '',
            imageid: '',
            year: ''
        })).to.deep.equal({
            objectname: '4 First Games',
            rating: '5',
            numplays: '19',
            objectid: '2094',
            rank: '22183'
        });
    });
});

describe('renaming json object properties', () => {
    it('returns a new object with the updated property names', () => {
        const testData = {
            objectname: '4 First Games',
            rating: '5',
            numplays: '19',
            objectid: '2094',
            rank: '22183'
        };

        expect(renameProperties(testData)).to.deep.equal({
            name: '4 First Games',
            rating: '5',
            plays: '19',
            bggid: '2094',
            bggrank: '22183'
        });
    });
});