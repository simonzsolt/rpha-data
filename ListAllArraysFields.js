tempArr = [];
propArr = [];

isArrArr = [];

db.verse.find({}).forEach( function(verse){
	tempArr = Object.getOwnPropertyNames(verse);
	
	for ( i=tempArr.length-1; i>=0; i-- ) {
		if ( propArr.indexOf(tempArr[i]) < 0 ) {
			propArr.push(tempArr[i]);
		} 
	}
});

db.verse.find({}).forEach( function(verse){

	for ( i=propArr.length-1; i>=0; i-- ) {
		if ( Array.isArray(verse[propArr[i]]) ) {
			if ( isArrArr.indexOf(propArr[i])  < 0 ) {
				isArrArr.push(propArr[i]);
			}
		} 
	}
});

printjson(isArrArr);












