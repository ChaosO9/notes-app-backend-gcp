"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = require("./routes");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = hapi_1.default.server({
            port: 5000,
            host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
            routes: {
                cors: {
                    origin: ["*"],
                },
            },
        });
        server.route(routes_1.routes);
        yield server.start();
        console.log(`Server di mulai pada ${server.info.uri}`);
    });
}
init().catch((err) => {
    console.error(`Failed to start the server: ${err}`);
});
//# sourceMappingURL=server.js.map