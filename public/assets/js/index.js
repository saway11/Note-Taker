// Variables
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNotebtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
const activeNote = {};

// A function for getting all notes from the db
const getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

// A function for saving a note to the db
const saveNote = function(note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

// A function for deleting a note from the db
const deleteNote = function(id) {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
    })
};

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = function() {
    $saveNotebtn.hide();

    if (typeof activeNote.id === "number") {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};

