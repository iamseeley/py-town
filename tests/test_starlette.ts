import { startStarletteServer } from "../mod.ts";

startStarletteServer().then(result => {
    console.log("Starlette Server started:", result);
}).catch(error => {
    console.error("Error starting Starlette Server:", error);
});

