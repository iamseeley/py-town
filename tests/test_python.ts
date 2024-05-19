import { runPythonCode } from "../mod.ts";

const code = `
def greet(name):
    return f"Hello, {name}!"

greet("Thomas")
`;

runPythonCode(code).then(result => {
    console.log("Python Code Result:", result);
});

