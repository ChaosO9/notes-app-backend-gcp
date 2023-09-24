"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdHandler = exports.editNoteByIdHandler = exports.getNoteByIdHandler = exports.getAllNotesHandler = exports.addNoteHandler = void 0;
const nanoid_1 = require("nanoid");
const notes_1 = require("./notes");
function addNoteHandler(req, res) {
    let payload = "";
    if (typeof req.payload === "string") {
        try {
            payload = JSON.parse(req.payload);
        }
        catch (error) {
            return;
        }
    }
    else if (typeof req.payload === "object") {
        payload = req.payload;
    }
    const { title, tags, body } = payload;
    const id = (0, nanoid_1.nanoid)(16);
    const createdAt = new Date().toString();
    const updatedAt = createdAt;
    const newNote = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt,
    };
    notes_1.notes.push(newNote);
    const isSuccess = notes_1.notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = res.response({
            status: "success",
            message: "Catatan berhasil ditambahkan",
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = res.response({
        status: "fail",
        message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
}
exports.addNoteHandler = addNoteHandler;
const getAllNotesHandler = () => ({
    status: "success",
    data: {
        notes: notes_1.notes,
    },
});
exports.getAllNotesHandler = getAllNotesHandler;
const getNoteByIdHandler = (req, res) => {
    const { id } = req.params;
    const note = notes_1.notes.filter((note) => note.id === id)[0];
    if (note != undefined) {
        const response = res.response({
            status: "success",
            data: {
                note,
            },
        });
        response.code(200);
        return response;
    }
    const response = res
        .response({
        status: "success",
        message: "Catatan tidak ditemukan",
    })
        .code(404);
    return response;
};
exports.getNoteByIdHandler = getNoteByIdHandler;
function editNoteByIdHandler(req, res) {
    let Payload = {};
    const { id } = req.params;
    if (typeof req.payload === "object") {
        Payload = req.payload;
    }
    const { title, tags, body } = Payload;
    const indexNote = notes_1.notes.findIndex((note) => note.id === id);
    const updatedAt = new Date().toISOString();
    if (indexNote !== -1) {
        notes_1.notes[indexNote] = Object.assign(Object.assign({}, notes_1.notes[indexNote]), { title,
            tags,
            body,
            updatedAt });
        const response = res
            .response({
            status: "success",
            message: "Catatan berhasil diperbaharui",
        })
            .code(200);
        return response;
    }
    const response = res
        .response({
        status: "fail",
        message: "Gagal memperbarui catatan. Id tidak ditemukan",
    })
        .code(404);
    return response;
}
exports.editNoteByIdHandler = editNoteByIdHandler;
function deleteNoteByIdHandler(req, res) {
    const { id } = req.params;
    const indexNote = notes_1.notes.findIndex((note) => note.id === id);
    if (indexNote !== -1) {
        notes_1.notes.splice(indexNote, 1);
        const response = res
            .response({
            status: "success",
            message: "Catatan berhasil dihapus",
        })
            .code(200);
        return response;
    }
    const response = res
        .response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
    })
        .code(404);
    return response;
}
exports.deleteNoteByIdHandler = deleteNoteByIdHandler;
//# sourceMappingURL=handler.js.map