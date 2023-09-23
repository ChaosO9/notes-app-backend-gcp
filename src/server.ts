import Hapi from "@hapi/hapi";
import { routes } from "./routes";

async function init(): Promise<void> {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server di mulai pada ${server.info.uri}`);
}

init().catch((err) => {
    console.error(`Failed to start the server: ${err}`);
});
