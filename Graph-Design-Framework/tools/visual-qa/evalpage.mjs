// Uso: node evalpage.mjs <w> <h> <exprFile> — evalúa (async) el contenido de exprFile en la página indicada y lo imprime.
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs"; import { tmpdir } from "node:os"; import { join } from "node:path";
const [w, h, file] = process.argv.slice(2);
const port = 9400 + Math.floor(Math.random() * 90);
const c = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 50 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); } catch {} if (!t) await sleep(200); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const P = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m.result ?? { err: m.error }); P.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 768 });
await send("Page.navigate", { url: (process.env.QA_URL || "http://localhost:3000/") }); await sleep(9000);
const r = await send("Runtime.evaluate", { expression: `(async () => { ${readFileSync(file, "utf8")} })()`, awaitPromise: true, returnByValue: true });
console.log(JSON.stringify(r).slice(0,3000)); ws.close(); c.kill(); process.exit(0);
