import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";

let pyodide;

async function loadPyodideAndPackages() {
  pyodide = await initializePyodide();
}

loadPyodideAndPackages();

self.onmessage = async (event) => {
  const { code } = event.data;
  try {
    const result = await executePython(pyodide, code);
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};

