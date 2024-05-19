import { startBottleServer } from "../mod.ts";

startBottleServer().then(result => {
    console.log("Bottle Server started:", result);
}).catch(error => {
    console.error("Error starting Bottle Server:", error);
});

