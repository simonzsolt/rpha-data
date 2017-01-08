
// NON ARRAY TYPE

db.verse.find( { v2 : { $exists : true } } ).forEach(function(verse){
	db.verse.update( { _id : verse._id }, { $set : { 'v2' : verse.v2.value } } );
});


// ARRAY TYPE // NON ARRAY FIELDS

db.verse.find({ v : { $exists : true } }).forEach(function(verse){
	if (Array.isArray(verse.v)) {
		db.verse.update( { _id : verse._id }, { $set : { 'v' : verse.v.value } } );
	} // if
}); // db.verse.find


// ARRAY TYPE // ARRAY FIELDS

var tempArr = [];

db.verse.find({ v : { $exists : true } }).forEach(function(verse){
	if (Array.isArray(verse.v)) {

		for (var i = verse.v.length - 1; i >= 0; i--) {
			tempArr.push(verse.v[i].value)
		} // for

		db.verse.update( { _id : verse._id }, { $set : { 'v' : tempArr } } );
		
	} // if
}); // db.verse.find