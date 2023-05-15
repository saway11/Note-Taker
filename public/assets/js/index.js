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

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function() {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };

    saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
}

// Delete the click note
const handleNoteDelete = function(event) {
    // prevents the click listener for the list from being called when the btn inside of it is clicked
    event.stopPropagation();

    const note = $(this).data('id');

    if (activeNote.id === note) {
        activeNote = {};
    }

    deleteNote(note)
    getAndRenderNotes();
    renderActiveNote();
};

// sets the activeNote and displays it
const handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
};

// Set the activeNote to an empty object and allos the user to enter a new note
const handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote();
};

// if a note's title or text are empty, hide the save button
// or else show it
const handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNotebtn.hide();
    } else {
        $saveNotebtn.show();
    }
};
