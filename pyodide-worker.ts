import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";

self.onmessage = async (event) => {
  const pyodide = await initializePyodide();
  const code = event.data;
  try {
    const result = await executePython(pyodide, code);
    self.postMessage(result);
  } catch (error) {
    self.postMessage(`Error: ${error.message}`);
  }
};


