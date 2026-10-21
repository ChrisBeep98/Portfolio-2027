// Uso: node elshots.mjs <w> <h> <selector> <prefijo> [offsetPx] [dark]
// Captura cada elemento que coincide (scroll a su top - offset). Reporta errores de consola.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs"; import { tmpdir } from "node:os"; import { join } from "node:path";
const [w, h, sel, prefix, offset = "60", dark = ""] = process.argv.slice(2);
const port = 9300 + Math.floor(Math.random() * 90);
const c = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 50 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); } catch {} if (!t) await sleep(200); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const P = new Map(); const logs = [];
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m.result); P.delete(m.id); } if (m.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(m.params.type)) logs.push(m.params.type + ": " + m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 200)); if (m.method === "Runtime.exceptionThrown") logs.push("exception: " + m.params.exceptionDetails.text); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 768 });
await send("Page.navigate", { url: (process.env.QA_URL || "http://localhost:3000/") }); await sleep(9000);
if (dark) await ev("document.documentElement.classList.add('dark')");
const n = await ev(`document.querySelectorAll("${sel}").length`);
for (let i = 0; i < n; i++) {
  await ev(`(() => { const e = document.querySelectorAll("${sel}")[${i}]; window.__lenis.scrollTo(e.getBoundingClientRect().top + scrollY - ${offset}, { immediate: true }); })()`);
  await sleep(2500);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${prefix}-${i}.png`, Buffer.from(shot.data, "base64"));
}
console.log("count", n, "docH", await ev("document.documentElement.scrollHeight"), "overflowX", await ev("document.documentElement.scrollWidth > innerWidth"));
console.log(logs.join("\n")); ws.close(); c.kill(); process.exit(0);
