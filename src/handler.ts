import { Request, ResponseToolkit } from "@hapi/hapi";
import { nanoid } from "nanoid";
import { notes } from "./notes";

interface Payload {
    title: string;
    tags: string;
    body: string;
}

export function addNoteHandler(req: Request, res: ResponseToolkit) {
    let payload: Payload | string | object = "";

    if (typeof req.payload === "string") {
        try {
            payload = JSON.parse(req.payload);
        } catch (error) {
            return;
        }
    } else if (typeof req.payload === "object") {
        payload = req.payload;
    }

    const { title, tags, body } = payload as Payload;

    const id: string = nanoid(16);
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

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

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

export const getAllNotesHandler = () => ({
    status: "success",
    data: {
        notes,
    },
});

export const getNoteByIdHandler = (req: Request, res: ResponseToolkit) => {
    const { id } = req.params;

    const note = notes.filter((note) => note.id === id)[0];

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
            status: "fail",
            message: "Catatan tidak ditemukan",
        })
        .code(404);
    return response;
};

export function editNoteByIdHandler(req: Request, res: ResponseToolkit) {
    let Payload = {};
    const { id } = req.params;

    if (typeof req.payload === "object") {
        Payload = req.payload;
    }

    const { title, tags, body } = Payload as Payload;
    const indexNote = notes.findIndex((note) => note.id === id);

    const updatedAt = new Date().toISOString();

    if (indexNote !== -1) {
        notes[indexNote] = {
            ...notes[indexNote],
            title,
            tags,
            body,
            updatedAt,
        };

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

export function deleteNoteByIdHandler(req: Request, res: ResponseToolkit) {
    const { id } = req.params;

    const indexNote = notes.findIndex((note) => note.id === id);

    if (indexNote !== -1) {
        notes.splice(indexNote, 1);
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

export function homeNote(req: Request, res: ResponseToolkit) {
    return res
        .response({
            status: "success",
            message: "It is home, nothing to see",
        })
        .code(200);
}
