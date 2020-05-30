const fs = require("fs");
let db = require("../db/db");

module.exports = (app) => {
    let id = "";

    // Displays all notes
    app.get("/api/notes", function (req, res) {
        fs.readFile('db/db.json',"utf8", function(error, data){
            res.json (JSON.parse(data))
        })

    });

    app.post("/api/notes", async function (req, res) {
        let newNote = req.body;

        if (db === "") {
            newNote.id = 1
        } else {
            newNote.id = db[db.length - 1].id + 1;
        }

        id = newNote.id;

        db.push(newNote);

        let newDB = JSON.stringify(db);

        await fs.writeFile('db/db.json', newDB, (err) => {
            if (err) throw err;
            console.log('The note has been saved!');
            res.json(newNote);
        });

        console.log(newDB);

        fs.readFile('db/db.json',"utf8", function(error, data){
            db = JSON.parse(data);
        })
        
    });

    app.delete("/api/notes/:id", function (req, res) {
        let chosenID = req.params.id;

        let updatedDb = db.filter(x => {
            return x.id != chosenID;
        })
       console.log(updatedDb);

        fs.writeFile("db/db.json", JSON.stringify(updatedDb), (err) => {
            if (err) throw err;
            console.log('The note has been deleted!');
            db = updatedDb;
            res.json({ok:true});
        });

    });

};