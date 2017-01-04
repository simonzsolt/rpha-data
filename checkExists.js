var exists = db.verse.find({ v113 : { $exists : true } }).count();
var doesNotExist = db.verse.find({ v113 : { $exists : false } }).count();
var total = db.verse.find().count();
var unaccounted = total - exists - doesNotExist;

print( 'VERSE \n\n' + exists + ' exists' + ' AND ' + doesNotExist + ' does not ' + 
	'OF ' + total + ' || ' +  unaccounted + ' unaccounted BY checkExists.js');

var exists = db.source.find({ v113 : { $exists : true } }).count();
var doesNotExist = db.source.find({ v113 : { $exists : false } }).count();
var total = db.source.find().count();
var unaccounted = total - exists - doesNotExist;

print( 'SOURCE \n\n' + exists + ' exists' + ' AND ' + doesNotExist + ' does not ' + 
	'OF ' + total + ' || ' +  unaccounted + ' unaccounted BY checkExists.js');
	