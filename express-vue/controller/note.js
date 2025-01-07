const { note } = require("../models");
const noteModel = require("../models/note")

const addNote = async (req, res) => {
    let data  = req.body;
    if (data) {
        console.log(data)
        try {
            const newNote = note(data);
            await newNote.save();
            res.send({
                status: true,
                message: "New Note added",
                data: data,
            });
        }
        catch (e) {
            res.send({
                status: false,
                message: "Note not added",
                data: []
            })
        }
    }
    else {
        res.send({
            status: false,
            message: "Empty Column!"
        })
    }

}
const listNotes = async (req, res) => {
    let select = "note";
    let where = {};
    let data = await noteModel.getListing(req, select, where);
    // console.log(data)
    if (data) {
        let count = await noteModel.getCounts(where);
        res.send({
            status: true,
            message: "Data Fetch Successfully",
            total: count,
            data: data
        });
    }
    else {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
}

const deleteNote = async (req, res) => {
    let data = req.body;
    if (data) {
        const resp = await noteModel.remove(data);
        if (resp) {
            res.send({
                status: true ,
                message: "Note Deleted Successfully",
                data: resp,
            });
        } else {
            res.send({
                status: false,
                message: "Note Not Found",
                data: [],
            });
        }
    }
    else {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }

}

module.exports = {
    addNote,
    listNotes,
    deleteNote
}