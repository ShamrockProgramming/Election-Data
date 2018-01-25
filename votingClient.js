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

// find states with at least/at most/exactly blank counties
// find all state totals aka fips ==0
// find all states where percent difference was less than p%
// sort counties within a given state from least to greatest total votes
//x name counties a candidate won in a state and show percent.
// which state had the county with the largest % difference
// which state had the county with the largest literal vote difference

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

function largestVoteDiff(datalist){
    let state;
    let county;
    let diff;
    //find first valid things.
    for(let x=1;x<datalist.length;x++){
        if(datalist[x].fips != 0){
            state = datalist[x].state;
            county = datalist[x].county;
            diff = Math.abs(datalist[x].obamaV - datalist[x].romneyV);
            break;
        }
    }
    //go through the whole list and update it as you go.
    for(let x=2;x<datalist.length;x++){
        let currentDiff = Math.abs(datalist[x].obamaV - datalist[x].romneyV);
        if(currentDiff > diff && datalist[x].fips != 0){
            diff = currentDiff;
            county = datalist[x].county;
            state = datalist[x].state;
        }
    }
    console.log("the difference was "+diff+"\nin the state of "+state+"\nin "+county+" county");
    return state;
}

console.log(largestVoteDiff(parsedList));
//console.log(stateTotals(parsedList));
