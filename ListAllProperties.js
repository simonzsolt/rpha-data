tempArr = [];
propArr = [];

db.verse.find({}).forEach( function(verse){
	tempArr = Object.getOwnPropertyNames(verse);
	
	for ( i=tempArr.length-1; i>=0; i-- ) {
		if ( propArr.indexOf(tempArr[i]) < 0 ) {
			propArr.push(tempArr[i]);
		} 
	}
});

printjson(tempArr);