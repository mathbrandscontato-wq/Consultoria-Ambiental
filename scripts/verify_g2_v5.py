#!/usr/bin/env python3
"""Inventário somente leitura do pacote G2 V5.

A integridade de um ZIP não prova aprovação criativa, direitos autorais,
nem vínculo com a implementação. A aprovação exige documentação adicional.
"""
import argparse
import datetime as dt
import hashlib
import json
import pathlib
import sys
import zipfile

p = argparse.ArgumentParser()
p.add_argument("--zip", required=True, type=pathlib.Path)
p.add_argument("--output", type=pathlib.Path, default=pathlib.Path("G2_V5_VERIFICATION.json"))
a = p.parse_args()
record = {
    "package": a.zip.name,
    "status": "NOT_VERIFIED",
    "checked_at_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
    "approved_by": None,
    "approved_version": None,
}
if not a.zip.is_file():
    record["reason"] = "ZIP file absent"
    a.output.parent.mkdir(parents=True, exist_ok=True)
    a.output.write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
    print("NO-GO: original G2 V5 ZIP not found", file=sys.stderr)
    sys.exit(2)
record["sha256"] = hashlib.sha256(a.zip.read_bytes()).hexdigest()
try:
    with zipfile.ZipFile(a.zip) as z:
        files = [i for i in z.infolist() if not i.is_dir()]
        unsafe = [
            i.filename for i in files
            if i.filename.startswith(("/", "\\")) or ".." in pathlib.PurePosixPath(i.filename.replace("\\", "/")).parts
        ]
        corrupt = z.testzip()
        record["file_count"] = len(files)
        record["file_paths"] = [i.filename for i in files]
        record["files"] = [
            {"path": i.filename, "size": i.file_size, "sha256": hashlib.sha256(z.read(i)).hexdigest()}
            for i in files if i.filename not in unsafe
        ] if not corrupt else []
        required = ["INDEX_G2_V5.html", "RELATORIO_G2_V5.md"]
        record["expected_indicators"] = {
            name: any(f.filename.endswith(name) for f in files) for name in required
        }
        record["contains_visuals"] = sum(
            f.filename.lower().endswith((".png", ".jpg", ".jpeg", ".svg", ".webp"))
            for f in files
        )
        record["unsafe_paths"] = unsafe
        record["corrupt_file"] = corrupt
        if corrupt or unsafe:
            record["reason"] = "Corrupted or unsafe ZIP entries"
        elif not all(record["expected_indicators"].values()):
            record["reason"] = "Missing named G2 V5 indicators; inspect actual package"
        elif record["contains_visuals"] < 10:
            record["reason"] = "Insufficient visual references; investigate"
        else:
            record["status"] = "INVENTORIED_ONLY"
            record["reason"] = (
                "Technical integrity passed; approval hash, design decisions, "
                "asset rights and implementation mapping still need verification"
            )
except Exception as e:
    record["reason"] = f"Unreadable ZIP: {type(e).__name__}: {e}"
a.output.parent.mkdir(parents=True, exist_ok=True)
a.output.write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
print(record["status"], record["reason"])
sys.exit(0 if record["status"] == "INVENTORIED_ONLY" else 2)
