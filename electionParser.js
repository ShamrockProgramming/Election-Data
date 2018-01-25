const Parser = function(){

    function votingItem(array){
        //builds the object from the array
        if(array.length == 7){
        this.state = array[0];
        this.county = array[1];
        this.fips = array[2];
        this.obamaV = Number(array[3]);
        this.obamaP = Number(array[4]);
        this.romneyV = Number(array[5]);
        this.romneyP = Number(array[6]);
        }
        else{
            console.log("Did not parse: "+array);
        }
    }

    function parse(line){
        //assumed that line is a string
        let array = line.split(",");
        return array;
    }
    function all(list){
        let parsedList = new Array(list.length);
        for(let x=0;x<list.length;x++){
            parsedList[x] = new votingItem(parse(list[x]));
        }
        return parsedList;
    }

    return {parse,all};
};

module.exports = Parser;
