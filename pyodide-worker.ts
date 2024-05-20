import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";

let pyodide: any;

self.onmessage = async (event) => {
    const { code } = event.data;

    if (!pyodide) {
        pyodide = await initializePyodide();
    }

    try {
        const result = await executePython(pyodide, code);
        self.postMessage({ result });
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};

