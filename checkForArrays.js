// Check all fields for Array types and list them.

var listOfArrayTypes = [];

db.getCollection('verse').find().forEach(function allRecs(rec) {

	var fields = Object.getOwnPropertyNames(rec);
        
	for (var i = fields.length - 1; i >= 0; i--) {
            
        if ( Array.isArray(rec[fields[i]]) ) {
                
            if ( listOfArrayTypes.indexOf(fields[i]) < 0 ) {
                listOfArrayTypes.push(fields[i]);
            }   
            
        }
	}        
});

printjsononeline(listOfArrayTypes);

/*

--------
Results:
--------

[ "v45", "v28", "v26", "v51", "v65", "v53", "v52", "v14", "v42", "v162", "v5", "v13", "v31", "v32", "v21", "v54", "v12", "v15", "v165", "v39", "v35" ]

[ "metreScheme", "genre", "v26", "melodyEd", "sharedMelodyBases", "writtenSources", "printedSources", "hymnId", "length", "sourceRel", "author", "originalTitle", "dedicatee", "colophonInfo", "date", "modernEd", "originalIncipit", "authorInfluence", "comments", "recordRel", "acrosticInfo", "facsimileEd", "sharedMelodyTargets", "title", "refrain", "v6" ]

*/

db.verse.find({ v : { $exists : true } }).forEach(function(verse){
	if (Array.isArray(verse.v)) {print(verse._id)} 
});

//=================================================================

db.source.find({ v : { $exists : true } }).forEach(function(source){
	if (Array.isArray(source.v)) {print(source._id)} 
});

