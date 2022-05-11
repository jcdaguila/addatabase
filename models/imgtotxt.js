const Tesseract = require('tesseract.js');
const request = require('request');
const fs = require('fs');

var url = 'http://tesseract.projectnaptha.com/img/eng_bw.png';
var filename = 'pic.png';

const getTextFromImage=()=>{
        var writeFile = fs.createWriteStream(filename)
        let rpta = '';
        request(url).pipe(writeFile).on('close', function() {
            console.log(url, 'saved to', filename);
            Tesseract.recognize(filename)
            .then(function (result) {
                //console.log(result.data.text);
                rpta = result.data.text;                
            })
            .catch(err => console.error(err))
        });
        console.log(rpta);
        return rpta;
}

module.exports={
    getTextFromImage:
    function(){
        return getTextFromImage();
    }
};