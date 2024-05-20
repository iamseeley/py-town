import { initializePyodide } from "./pyodide_setup.ts";
import { executePython } from "./python_executor.ts";

declare global {
  interface Window {
    Worker: typeof Worker;
  }
}

export async function runPythonCode(code: string) {
  const pyodide = await initializePyodide();
  return await executePython(pyodide, code);
}

export async function runPythonCodeInWorker(code: string) {
  const worker = new Worker(new URL("./pyodide-worker.ts", import.meta.url), { type: "module" });

  return new Promise<string>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent) => {
      resolve(event.data);
      worker.terminate();
    };

    worker.onerror = (error: ErrorEvent) => {
      reject(error.message);
      worker.terminate();
    };

    worker.postMessage(code);
  });
}

