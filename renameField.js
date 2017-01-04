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

/*
	{ 
		'bookId' 			: verse.v52[i].bookId,
		'docBibNum' 		: verse.v52[i].v111,
		'itemId' 			: verse.v52[i].itemId,
		'docType' 			: verse.v52[i].v101,
		'pageSubId' 		: verse.v52[i].pageSubid,
		'pageSubNote' 		: verse.v52[i].pageSubnote,
		'page' 				: verse.v52[i].page,
		'itemSubId' 		: verse.v52[i].itemSubId,
		'itemSubNote' 		: verse.v52[i].itemSubnote,
		'itemMainId' 		: verse.v52[i].itemMainId,
		'sourceTypeCode' 	: verse.v52[i].forrasTipusKod,
		'value' 			: verse.v52[i].value
	}

	{ 
		'v52.bookId' 			: 'writtenSources.bookId', 
		'v52.v111' 				: 'writtenSources.docBibNum', 
		'v52.itemId' 			: 'writtenSources.itemId', 
		'v52.v101' 				: 'writtenSources.docType', 
		'v52.pageSubid' 		: 'writtenSources.pageSubId', 
		'v52.pageSubnote' 		: 'writtenSources.pageSubNote', 
		'v52.page' 				: 'writtenSources.page', 
		'v52.itemSubId' 		: 'writtenSources.itemSubId', 
		'v52.itemSubnote' 		: 'writtenSources.itemSubNote', 
		'v52.itemMainId' 		: 'writtenSources.itemMainId', 
		'v52.forrasTipusKod' 	: 'writtenSources.sourceTypeCode', 
		'v52.value' 			: 'writtenSources.value' 
	}

	{
		'v51.bookId' 			: 'printedSources.bookId', 
		'v51.v111' 				: 'printedSources.docBibNum', 
		'v51.itemId' 			: 'printedSources.itemId', 
		'v51.v101' 				: 'printedSources.docType', 
		'v51.pageSubid' 		: 'printedSources.pageSubId', 
		'v51.pageSubnote' 		: 'printedSources.pageSubNote', 
		'v51.page' 				: 'printedSources.page', 
		'v51.itemSubId' 		: 'printedSources.itemSubId', 
		'v51.itemSubnote' 		: 'printedSources.itemSubNote', 
		'v51.itemMainId' 		: 'printedSources.itemMainId', 
		'v51.forrasTipusKod' 	: 'printedSources.sourceTypeCode', 
		'v51.value' 			: 'printedSources.value' 	

	}

*/

//==================================================================

db.source.updateMany( { v : { $exists : true } }, { $rename : { 'v' : 'NEW_NAME' } } );


// IF ARRAY OF EMBEDED DOCUMENTS

var tempArr = [];
db.source.find({ v : { $exists : true } }).forEach(function(source){
	if ( Array.isArray(source.v) ) {   	    
	  	for ( i=source.v.length-1; i>=0; i-- ) {
	  	  	tempArr.push(
	  	  		{ 
	  	  			'surname' : source.v[i].s1, 
	  	  			'forename' : source.v[i].s2, 
	  	  			'note' : source.v[i].s3
	  	  			// '_id' : source._id,
	  	  			// 'i' : i
	  	  		}); // push
	  	} // for
	  	db.source.update({ '_id' : source._id }, { $set : { 'NEW_FIELD_NAME' : tempArr } });
	  	db.source.update({ '_id' : source._id }, { $unset : { 'v' : '' } });
	  	tempArr = [];
	} // if
}); // forEach
