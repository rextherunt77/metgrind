#!/usr/bin/env python3
"""Fold a CHANGELOG.md: keep the 3 newest "## " sections open, put the rest in <details> (GitHub shows it collapsed).
Safe to run again: an existing fold is removed first."""
import re, sys
p = sys.argv[1]; keep = int(sys.argv[2]) if len(sys.argv) > 2 else 3
t = open(p, encoding="utf-8").read()
t = re.sub(r"\n*<details><summary>[^<]*</summary>\n*", "\n\n", t)
t = re.sub(r"\n*</details>\n*", "\n", t)
parts = re.split(r"(?m)^(?=## )", t)
head, secs = parts[0], parts[1:]
secs = [s.rstrip() + "\n" for s in secs]
out = head.rstrip() + "\n\n" + "\n".join(secs[:keep])
if len(secs) > keep:
    out += "\n<details><summary>Older versions (" + str(len(secs) - keep) + ")</summary>\n\n" + "\n".join(secs[keep:]) + "\n</details>\n"
open(p, "w", encoding="utf-8").write(out)
print(p, len(secs), "sections,", max(0, len(secs) - keep), "folded")
