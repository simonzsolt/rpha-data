db.verse.find({
	"source": {
		$exists: true
	}
}).forEach(function(verse) {
	db.source.find().forEach(function(source) {
		for (i = verse.source.length - 1; i >= 0; i--) {
			if (db.source.find({
					"id": verse.source[i].bookId
				}).count() < 1) {
				print(verse.id)
			}
		}
	})
})
