db.verse.find({
    "printedSources": {
        $exists: true
    }
}).forEach(function(verse) {
    for (i = verse.printedSources.length - 1; i >= 0; i--) {
        verse.printedSources[i].type = "print";
        verse.printedSources[i].sourceId = verse.id + "-" + verse.printedSources[i].bookId;
        db.verse.update({
            "_id": verse._id
        }, {
            $push: {
                "source": verse.printedSources[i]
            }
        })
    }
})

db.verse.find({
    "writtenSources": {
        $exists: true
    }
}).forEach(function(verse) {
    for (i = verse.writtenSources.length - 1; i >= 0; i--) {
        verse.writtenSources[i].type = "written";
        verse.writtenSources[i].sourceId = verse.id + "-" + verse.writtenSources[i].bookId;
        db.verse.update({
            "_id": verse._id
        }, {
            $push: {
                "source": verse.writtenSources[i]
            }
        })

    }
})
