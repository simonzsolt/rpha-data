var exists = db.verse.find({ v : { $exists : true } }).count();
var doesNotExist = db.verse.find({ v : { $exists : false } }).count();
var total = db.verse.find().count();
var unaccounted = total - exists - doesNotExist;

print( exists + ' exists' + ' AND ' + doesNotExist + ' does not ' + 'OF ' + total + ' || ' +  unaccounted + ' unaccounted');