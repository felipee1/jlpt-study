/* Service worker — gerado por build-sw.py (não edite sw.js à mão; edite sw.template.js).
   Funciona offline: arquivos do site em cache na instalação; áudios baixados em segundo plano. */
const VERSION = "__VERSION__";
const CORE = __CORE__;
const MEDIA = __MEDIA__;
const C_CORE = "n5-core-" + VERSION;
const C_MEDIA = "n5-media-v1";
const C_FONTS = "n5-fonts-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(C_CORE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith("n5-core-") && k !== C_CORE).map((k) => caches.delete(k)));
    await self.clients.claim();
    // baixa os áudios em segundo plano para o listening funcionar offline
    const mc = await caches.open(C_MEDIA);
    for (const url of MEDIA) { try { if (!(await mc.match(url))) await mc.add(url); } catch (err) {} }
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // fontes do Google: cache, depois rede
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(C_FONTS).then(async (c) => (await c.match(req)) || fetch(req).then((r) => { c.put(req, r.clone()); return r; }).catch(() => Response.error())));
    return;
  }
  if (url.origin !== location.origin) return;
  // áudio: cache primeiro (suporta Range para o player)
  if (url.pathname.includes("/media/audio/")) {
    e.respondWith((async () => {
      const mc = await caches.open(C_MEDIA);
      let res = await mc.match(url.pathname.replace(/^.*\/media\//, "./media/")) || await mc.match(req, { ignoreSearch: true });
      if (!res) { try { res = await fetch(url.href); if (res.ok) mc.put(req, res.clone()); } catch (err) { return Response.error(); } }
      const range = req.headers.get("range");
      if (!range || !res.ok) return res;
      const buf = await res.clone().arrayBuffer();
      const m = /bytes=(\d*)-(\d*)/.exec(range); const start = +m[1] || 0; const end = m[2] ? +m[2] : buf.byteLength - 1;
      return new Response(buf.slice(start, end + 1), { status: 206, headers: { "Content-Type": "audio/mpeg", "Content-Range": `bytes ${start}-${end}/${buf.byteLength}`, "Content-Length": String(end - start + 1), "Accept-Ranges": "bytes" } });
    })());
    return;
  }
  // demais arquivos: cache primeiro, atualiza em segundo plano (stale-while-revalidate)
  e.respondWith((async () => {
    const c = await caches.open(C_CORE);
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const r = await net;
    if (r) return r;
    if (req.mode === "navigate") return (await c.match("./index.html")) || Response.error();
    return Response.error();
  })());
});
