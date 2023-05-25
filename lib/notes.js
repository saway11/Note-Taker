// Node.js code that includes the 'fs' and 'path' modules, and defines a function called 'createNewNote'

const fs = require("fs");
const path = require("path");

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return note;
}

// created a function to update notes
function updateDb(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
}

// exporting two functions to allow other files to import and use these functions
module.exports = {
    createNewNote,
    updateDb
}


