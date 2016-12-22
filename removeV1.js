conn = new Mongo();
db = conn.getDB("rpha");

db.verse.updateMany({}, { $unset : { 'v1' : ""} });
