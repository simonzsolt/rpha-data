db.verse.find({"source":{$exists:true}}).forEach(function(verse){
	for ( i=verse.source.length-1; i >= 0; i-- ){
		if ( db.verseSources.find({"bookId": verse.source[i].bookId}).count() > 0 ){
			db.verseSources.updateOne({"bookId": verse.source[i].bookId},{$push:{"verses":{
				"sourceId": verse.source[i].sourceId,
				"type": verse.source[i].type,
				"page": verse.source[i].page,
				"pageSubId": verse.source[i].pageSubId
			}}})
		} 
		else {
			db.verseSources.insertOne({
				"bookId": verse.source[i].bookId,
				"verses": [{
					"sourceId": verse.source[i].sourceId,
					"type": verse.source[i].type,
					"page": verse.source[i].page,
					"pageSubId": verse.source[i].pageSubId
				}]
			})
		}
	}
})