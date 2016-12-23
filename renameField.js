conn = new Mongo();
db = conn.getDB("rpha");

db.verse.updateMany( { v : { $exists : true } }, { $rename : { 'v' : 'NEW_NAME' } } );


// IF ARRAY OF EMBEDED DOCUMENTS

var tempArr = [];
db.verse.find({ author : { $exists : true } }).forEach(function(verse){
	if ( Array.isArray(verse.author) ) {   	    
	  	for ( i=verse.author.length-1; i>=0; i-- ) {
	  	  	tempArr.push(
	  	  		{ 
	  	  			'surname' : verse.author[i].s1, 
	  	  			'forename' : verse.author[i].s2, 
	  	  			'note' : verse.author[i].s3
	  	  			// '_id' : verse._id,
	  	  			// 'i' : i
	  	  		}); // push
	  	} // for
	  	db.verse.update({ '_id' : verse._id }, { $set : { 'originalTitle' : tempArr } });
	  	db.verse.update({ '_id' : verse._id }, { $unset : { 'v12' : '' } });
	  	tempArr = [];
	} // if
}); // forEach