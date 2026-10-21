// Uso: node pinshots.mjs <w> <h> <selectorDentroDelPin> <prefijo> <frac1> <frac2> ...
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs"; import { tmpdir } from "node:os"; import { join } from "node:path";
const [w, h, sel, prefix, ...fracs] = process.argv.slice(2);
const port = 9100 + Math.floor(Math.random() * 90);
const c = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 50 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); } catch {} if (!t) await sleep(200); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const P = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m.result); P.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 768 });
await send("Page.navigate", { url: (process.env.QA_URL || "http://localhost:3000/") }); await sleep(9000);
const box = JSON.parse(await ev(`JSON.stringify((() => { const e = document.querySelector("${sel}"); const s = e.closest(".pin-spacer") || e; return { top: s.getBoundingClientRect().top + scrollY, len: Math.max(0, s.offsetHeight - innerHeight) }; })())`));
for (const f of fracs) {
  await ev(`window.__lenis.scrollTo(${box.top + +f * box.len}, { immediate: true })`); await sleep(2500);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${prefix}-${f}.png`, Buffer.from(shot.data, "base64"));
}
console.log(JSON.stringify(box)); ws.close(); c.kill(); process.exit(0);
