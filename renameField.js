conn = new Mongo();
db = conn.getDB("rpha");

db.verse.updateMany( { v : { $exists : true } }, { $rename : { 'v' : 'NEW_NAME' } } );

db.verse.find({ v5 : { $exists : true } }).forEach(function(verse){
	if (!Array.isArray(verse.v5)) {
		
		db.verse.update({ v5 : { $exists : true } }, { $rename : { v5.s1 : "author.surname" } });
		
	} // if Array
});