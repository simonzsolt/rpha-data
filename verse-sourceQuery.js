#!/usr/bin/arangosh --javascript.execute

db._useDatabase("rpha");

// print(db._query('FOR v IN verse FILTER v.id == "0839" RETURN v').toArray())

print(db._query( 'FOR v IN verse FILTER TYPENAME(v.source) == "array" FOR book IN v.source FOR s IN source FILTER s.id == CONCAT(v.id, "-", book.bookId) RETURN { "_from": v._id, "_to": s._id }' ).toArray());
