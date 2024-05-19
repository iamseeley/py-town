import { startFastAPIServer } from "../mod.ts";

startFastAPIServer().then(result => {
    console.log("FastAPI Server started:", result);
}).catch(error => {
    console.error("Error starting FastAPI Server:", error);
});

