"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const handler_1 = require("./handler");
exports.routes = [
    {
        method: "POST",
        path: "/notes",
        handler: handler_1.addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler: handler_1.getAllNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: handler_1.getNoteByIdHandler,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: handler_1.editNoteByIdHandler,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: handler_1.deleteNoteByIdHandler,
    },
];
//# sourceMappingURL=routes.js.map