// create main source records in newSources
db.source.find({
	"recordType": "mainSource"
}).forEach(function(source) {
	printjson({
		"docBibNum": source.docBibNum,
		"docType": source.docType,
		"docOriginalTitle": source.docOriginalTitle,
		"docNewTitle": source.docNewTitle,
		"docGenre": source.docGenre,
		"docAuthor": source.authorDoc,
		"translator": source.translator,
		"docDate": source.docDate,
		"docDenomination": source.docDenomination,
		"docLocation": source.docLocation,
		"library": source.library,
		"collection": source.collection,
		"docShelfmark": source.docShelfmark,
		"docVolName": source.volName,
		"docVolShelfmark": source.docVolShelfmark,
		"facsimileEd": source.facsimileEd,
		"printingLocation": source.printingLocation,
		"printerName": source.printerName,
		"verses": [] // to be gathered from type '5' source records
		// and the rest from verse records
	})
});

// add type '5' source records to 'verses' field
db.source.find({
	"recordType": "5"
}).forEach(function(source) {
	db.newSources.find().forEach(function(newSource) {
		if (source.id.split("-")[2] == newSource.docBibNum &&
			source.id.split("-")[1] == newSource.docType) {
			db.newSources.updateOne({
				"_id": newSource._id
			}, {
				$push: {
					"verses": {
					// source object
					}
				}
			})
		}
	});
});

// get sources from verse records
var tempArr = [];
db.verse.find({
	"source": {
		$exists: true
	}
}).forEach(function(verse) {
	db.newSources.find({
		"versesFromSources": {
			$exists: true
		}
	}).forEach(function(newSource) {
		for (i = verse.source.length - 1; i >= 0; i--) {
			if (newSource.docType == verse.source[i].bookId.split("-")[0] &&
				newSource.docBibNum == verse.source[i].bookId.split("-")[1]) {
				var tempArr = [];
				for (j = newSource.versesFromSources.length - 1; j >= 0; j--) {

					if (tempArr.indexOf(newSource.versesFromSources[j].id) < 0) {
						tempArr.push(newSource.versesFromSources[j].id)
					} else if (tempArr.indexOf(newSource.versesFromSources[j].id) > -1) {}
				}
				if (tempArr.indexOf(verse.id) < 0) {
					db.newSources.updateOne({
						"_id": newSource._id
					}, {
						$push: {
							"versesFromVerse": {
								"verseSourceDocType": verse.source[i].bookId.split("-")[0],
								"verseSourceDocBibNum": verse.source[i].bookId.split("-")[1],
								"id": verse.id,
								"newSource": newSource.docType + "-" + newSource.docBibNum,
								"page": verse.source[i].page,
								"pageSubId": verse.source[i].pageSubId,
								"type": verse.source[i].type,
								"length": verse.source[i].length,
								"integrity": verse.source[i].integrity,
								"lengthUnit": verse.source[i].lengthUnit,
								"recordType": verse.source[i].recordType,
								"comments": verse.source[i].comments,
								"title": verse.source[i].title,
								"acrostic": verse.source[i].acrostic,
								"incipit": verse.source[i].incipit,
								"acrostiState": verse.source[i].acrostiState,
								"dedicatee": verse.source[i].dedicatee,
								"datePrecision": verse.source[i].datePrecision,
								"colophonInfo": verse.source[i].colophonInfo,
								"metreScheme": verse.source[i].metreScheme,
								"rhymeScheme": verse.source[i].rhymeScheme,
								"syllNum": verse.source[i].syllNum,
								"colophonState": verse.source[i].colophonState,
								"acrosticInfo": verse.source[i].acrosticInfo,
								"refrain": verse.source[i].refrain,
								"author": verse.source[i].author,
								"url": verse.source[i].url
							}
						}
					})
				}
			}
		}
	})
})

//=============================================
// add combined verse object to 'newSources.verses' field
// from type '5' sources and 'verse.source' fields

db.newSources.find().forEach(function(newSource) {
	db.source.find({
		"recordType": "5"
	}).forEach(function(source) {
		db.verse.find({
			"source": {
				$exists: true
			}
		}).forEach(function(verse) {
			for (i = verse.source.length - 1; i >= 0; i--) {
				if (source.source.bookId == verse.source[i].bookId) {
					if (source.id.split("-")[2] == newSource.docBibNum &&
						source.id.split("-")[1] == newSource.docType) {
						db.newSources.updateOne({
							"_id": newSource._id
						}, {
							$push: {
								"verses": {
									"id": verse.id,
									"pageSubId": verse.source[i].pageSubId,
									"page": verse.source[i].page,
									"url": verse.source[i].url,
									"type": verse.source[i].type,
									"length": source.length,
									"integrity": source.integrity,
									"lengthUnit": source.lengthUnit,
									"comments":source.comments,
									"title": source.title,
									"acrostic": source.acrostic,
									"incipit": source.incipit,
									"acrostiState": source.acrostiState,
									"dedicatee": source.dedicatee,
									"datePrecision": source.datePrecision,
									"colophonInfo": source.colophonInfo,
									"metreScheme": source.metreScheme,
									"rhymeScheme": source.rhymeScheme,
									"syllNum": source.syllNum,
									"colophonState": source.colophonState,
									"acrosticInfo": source.acrosticInfo,
									"refrain": source.refrain,
									"author": source.author
								}
							}
						})
					}
				} // if source == verse

				else if (verse.source[i].docBibNum == newSource.docBibNum &&
					verse.source[i].docType == newSource.docType) {
					db.newSources.updateOne({
						"_id": newSource._id
					}, {
						$push: {
							"verses": {
								// document from verse
							}
						}
					})
				}

			} // for verse.source
		}); // forEach verse

		if (source.id.split("-")[2] == newSource.docBibNum &&
			source.id.split("-")[1] == newSource.docType) {
			db.newSources.updateOne({
				"_id": newSource._id
			}, {
				$push: {
					"verses": {
						// document from source records
					}
				}
			})
		}
	}) // forEach source
}) // forEach newSource









//--------------------

db.verse.find({
	"source": {
		$exists: true
	}
}).forEach(function(verse) {
	db.newSources.find().forEach(function(newSource) {
		for (i = verse.source.length - 1; i >= 0; i--) {

			if (newSource.docType == verse.source[i].bookId.split("-")[0] &&
				newSource.docBibNum == verse.source[i].bookId.split("-")[1]) {

				db.newSources.updateOne({
					"_id": newSource._id
				}, {
					$push: {
						"versesFromVerse": {
							"verseSourceDocType": verse.source[i].bookId.split("-")[0],
							"verseSourceDocBibNum": verse.source[i].bookId.split("-")[1],
							"id": verse.id,
							"page": verse.source[i].page,
							"pageSubId": verse.source[i].pageSubId,
							"type": verse.source[i].type,
							"length": verse.source[i].length,
							"integrity": verse.source[i].integrity,
							"lengthUnit": verse.source[i].lengthUnit,
							"recordType": verse.source[i].recordType,
							"comments": verse.source[i].comments,
							"title": verse.source[i].title,
							"acrostic": verse.source[i].acrostic,
							"incipit": verse.source[i].incipit,
							"acrostiState": verse.source[i].acrostiState,
							"dedicatee": verse.source[i].dedicatee,
							"datePrecision": verse.source[i].datePrecision,
							"colophonInfo": verse.source[i].colophonInfo,
							"metreScheme": verse.source[i].metreScheme,
							"rhymeScheme": verse.source[i].rhymeScheme,
							"syllNum": verse.source[i].syllNum,
							"colophonState": verse.source[i].colophonState,
							"acrosticInfo": verse.source[i].acrosticInfo,
							"refrain": verse.source[i].refrain,
							"author": verse.source[i].author,
							"url": verse.source[i].url
						}
					}
				})
			}
		}
	})
})
