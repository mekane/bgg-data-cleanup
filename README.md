# BGG Data Cleanup

Download CSV of all games in collection from BGG.

This includes regular board games ('standalone') and expansions, and also includes 
all owned games as well as any items marked "wishlist" etc.

This repository has a cleanup script that will read the raw CSV and convert it to JSON.
It will then filter out only rows that are for 'standalone' games, not expansions.
The many, many CSV columns will be filtered down to just a few interesting properties, and renamed to make sense.

Properties kept:

 * name - the game title, called "objectname" in CSV
 * rating - your current rating for the game
 * plays - number of plays, called "numplays" in CSV
 * bggid - the unique id of the game on BGG, called "objectid" in CSV
 * bggrank - the global rank of the game on BGG, called "rank" in CSV

## Usage

Run the script in silent mode to avoid extra npm noise, and direct output to a file:

`npm run -s convert <csv filename> > output.json`
