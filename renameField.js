conn = new Mongo();
db = conn.getDB("rpha");

db.verse.updateMany( { v : { $exists : true } }, { $rename : { 'v' : 'NEW_NAME' } } );


// IF ARRAY OF EMBEDED DOCUMENTS

var tempArr = [];
db.verse.find({ v : { $exists : true } }).forEach(function(verse){
	if ( Array.isArray(verse.v) ) {   	    
	  	for ( i=verse.v.length-1; i>=0; i-- ) {
	  	  	tempArr.push(
	  	  		{ 
	  	  			'surname' : verse.v[i].s1, 
	  	  			'forename' : verse.v[i].s2, 
	  	  			'note' : verse.v[i].s3
	  	  			// '_id' : verse._id,
	  	  			// 'i' : i
	  	  		}); // push
	  	} // for
	  	db.verse.update({ '_id' : verse._id }, { $set : { 'NEW_FIELD_NAME' : tempArr } });
	  	db.verse.update({ '_id' : verse._id }, { $unset : { 'v' : '' } });
	  	tempArr = [];
	} // if
}); // forEach