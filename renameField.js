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

*/