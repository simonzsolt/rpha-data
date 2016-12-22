var xml2js = require('./node_modules/xml2js');
	fs = require('fs');
const util = require('util');

var parseString = require('xml2js').parseString;

var parser = new xml2js.Parser( { explicitArray : false, mergeAttrs: true } );

fs.readFile('./' + '/verse.xml', function(err, data) {

    parser.parseString(data, function (err, result) {
        
        //console.log(JSON.stringify(result, null, 4));

		fs.writeFile('./verse.json', JSON.stringify(result, null, 4), function(err){})		
		        
		console.log('Verse done!');
    });
});

fs.readFile('./' + '/source.xml', function(err, data) {

    parser.parseString(data, function (err, result) {
        
        //console.log(JSON.stringify(result, null, 4));

		fs.writeFile('./source.json', JSON.stringify(result, null, 4), function(err){})		
		        
		console.log('Source done!');
    });
});