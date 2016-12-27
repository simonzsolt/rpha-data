var propertiesTemp = []
var propertiesTotal = []

db.verse.find({ v48 : { $exists : true } }).forEach(function(verse){
	if (!Array.isArray(verse.v48)) {
	
		propertiesTemp = Object.getOwnPropertyNames(verse.v48);
		
		for (i = propertiesTemp.length-1; i>=0; i--) {
			if ( propertiesTotal.indexOf(propertiesTemp[i]) < 0  ) { propertiesTotal.push(propertiesTemp[i]) }
		} 
	  
	} 
});

printjson(propertiesTotal)