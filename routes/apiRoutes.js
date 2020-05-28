const fs = require("fs");
const db = require("../db/db");

module.exports = (app) => {
let id = "";

    // Displays all notes
    app.get("/api/notes", function (req, res) {
        return res.json(db);

    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;

        if (db === "") {
            newNote.id = 1
        } else {
            newNote.id = db.length;
        }

        id= newNote.id;

        db.push(newNote);

        let newDB = JSON.stringify(db);

        fs.writeFile('note.html', newDB, (err) => {
            if (err) throw err;
            console.log('The note has been saved!');
        });

        app.delete("/api/notes/:id", function (req, res) {
            let chosenID = req.params.id;

            // db.json is array
            // activeNote = the note in the textarea = object
          //  let activeNote = {};

            //assigning the id to each item in the array
            if (!db === undefined || !db.length == 0) {
                for (let i = 0; i < db.length; i++) {
                    db[i].id = i;
                }
            }

            let deleteNote = db.filter(x => {
                return x.id != id;
            })
            console.log(deleteNote);

            fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
                if (err) throw err;
                console.log('The note has been deleted!');
            });

            res.json(chosenID);
        });
    });
};