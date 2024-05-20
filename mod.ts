import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";


export async function runPythonCode(code: string) {
    const pyodide = await initializePyodide();
    return await executePython(pyodide, code);
}


export async function runPythonCodeInWorker(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./pyodide-worker.ts', import.meta.url).href, { type: 'module' });

    worker.onmessage = (event) => {
      const { result, error } = event.data;
      worker.terminate();
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    };

    worker.postMessage({ code });
  });
}

