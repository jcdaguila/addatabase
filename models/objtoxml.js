const o2x = require('object-to-xml');

module.exports = {    
    convertObjToXml:    
    function (obj){
        return o2x(obj);
    },
}