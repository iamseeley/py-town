import { startHttpServer } from "../mod.ts";

startHttpServer().then(result => {
    console.log("HTTP Server started:", result);
}).catch(error => {
    console.error("Error starting HTTP Server:", error);
});

