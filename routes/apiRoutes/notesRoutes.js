const router = require("express").Router();
const { createNewNote, updateDb } = require("../../lib/notes");
const { notes } = require("../../db/db");
const uniqid = require("uniqid")

router.get("/notes", (req, res) => {
    let results = notes
    res.json(results)
})

router.post("/notes", (req, res) => {
    // set id randomly
    req.body.id = uniqid()
    const note = createNewNote(req.body, notes)
    res.json(note);
})

router.delete("/notes/:id", (req, res) => {
    const idDeleted = req.params.id.toString();

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === idDeleted) {
            notes.splice(i, 1)
        }
    }

    updateDb(notes);
});

module.exports = router;