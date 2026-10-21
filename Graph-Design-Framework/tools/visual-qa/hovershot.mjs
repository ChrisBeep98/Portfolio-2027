// Uso: QA_CELL=".jr-cell" QA_TAP=".jr-list button" QA_GRID=".jr-grid" node hovershot.mjs <w> <h> <out.png> — desktop (>=1024): hover sobre la 3ª celda; móvil: click en el 2º botón.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs"; import { tmpdir } from "node:os"; import { join } from "node:path";
const [w, h, out] = process.argv.slice(2);
const port = 9600 + Math.floor(Math.random() * 90);
const c = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 50 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); } catch {} if (!t) await sleep(200); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const P = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m.result); P.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 768 });
await send("Page.navigate", { url: (process.env.QA_URL || "http://localhost:3000/") }); await sleep(9000);
await ev(`(() => { const g = document.querySelector("${process.env.QA_GRID || ".jr-grid"}"); window.__lenis.scrollTo(g.getBoundingClientRect().top + scrollY - 100, { immediate: true }); })()`);
await sleep(2500);
if (+w >= 1024) {
  const r = JSON.parse(await ev(`JSON.stringify(document.querySelectorAll("${process.env.QA_CELL || ".jr-cell"}")[2].getBoundingClientRect())`));
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: r.x + r.width / 2, y: r.y + r.height / 2 });
} else {
  await ev(`document.querySelectorAll("${process.env.QA_TAP || ".jr-list button"}")[1].click()`);
}
await sleep(1200);
const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(shot.data, "base64"));
ws.close(); c.kill(); process.exit(0);
