fieldArray = ['v2', 'v3', 'v12', 'v13', 'v14', 'v21', 'v28', 'v34', 'v39', 'v42', 'v45', 'v46', 'v47', 'v51', 'v52', 'v53', 'v54', 'v55', 'v61', 'v65', 'v161', 'v162'];

for (var i = 0; i < fieldArray.length; i++) {
	
	console.log(

		"db.getCollection('verse').find( {" + fieldArray[i] + ": { $exists : true} } ).forEach(function allPoems(poem){if ( typeof poem." + fieldArray[i] + ".value == 'string') {db.verse.update( { _id : poem._id }, { $set : {" + fieldArray[i] + ": poem." + fieldArray[i] + ".value} } ); } else {	var tempArray = [];	for (var j = poem." + fieldArray[i] + ".length - 1; j >= 0; j--) {tempArray.push(poem." + fieldArray[i] + "[j].value)} db.verse.update( { _id : poem._id }, { $set : {" + fieldArray[i] + ": tempArray} } );}});
	); //cons	
}