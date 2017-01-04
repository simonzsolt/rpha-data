
 db.verse.find({ 'recordType' : { $exists : true } }).count()

/*

mainVerseCount: 1521

extVerseCount: 18

otherVerseCount: 333

mainSourceCount: 715

totalVerseTypes: 2587

totalVerseTypesCheck: 2589

VERSE
-----
2601 in total before export and delete
1872 in total after export and delete


- 2589 recordType
	- values: 
		- mainVerse (#1521)
		- extVerse (#18)
		- otherVerse (#333)
		- mainSource (#715)
		- 5 (#2)
- 0 v91
- 12 without any document type field:
	
	- RMNY-1309
	- RMNY-1314
	- MKEVB0-0806
	- MKEVB0-0805
	- RMNY-0856B
	- MKEVB0-0900
	- MKEVB0-0901
	- MKEVB0-0902
	- MKEVB0-0903
	- MKEVB0-0904
	- RMK1-1155B
	- MKEVB0-0907

export:
	- 'recordType' : 'mainSource' 
	- 'recordType' : '5'
	- 'recordType' exists : false

SOURCE
------
5347 in total before import
6076 in total after import

- 0 recordType
- 5347 v91
	- values: 
		- 5 (#5341)
		- 9 (#6) [AKA: mainSource]


LOGS
----

mongoexport -d rpha -c verse --jsonArray -q '{ "recordType" : "mainSource" }' -o ./tempJson/verse_mainSource.json

	- exported 715 records

mongoexport -d rpha -c verse --jsonArray -q '{ "recordType" : "5" }' -o ./tempJson/verse_5.json
	
	- exported 2 records

mongoexport -d rpha -c verse --jsonArray -q '{ "recordType" : { $exists : false } }' -o ./tempJson/verse_false.json

	- exported 12 records

mongoimport -d rpha -c source --jsonArray --file ./tempJson/verse_5.json

 	- Wed Jan  4 21:10:09.545 imported 2 objects

mongoimport -d rpha -c source --jsonArray --file ./tempJson/verse_false.json
	
	- Wed Jan  4 21:11:16.040 check 9 12
	- Wed Jan  4 21:11:16.040 imported 12 objects

mongoimport -d rpha -c source --jsonArray --file ./tempJson/verse_mainSource.json

	- Wed Jan  4 21:12:42.734 check 9 715
	- Wed Jan  4 21:12:42.736 imported 715 objects


db.verse.deleteMany({ 'recordType' : 'mainSource' })

	{ "acknowledged" : true, "deletedCount" : 715.0 }

db.verse.deleteMany({ 'recordType' : '5' })

	{ "acknowledged" : true, "deletedCount" : 2.0 }

db.verse.deleteMany({ 'recordType' : { $exists : false } })

	{ "acknowledged" : true, "deletedCount" : 12.0 }

*/