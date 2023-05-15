// importing two built in node.js modules
const fs = require('fs');
const path = require("path");

// This function is taking two parameters and assigning a value to a variable.
// Pushing the 'note' to the 'notesArray' and writing the 'notesArray' to a file
// 'db.json' using fs.writeFileSync and JSON.stringify
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return notesArray;
}

function

