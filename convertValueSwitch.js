
db.verse.find({ v91 : { $exists : true } }).forEach( function(verse) {
	switch (verse.v91){
	
		case '0':
			
			db.verse.update( { _id : verse._id }, { $set : { 'v91' : 'mainVerse' } } )
			break;
		
		case '6':
		
			db.verse.update( { _id : verse._id }, { $set : { 'v91' : 'extVerse' } } )
			break;		
			
		case '8':
		
			db.verse.update( { _id : verse._id }, { $set : { 'v91' : 'otherVerse' } } )
			break;
			
		case '9':
		
			db.verse.update( { _id : verse._id }, { $set : { 'v91' : 'mainSource' } } )
			break;
			
	}	 
});
