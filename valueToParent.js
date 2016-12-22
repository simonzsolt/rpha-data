
//fieldArray = ['v2', 'v3', 'v12', 'v13', 'v14', 'v21', 'v28', 'v34', 'v39', 'v42', 'v45', 'v46', 'v47', 'v51', 'v52', 'v53', 'v54', 'v55', v61, 'v65', 'v161', 'v162'];




db.getCollection('verse').find( {v13 : { $exists : true} } ).forEach(function allPoems(poem){

	if ( typeof poem.v13.value == "string") {

    	db.verse.update( { _id : poem._id }, { $set : {v13: poem.v13.value} } );

    } if ( typeof poem.v13.value == "array") {

    	var tempArray = [];

    	for (var i = poem.v13.length - 1; i >= 0; i--) {
    		tempArray.push(poem.v13[i].value)
    	}

    	db.verse.update( { _id : poem._id }, { $set : {v13: tempArray} } );

    } else { console.log(poem.id + ': ' + typeof poem.v13.value) }
                              
});



