// Uso: node slidershots.mjs <prefijo> [selectorDelBloqueSlider] — móvil 390: lleva el slider al viewport y captura slide a slide. El track es el hijo con snap-x.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs"; import { tmpdir } from "node:os"; import { join } from "node:path";
const [prefix, slider = ".md-slider"] = process.argv.slice(2);
const port = 9500 + Math.floor(Math.random() * 90);
const c = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, "--window-size=390,844", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 50 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); } catch {} if (!t) await sleep(200); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const P = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && P.has(m.id)) { P.get(m.id)(m.result); P.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true })).result?.value;
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.navigate", { url: (process.env.QA_URL || "http://localhost:3000/") }); await sleep(9000);
await ev(`(() => { const s = document.querySelector("${slider}"); window.__lenis.scrollTo(s.getBoundingClientRect().top + scrollY - 40, { immediate: true }); })()`);
await sleep(2500);
for (let i = 0; i < 3; i++) {
  await ev(`(() => { const s = document.querySelector("${slider}").querySelector("[class*=snap-x]"); const f = s.firstElementChild; s.scrollTo({ left: ${i} * (f.offsetWidth + parseFloat(getComputedStyle(s).columnGap)), behavior: "instant" }); })()`);
  await sleep(1200);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${prefix}-${i}.png`, Buffer.from(shot.data, "base64"));
}
console.log(await ev(`JSON.stringify({ overflowX: document.documentElement.scrollWidth > innerWidth, docH: document.documentElement.scrollHeight })`));
ws.close(); c.kill(); process.exit(0);
