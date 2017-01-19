var tempPrint = [];
var tempWritten = [];

db.verse.find({
        "source": {
            $exists: true
        }
    }).forEach(function(verse) {
            if (verse.source.print) {
                for (i = verse.source.print.length - 1; i >= 0; i--) {
                    //print(verse.id + "-" + verse.source.print[i].bookId )
                    verse.source.print[i].sourceId = verse.id + "-" + verse.source.print[i].bookId;
                    tempPrint.push(verse.source.print[i]);
                }
                db.verse.update({
                    "_id": verse._id
                }, {
                    $set: {
                        "source.print": tempPrint
                    }
                })
                tempPrint = [];

            } else if (verse.source.written) {
                for (j = verse.source.written.length - 1; j >= 0; j--) {
                    //print(verse.id + "-" + verse.source.written[j].bookId )
                    verse.source.written[j].sourceId = verse.id + "-" + verse.source.written[j].bookId;
                    tempWritten.push(verse.source.written[j]);
                }
                db.verse.update({
                    "_id": verse._id
                }, {
                    $set: {
                        "source.written": tempWritten
                    }
                })
                tempWritten = [];
            }
