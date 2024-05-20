import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";

let pyodide: any = null;

self.onmessage = async (event) => {
    const { code } = event.data;

    if (!pyodide) {
        try {
            pyodide = await initializePyodide();
        } catch (error) {
            self.postMessage({ error: `Initialization error: ${error.message}` });
            return;
        }
    }

    try {
        const result = await executePython(pyodide, code);
        self.postMessage({ result });
    } catch (error) {
        self.postMessage({ error: `Execution error: ${error.message}` });
    }
};

