#!/usr/bin/env python3
"""Gera sw.js com a lista de arquivos do site. Rode de novo sempre que adicionar arquivos."""
import os, hashlib, json
root = os.path.dirname(os.path.abspath(__file__))
core, media = [], []
for d, _, fs in os.walk(root):
    for f in fs:
        p = os.path.relpath(os.path.join(d, f), root).replace(os.sep, "/")
        if p.startswith(".") or p.endswith(".md") or p in ("sw.js", "sw.template.js", "build-sw.py") or "/." in p: continue
        (media if p.startswith("media/audio/") else core).append("./" + p)
core.sort(); media.sort()
h = hashlib.sha1()
for p in core + media: h.update(open(os.path.join(root, p[2:]), "rb").read())
ver = h.hexdigest()[:10]
tpl = open(os.path.join(root, "sw.template.js"), encoding="utf-8").read()
out = tpl.replace("__VERSION__", ver).replace("__CORE__", json.dumps(["./"] + core, indent=1)).replace("__MEDIA__", json.dumps(media, indent=1))
open(os.path.join(root, "sw.js"), "w", encoding="utf-8").write(out)
print("sw.js", ver, len(core), "core", len(media), "audio")
