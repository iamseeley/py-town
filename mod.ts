import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";




export async function runPythonCode(code: string) {
    const pyodide = await initializePyodide();
    return await executePython(pyodide, code);
}

