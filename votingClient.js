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
//x find all state totals aka fips ==0
//x find all states where percent difference was less than p%
// sort counties within a given state from least to greatest total votes
//x name counties a candidate won in a state and show percent.
//x which state had the county with the largest % difference
//x which state had the county with the largest literal vote difference

//Will find the name and total votes between the two candidates.
function stateTotals(datalist){
    let totals = new Set();
    function state(obj){
        this.name = obj.state;
        this.total = obj.obamaV+obj.romneyV;
    }
    for(let r=1;r<datalist.length;r++){
        if(datalist[r].fips === "0"){
            totals.add(new state(datalist[r]));
        }
    }
    console.log("The size of this set is "+totals.size);
    return totals;
}

function rankStateVotes(datalist){
    //input is assumed to be given the whole dataset

    let stateResult = stateTotals(datalist);
    let stateIterator = stateResult.entries();
    stateResult = new Array(stateResult.size);
    for(let entry of stateIterator){
        stateResult.push(entry);
    }
    return stateResult;
}

function countiesWon(candidate,datalist){
    let obama = candidate.toLowerCase() == "obama";
    let counties = new Set();

    function CountyMargin(obj){
        let margin = obj.obamaP - obj.romneyP;
        this.state = obj.state;
        this.margin = Math.abs(margin);
        this.winner;
        if(margin>0){
            this.winner = "Obama";
        }
        else{
            this.winner = "Romney";
        }
    }

    if(obama){
        for(let c=1;c<datalist.length;c++){
            let temp = new CountyMargin(datalist[c]);
            if(temp.winner == "Obama" && datalist[c].fips !== "0"){
                counties.add(new CountyMargin(datalist[c]));
            }
        }
    }
    else{
        for(let c=1;c<datalist.length;c++){
            let temp = new CountyMargin(datalist[c]);
            if(temp.winner == "Romney" && datalist[c].fips !== "0"){
                counties.add(new CountyMargin(datalist[c]));
            }
        }
    }
    return counties;
}

function percentMargin(datalist,p){
    let margin;
    let stateList = new Set();
    //build object
    function StateMargin(obj){
        let margin = obj.obamaP - obj.romneyP;
        this.state = obj.state;
        this.margin = Math.abs(margin);
        this.winner;
        if(margin>0){
            this.winner = "Obama";
        }
        else{
            this.winner = "Romney";
        }
    }
    //add to set
    for(let r=0;r<datalist.length;r++){
        let diff = Math.abs(datalist[r].obamaP - datalist[r].romneyP);
        if(datalist[r].fips === "0" && diff <=p){
            stateList.add(new StateMargin(datalist[r]));
        }
    }
    return stateList
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
    console.log("the vote difference was "+diff+"\nin the state of "+state+"\nin "+county+" county");
    return state;
}

function largestPercentDiff(datalist){
    let state;
    let county;
    let diff;
    //find first valid things.
    for(let x=1;x<datalist.length;x++){
        if(datalist[x].fips != 0){
            state = datalist[x].state;
            county = datalist[x].county;
            diff = Math.abs(datalist[x].obamaP - datalist[x].romneyP);
            break;
        }
    }
    //go through the whole list and update it as you go.
    for(let x=2;x<datalist.length;x++){
        let currentDiff = Math.abs(datalist[x].obamaP - datalist[x].romneyP);
        if(currentDiff > diff && datalist[x].fips != 0){
            diff = currentDiff;
            county = datalist[x].county;
            state = datalist[x].state;
        }
    }
    console.log("the percent difference was "+diff+"\nin the state of "+state+"\nin "+county+" county");
    return state;
}

console.log(rankStateVotes(parsedList));
//console.log(largestPercentDiff(parsedList));
//console.log(countiesWon("obama",parsedList).size);
//console.log(countiesWon("romney",parsedList).size);
//console.log(percentMargin(parsedList,10));
//console.log(largestVoteDiff(parsedList));
//console.log(stateTotals(parsedList));
