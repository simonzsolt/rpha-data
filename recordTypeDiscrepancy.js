var mainVerseArr 	= [];
var extVerseArr 	= [];
var otherVerseArr 	= [];
var mainSourceArr 	= [];

var totalVerseArr 	= [];
var totalVerseCheckArr = [];


var mainVerseCount 	= db.verse.find( { recordType : 'mainVerse' } ).count()
var extVerseCount 	= db.verse.find( { recordType : 'extVerse' } ).count()
var otherVerseCount = db.verse.find( { recordType : 'otherVerse' } ).count()
var mainSourceCount = db.verse.find( { recordType : 'mainSource' } ).count()
var totalVerseTypes = mainVerseCount + extVerseCount + otherVerseCount + mainSourceCount;
var totalVerseTypesCheck = db.verse.find( { recordType : { $exists : true } } ).count();

print( 
	'mainVerseCount: ' 	+ mainVerseCount 	+ '\n\n' + 
	'extVerseCount: ' 	+ extVerseCount 	+ '\n\n' + 
	'otherVerseCount: ' + otherVerseCount 	+ '\n\n' + 
	'mainSourceCount: ' + mainSourceCount 	+ '\n\n' +
	'totalVerseTypes: ' + totalVerseTypes 	+ '\n\n' +
	'totalVerseTypesCheck: ' + totalVerseTypesCheck );


db.verse.find( { recordType : 'mainVerse' } ).forEach( function (verse) {
	if ( totalVerseArr.indexOf(verse.id) < 0 ) { totalVerseArr.push(verse.id) }
});

db.verse.find( { recordType : 'extVerse' } ).forEach( function (verse) {
	if ( totalVerseArr.indexOf(verse.id) < 0 ) { totalVerseArr.push(verse.id) }
});

db.verse.find( { recordType : 'otherVerse' } ).forEach( function (verse) {
	if ( totalVerseArr.indexOf(verse.id) < 0 ) { totalVerseArr.push(verse.id) }
});

db.verse.find( { recordType : 'mainSource' } ).forEach( function (verse) {
	if ( totalVerseArr.indexOf(verse.id) < 0 ) { totalVerseArr.push(verse.id) }
});

print(totalVerseArr.length);

/*
.forEach( function (verse) {
	if ( totalVerseArr.indexOf(verse.id) < 0 ) { totalVerseArr.push(verse.id) }
});
*/

db.verse.find( { recordType : { $exists : true } } ).forEach( function (verse) {
	if ( totalVerseCheckArr.indexOf(verse.id) < 0 ) { totalVerseCheckArr.push(verse.id) }
});

print(totalVerseCheckArr.length);

for (var i = totalVerseCheckArr.length - 1; i >= 0; i--) {
	if ( totalVerseArr.indexOf(totalVerseCheckArr[i]) < 0 ) {
		print(totalVerseCheckArr[i])
	}  
}

/*

	{ 
	    "_id" : ObjectId("585ab6d3389417165f458846"), 
	    "id" : "0549-MKEVB1-0040", 
	    "incipit" : "hogy", 
	    "recordType" : "5", 
	    "v200" : {
	        "value" : "MKEVB1-0040"
	    }, 
	    "v201" : {
	        "value" : "0549"
	    }
	}

	{ 
	    "_id" : ObjectId("585ab6d3389417165f458845"), 
	    "id" : "0002-MKEVB1-0009", 
	    "incipit" : "A bűnöek távol legyenek tőlünk", 
	    "recordType" : "5", 
	    "v200" : {
	        "value" : "MKEVB1-0009"
	    }, 
	    "v201" : {
	        "value" : "0002"
	    }
	}


*/