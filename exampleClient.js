const FileReader = require('./FileReader.js');

let FR = new FileReader();

let rawdata = FR.loadFileIntoString('electionSimplified.csv')



console.log(rawdata.split("\r\n"));
console.log("----------");

let list = FR.LoadFileIntoArrayByLine('electionSimplified.txt');


console.log(list[0]);
console.log(list[500]);
console.log(list[1000]);
console.log(list[2000]);

// find states with at least/at most/exactly blank counties
// find all state totals aka fips ==0
// find all states where percent difference was less than p%
// sort counties within a given state from least to greatest total votes
// name counties a candidate won in a state and show percent.
// which state had the county with the largest % difference
// which state had the county with the largest literal vote difference 
