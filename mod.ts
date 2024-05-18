import { serve } from "https://deno.land/std/http/server.ts";
import { run } from "https://deno.land/x/fastapi@v0.1.0/mod.ts";
import app from "./main.py";

const handler = run(app);

serve(handler, { port: 8000 });
