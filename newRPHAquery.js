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

	db.source.find({ "recordType": "5" }).forEach(function(source) {

		db.verse.find({ "source": { $exists: true } }).forEach(function(verse) {

				for (i = verse.source.length - 1; i >= 0; i--) {

				if (source.source && source.source.bookId == verse.source[i].bookId) {
					if (source.id.split("-")[2] == newSource.docBibNum &&
						source.id.split("-")[1] == newSource.docType) {
						print(source.source.bookI + ' :: ' + verse.source[i].bookId + ' :: ' + source.id + ' :: ' + newSource.docType + '-' + newSource.docBibNum)
						/*
						db.newSources.updateOne({"_id": newSource._id }, { $push: {
								"verses": {
									"id": verse.id,
									"incipit": source.incipit,
									"author": source.author,
									"dedicatee": source.dedicatee,
									"title": source.title,
									"metreScheme": source.metreScheme,
									"rhymeScheme": source.rhymeScheme,
									"datePrecision": source.datePrecision,
									"acrostic": source.acrostic,
									"acrostiState": source.acrostiState,
									"acrosticInfo": source.acrosticInfo,
									"colophonInfo": source.colophonInfo,
									"colophonState": source.colophonState,
									"syllNum": source.syllNum,
									"length": source.length,
									"lengthUnit": source.lengthUnit,
									"refrain": source.refrain,
									"pageSubId": verse.source[i].pageSubId,
									"page": verse.source[i].page,
									"comments":source.comments,
									"integrity": source.integrity,
									"type": verse.source[i].type,
									"url": verse.source[i].url,
									"tradition": source.tradition,
									"song": source.song,
									"signature": source.signature,
									"modernEd": source.modernEd,
									"metreType": source.metreType,
									"metreSchema": source.metreSchema,
									"genre": source.genre,
									"denomination": source.denomination,
									"date": source.date,
									"originalIncipit": source.originalIncipit,
									"sourceRel": source.sourceRel,
									"authorInfluence": source.authorInfluence,
									"sharedMelodyBases": source.sharedMelodyBases,
									"originalTitle": source.originalTitle,
									"melodyEd": source.melodyEd,
									"hymnId": source.hymnId,
									"partialRel": source.partialRel,
									"recordRel": source.recordRel,
									"facsimileEd": source.facsimileEd,
									"echo": source.echo,
									"originalLanguage": source.originalLanguage,
									"sharedMelodyTargets": source.sharedMelodyTargets

								}
							}})
						*/
					}
				} // if source == verse
				else if (verse.source[i].docBibNum == newSource.docBibNum &&
					verse.source[i].docType == newSource.docType) {
					print("verse")
					/*
					db.newSources.updateOne({ "_id": newSource._id }, { $push: {"verses": {
								"id": verse.id,
								"incipit": verse.incipit,
								"author": verse.author,
								"dedicatee": verse.dedicatee,
								"title": verse.title,
								"metreScheme": verse.metreScheme,
								"rhymeScheme": verse.rhymeScheme,
								"datePrecision": verse.datePrecision,
								"acrostic": verse.acrostic,
								"acrostiState": verse.acrostiState,
								"acrosticInfo": verse.acrosticInfo,
								"colophonInfo": verse.colophonInfo,
								"colophonState": verse.colophonState,
								"syllNum": verse.syllNum,
								"length": verse.length,
								"lengthUnit": verse.lengthUnit,
								"refrain": verse.refrain,
								"pageSubId": verse.source[i].pageSubId,
								"page": verse.source[i].page,
								"comments":verse.comments,
								"integrity": verse.integrity,
								"type": verse.source[i].type,
								"url": verse.source[i].url,
								"tradition": verse.tradition,
								"song": verse.song,
								"signature": verse.signature,
								"modernEd": verse.modernEd,
								"metreType": verse.metreType,
								"metreSchema": verse.metreSchema,
								"genre": verse.genre,
								"denomination": verse.denomination,
								"date": verse.date,
								"originalIncipit": verse.originalIncipit,
								"sourceRel": verse.sourceRel,
								"authorInfluence": verse.authorInfluence,
								"sharedMelodyBases": verse.sharedMelodyBases,
								"originalTitle": verse.originalTitle,
								"melodyEd": verse.melodyEd,
								"hymnId": verse.hymnId,
								"partialRel": verse.partialRel,
								"recordRel": verse.recordRel,
								"facsimileEd": verse.facsimileEd,
								"echo": verse.echo,
								"originalLanguage": verse.originalLanguage,
								"sharedMelodyTargets": verse.sharedMelodyTargets
							}} })
					*/
				}
			} // for verse.source
		}); // forEach verse
		if (source.id.split("-")[2] == newSource.docBibNum &&
			source.id.split("-")[1] == newSource.docType) {
			print("source")
			/*
			db.newSources.updateOne({ "_id": newSource._id }, { $push: {
					"verses": {
						"id": source.id.split("-")[0],
						"incipit": source.incipit,
						"author": source.author,
						"dedicatee": source.dedicatee,
						"title": source.title,
						"metreScheme": source.metreScheme,
						"rhymeScheme": source.rhymeScheme,
						"datePrecision": source.datePrecision,
						"acrostic": source.acrostic,
						"acrostiState": source.acrostiState,
						"acrosticInfo": source.acrosticInfo,
						"colophonInfo": source.colophonInfo,
						"colophonState": source.colophonState,
						"syllNum": source.syllNum,
						"length": source.length,
						"lengthUnit": source.lengthUnit,
						"refrain": source.refrain,
						"pageSubId": source.source.pageSubId,
						"page": source.source.page,
						"comments":source.comments,
						"integrity": source.integrity,
						"type": source.source.type,
						"url": source.source.url,
						"tradition": source.tradition,
						"song": source.song,
						"signature": source.signature,
						"modernEd": source.modernEd,
						"metreType": source.metreType,
						"metreSchema": source.metreSchema,
						"genre": source.genre,
						"denomination": source.denomination,
						"date": source.date,
						"originalIncipit": source.originalIncipit,
						"sourceRel": source.sourceRel,
						"authorInfluence": source.authorInfluence,
						"sharedMelodyBases": source.sharedMelodyBases,
						"originalTitle": source.originalTitle,
						"melodyEd": source.melodyEd,
						"hymnId": source.hymnId,
						"partialRel": source.partialRel,
						"recordRel": source.recordRel,
						"facsimileEd": source.facsimileEd,
						"echo": source.echo,
						"originalLanguage": source.originalLanguage,
						"sharedMelodyTargets": source.sharedMelodyTargets
					}
				} } )
			*/
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
//======================================================================================
// create versesFromBoth collection
// TODO: two source with type '5' and no 'source.source' field
db.sourcesFromVerses.find().forEach(function(sourceFromverse){
	db.source.find({"recordType":"5"}).forEach(function(source){
		if (source.source && sourceFromverse.bookId == source.source.bookId) {
		  if( db.VersesfromBoth.findOne({"bookId":source.source.bookId}) !== null ){
				db.VersesfromBoth.updateOne({"bookId":source.source.bookId},{$push:{"verses":{
									"id": sourceFromverse.sourceId.split("-")[0],
									"incipit": source.incipit,
									"author": source.author,
									"dedicatee": source.dedicatee,
									"title": source.title,
									"metreScheme": source.metreScheme,
									"rhymeScheme": source.rhymeScheme,
									"datePrecision": source.datePrecision,
									"acrostic": source.acrostic,
									"acrostiState": source.acrostiState,
									"acrosticInfo": source.acrosticInfo,
									"colophonInfo": source.colophonInfo,
									"colophonState": source.colophonState,
									"syllNum": source.syllNum,
									"length": source.length,
									"lengthUnit": source.lengthUnit,
									"refrain": source.refrain,
									"pageSubId": sourceFromverse.pageSubId,
									"page": sourceFromverse.page,
									"comments":source.comments,
									"integrity": source.integrity,
									"type": sourceFromverse.type,
									"url": sourceFromverse.url,
									"tradition": source.tradition,
									"song": source.song,
									"signature": source.signature,
									"modernEd": source.modernEd,
									"metreType": source.metreType,
									"metreSchema": source.metreSchema,
									"genre": source.genre,
									"denomination": source.denomination,
									"date": source.date,
									"originalIncipit": source.originalIncipit,
									"sourceRel": source.sourceRel,
									"authorInfluence": source.authorInfluence,
									"sharedMelodyBases": source.sharedMelodyBases,
									"originalTitle": source.originalTitle,
									"melodyEd": source.melodyEd,
									"hymnId": source.hymnId,
									"partialRel": source.partialRel,
									"recordRel": source.recordRel,
									"facsimileEd": source.facsimileEd,
									"echo": source.echo,
									"originalLanguage": source.originalLanguage,
									"sharedMelodyTargets": source.sharedMelodyTargets

				}}})
		  } else if( db.VersesfromBoth.findOne({"bookId":source.source.bookId}) == null ){
		  	db.VersesfromBoth.insert({
		  	"bookId": source.source.bookId,
		  	"verses":[{
		  		"id": sourceFromverse.sourceId.split("-")[0],
									"incipit": source.incipit,
									"author": source.author,
									"dedicatee": source.dedicatee,
									"title": source.title,
									"metreScheme": source.metreScheme,
									"rhymeScheme": source.rhymeScheme,
									"datePrecision": source.datePrecision,
									"acrostic": source.acrostic,
									"acrostiState": source.acrostiState,
									"acrosticInfo": source.acrosticInfo,
									"colophonInfo": source.colophonInfo,
									"colophonState": source.colophonState,
									"syllNum": source.syllNum,
									"length": source.length,
									"lengthUnit": source.lengthUnit,
									"refrain": source.refrain,
									"pageSubId": sourceFromverse.pageSubId,
									"page": sourceFromverse.page,
									"comments":source.comments,
									"integrity": source.integrity,
									"type": sourceFromverse.type,
									"url": sourceFromverse.url,
									"tradition": source.tradition,
									"song": source.song,
									"signature": source.signature,
									"modernEd": source.modernEd,
									"metreType": source.metreType,
									"metreSchema": source.metreSchema,
									"genre": source.genre,
									"denomination": source.denomination,
									"date": source.date,
									"originalIncipit": source.originalIncipit,
									"sourceRel": source.sourceRel,
									"authorInfluence": source.authorInfluence,
									"sharedMelodyBases": source.sharedMelodyBases,
									"originalTitle": source.originalTitle,
									"melodyEd": source.melodyEd,
									"hymnId": source.hymnId,
									"partialRel": source.partialRel,
									"recordRel": source.recordRel,
									"facsimileEd": source.facsimileEd,
									"echo": source.echo,
									"originalLanguage": source.originalLanguage,
									"sharedMelodyTargets": source.sharedMelodyTargets
		  	}]
		  	})
		  }
		}
	})
})
