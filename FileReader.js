const fs = require('fs');

const FileReader = function(){

    function loadFileIntoString(inputfile){
        let data = fs.readFileSync(inputfile,'utf8');
        //console.log(data);
        return data;
    }

    function LoadFileIntoArrayByLine(inputfile){
        let data = fs.readFileSync(inputfile,'utf8');

        if(data.indexOf("\r\n")>0){
            let array = data.split("\r\n");
            return array;
        }
        else if(data.indexOf("\n")>0){
            let array = data.split("\n");
            return array;
        }
        else if(data.indexOf("\r")>0){
            let array = data.split("\r");
            return array;
        }
        else{
            console.log("Something is strange about this input file");
            return undefined;
        }

    }
    return{loadFileIntoString,LoadFileIntoArrayByLine}
};
module.exports = FileReader;
