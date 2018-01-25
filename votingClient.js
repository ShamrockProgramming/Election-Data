const FileReader = require('./FileReader.js');
const ElectionParser = require('./electionParser.js');

let FR = new FileReader();
let list = FR.LoadFileIntoArrayByLine('electionSimplified.csv');

let Parser = new ElectionParser();
let parsedList = Parser.all(list);

/*
//works
console.log(list);
console.log(parsedList);
*/


//Will find the name and total votes between the two candidates.
function stateTotals(datalist){
    let totals = new Set();
    function state(obj){
        this.name = obj.state;
        this.total = obj.obamaV+obj.romneyV;
    }
    for(let r=0;r<datalist.length;r++){
        if(datalist[r].fips === "0"){
            totals.add(new state(datalist[r]));
        }
    }
    console.log("The size of this set is "+totals.size);
    return totals;
}

//console.log(stateTotals(parsedList));
