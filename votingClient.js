const FileReader = require('./FileReader.js');
const ElectionParser = require('./electionParser.js');

let FR = new FileReader();
let list = FR.LoadFileIntoArrayByLine('electionSimplified.csv');

let Parser = new ElectionParser();
let parsedList = Parser.all(list);

console.log(list);
console.log(parsedList);
