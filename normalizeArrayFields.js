/* 
* Find all array fields (array in the data model) or strings that need 
* to be converted to arrays. 
*
* If only one type of child property (usually 'value') is present, then it is 
* removed and the value of the child is moved directly to the parent.
* 
* If more than one type of child property is present, then they stay the same.
*
* V51, V52, V5, V32, V15, V35 - Fields with more thean one type of child properties.
* These fields have embeded models, often in arrays. The embeded models will be dealt
* sperately, but the parent filds will be converted to ARRAY types.
*
*/

var allArrayFields = [ "v45", "v28", "v26", "v51", "v65", "v53", "v52", "v14", "v42", "v162", "v5", "v13", "v31", "v32", "v21", "v54", "v12", "v15", "v165", "v39", "v35" ];

var simpleArrayFields = [ "v45", "v28", "v26", "v65", "v53", "v14", "v42", "v162", "v13", "v31", "v21", "v54", "v12", "v165", "v39" ];

db.getCollection('verse').find().forEach(function allRecs(rec) {

	for (var i = arrayFields.length - 1; i >= 0; i--) {

		// Individual Array field objects
		var arrayFieldInRec = rec[arrayFields[i]];

		if ( rec[arrayFields[i]] ) {

			// Array fields that need to be remodelled

			if ( Array.isArray(rec[arrayFields[i]]) ) {

				for (var j = arrayFieldInRec.length - 1; j >= 0; j--) {
					
					// ARRAY fields need to be reomdelled here.

					//printjson( arrayFieldInRec[j] + ' (' + arrayFieldInRec.length + ')' );
				
				} 

				// String fields wich need to be converted to arrays

			} if ( !Array.isArray(rec[arrayFields[i]]) ) {

				//printjson( Object.getOwnPropertyNames(rec[arrayFields[i]]) );

				// Array of child properties of individual Array fields
				var fieldProperties = Object.getOwnPropertyNames(rec[arrayFields[i]]);

				for (var k = fieldProperties.length - 1; k >= 0; k--) {
					
					//printjson( arrayFieldInRec[fieldProperties[k]] );

					// Need to convert STRING types to ARRAY here. 

				}
			}
		}
	}
});