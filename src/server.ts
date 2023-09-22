import Hapi from "@hapi/hapi";
import { routes } from "./routes";

async function init(): Promise<void> {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
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
