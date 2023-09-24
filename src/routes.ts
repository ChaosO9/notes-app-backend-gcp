import { ServerRoute } from "@hapi/hapi";
import {
    addNoteHandler,
    deleteNoteByIdHandler,
    editNoteByIdHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    homeNote,
} from "./handler";

export const routes: ServerRoute[] = [
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteByIdHandler,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNoteByIdHandler,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteByIdHandler,
    },
    {
        method: "GET",
        path: "/",
        handler: homeNote,
    },
];
