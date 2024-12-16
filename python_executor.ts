interface Pyodide {
  loadPackage: (pkg: string) => Promise<void>;
  pyimport: (name: string) => any;
  runPythonAsync: (code: string) => Promise<any>;
}

async function installPackages(pyodide: Pyodide, code: string) {
  const importStatements = code.match(/import (\w+)|from (\w+)/g);
  const packages = new Set<string>();

  if (importStatements) {
    importStatements.forEach((statement: string) => {
      const match = statement.match(/import (\w+)|from (\w+)/);
      if (match) {
        const pkg = match[1] || match[2];
        packages.add(pkg);
      }
    });
  }

  if (packages.size === 0) {
    return;
  }

  const micropipPackages: string[] = [];
  for (const pkg of packages) {
    try {
      await pyodide.loadPackage(pkg);
    } catch (error) {
      micropipPackages.push(pkg);
    }
  }

  if (micropipPackages.length > 0) {
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install(micropipPackages);
  }
}

export async function executePython(pyodide: Pyodide, code: string) {
  await installPackages(pyodide, code);
  return await pyodide.runPythonAsync(code);
}
