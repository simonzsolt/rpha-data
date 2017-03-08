var propertiesTemp = []
var propertiesTotal = []
db.verse.find({
	v48: {
		$exists: true
	}
}).forEach(function(verse) {
	if (!Array.isArray(verse.v48)) {

		propertiesTemp = Object.getOwnPropertyNames(verse.v48);

		for (i = propertiesTemp.length - 1; i >= 0; i--) {
			if (propertiesTotal.indexOf(propertiesTemp[i]) < 0) {
				propertiesTotal.push(propertiesTemp[i])
			}
		}

	}
});
printjson(propertiesTotal)


var propertiesTemp = []
var propertiesTotal = []
db.source.find({
	"recordType": "5"
}).forEach(function(source) {
	propertiesTemp = Object.getOwnPropertyNames(source);
	for (i = propertiesTemp.length - 1; i >= 0; i--) {
		if (propertiesTotal.indexOf(propertiesTemp[i]) < 0) {
			propertiesTotal.push(propertiesTemp[i])
		}
	}
});
printjson(propertiesTotal)

//---------------------

var propertiesTempSource = [];
var propertiesTotalSource = [];
var propertiesTempVerse = [];
var propertiesTotalVerse = [];
var uniqueVerse = [];
var uniqueSource = [];
db.source.find({
	"recordType": "5"
}).forEach(function(source) {
	propertiesTempSource = Object.getOwnPropertyNames(source);
	for (i = propertiesTempSource.length - 1; i >= 0; i--) {
		if (propertiesTotalSource.indexOf(propertiesTempSource[i]) < 0) {
			propertiesTotalSource.push(propertiesTempSource[i])
		}
	}
});
db.verse.find({
	"source": {
		$exists: true
	}
}).forEach(function(verse) {
	for (j = verse.source.length - 1; j >= 0; j--) {
		propertiesTempVerse = Object.getOwnPropertyNames(verse.source[j]);

		for (k = propertiesTempVerse.length - 1; k >= 0; k--) {
			if (propertiesTotalVerse.indexOf(propertiesTempVerse[k]) < 0) {
				propertiesTotalVerse.push(propertiesTempVerse[k])
			}
		}
	}
});

for (l = propertiesTotalVerse.length - 1; l >= 0; l--) {
	if (propertiesTotalSource.indexOf(propertiesTotalVerse[l]) < 0) {
		uniqueVerse.push(propertiesTotalVerse[l])
	}
}
for (m = propertiesTotalSource.length - 1; m >= 0; m--) {
	if (propertiesTotalVerse.indexOf(propertiesTotalSource[m]) < 0) {
		uniqueSource.push(propertiesTotalSource[m])
	}
}
printjson(uniqueSource);
printjson(uniqueVerse);
