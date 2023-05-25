// Variables
var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNotebtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

// A function for saving a note to the db
var saveNote = function(note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

// A function for deleting a note from the db
var deleteNote = function(id) {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
    })
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
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
var handleNoteSave = function() {
    var newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };

    saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
}

// Delete the click note
var handleNoteDelete = function(event) {
    // prevents the click listener for the list from being called when the btn inside of it is clicked
    event.stopPropagation();

    var note = $(this).data('id');

    if (activeNote.id === note) {
        activeNote = {};
    }

    deleteNote(note)
    getAndRenderNotes();
    renderActiveNote();
};

// sets the activeNote and displays it
var handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
};

// Set the activeNote to an empty object and allos the user to enter a new note
var handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote();
};

// if a note's title or text are empty, hide the save button
// or else show it
var handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNotebtn.hide();
    } else {
        $saveNotebtn.show();
    }
};

// Render's the list of the note titles
var renderNoteList = function(notes) {
    $noteList.empty();

    var noteListItems = [];

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];

        var $li = $("<li class='list-group-item'>").data(note);
        var $span = $("<span>").text(note.title);
        var $delBtn = $(
            "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
        );

        $li.append($span, $delBtn);
        noteListItems.push($li);
    }

    $noteList.append(noteListItems);
};

// Get notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
    return getNotes().then(function(data) {
        renderNoteList(data);
    });
};
