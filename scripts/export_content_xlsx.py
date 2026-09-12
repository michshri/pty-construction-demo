import json
import os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

root = r"c:\Users\Michael\Desktop\Cursor\pty-construction-demo\pty-construction-demo"
output_file = os.path.join(root, "Vanguardia_reusable_content.xlsx")

files = [
    ("Home Page", os.path.join(root, "content", "pages", "home.json")),
    ("Services", os.path.join(root, "content", "tiles", "services.json")),
    ("Segments", os.path.join(root, "content", "tiles", "segments.json")),
    ("Why Vanguardia", os.path.join(root, "content", "reusable", "why-vanguardia.json")),
    ("Process", os.path.join(root, "content", "reusable", "process.json")),
    ("Projects", os.path.join(root, "content", "projects", "projects.json")),
    ("Site Settings", os.path.join(root, "content", "settings", "site-settings.json")),
    ("EN Locale", os.path.join(root, "locales", "en", "common.json")),
]


def flatten_object(prefix, value, rows):
    if isinstance(value, dict):
        if all(isinstance(v, (str, int, float, bool)) or v is None for v in value.values()):
            rows.append({"key": prefix, "en": value.get("en"), "es": value.get("es"), "fr": value.get("fr"), "raw": json.dumps(value, ensure_ascii=False)})
            return
        for key, child in value.items():
            child_prefix = f"{prefix}.{key}" if prefix else key
            flatten_object(child_prefix, child, rows)
    elif isinstance(value, list):
        for idx, item in enumerate(value):
            flatten_object(f"{prefix}[{idx}]", item, rows)
    else:
        rows.append({"key": prefix, "en": value, "es": "", "fr": "", "raw": ""})


def add_sheet(wb, title, data):
    ws = wb.create_sheet(title=title[:31])
    ws.freeze_panes = "A2"
    headers = ["Key", "Type", "EN", "ES", "FR", "Notes"]
    ws.append(headers)
    header_fill = PatternFill("solid", fgColor="D9EAF7")
    for cell in ws[1]:
        cell.font = Font(bold=True, color="1F1F1F")
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="center", vertical="center")

    for item in data:
        row = [
            item.get("key", ""),
            item.get("type", ""),
            item.get("en", ""),
            item.get("es", ""),
            item.get("fr", ""),
            item.get("notes", ""),
        ]
        ws.append(row)

    for column_cells in ws.columns:
        max_length = 0
        column = column_cells[0].column_letter
        for cell in column_cells:
            if cell.value is not None:
                max_length = max(max_length, len(str(cell.value)))
        ws.column_dimensions[column].width = min(max(12, max_length + 2), 60)

    for row in ws.iter_rows():
        for cell in row:
            cell.alignment = Alignment(vertical="top", wrap_text=True)


def is_text_key(key):
    key_text = (key or "").lower()
    text_tokens = [
        "title", "heading", "headline", "subtitle", "text", "body", "copy",
        "description", "label", "cta", "button", "intro", "summary", "blurb",
        "tag", "eyebrow", "meta", "name", "message", "paragraph", "lead"
    ]
    return any(token in key_text for token in text_tokens)


def flatten_for_editor(section_name, prefix, value, rows):
    if isinstance(value, dict):
        if any(key in value for key in ["en", "es", "fr"]):
            rows.append({
                "section": section_name,
                "key": prefix,
                "en": value.get("en", ""),
                "es": value.get("es", ""),
                "fr": value.get("fr", ""),
            })
            return
        for key, child in value.items():
            child_prefix = f"{prefix}.{key}" if prefix else key
            flatten_for_editor(section_name, child_prefix, child, rows)
    elif isinstance(value, list):
        for idx, item in enumerate(value):
            child_prefix = f"{prefix}[{idx}]" if prefix else f"[{idx}]"
            flatten_for_editor(section_name, child_prefix, item, rows)
    else:
        if prefix and is_text_key(prefix):
            rows.append({
                "section": section_name,
                "key": prefix,
                "en": value,
                "es": "",
                "fr": "",
            })


def add_editor_sheet(wb, title, section_rows):
    ws = wb.create_sheet(title=title[:31])
    ws.freeze_panes = "A2"
    headers = ["Section", "Key", "EN", "ES", "FR", "Notes"]
    ws.append(headers)

    header_fill = PatternFill("solid", fgColor="E8F1FF")
    for cell in ws[1]:
        cell.font = Font(bold=True, color="1F1F1F")
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="center", vertical="center")

    for item in section_rows:
        ws.append([
            item.get("section", ""),
            item.get("key", ""),
            item.get("en", ""),
            item.get("es", ""),
            item.get("fr", ""),
            item.get("notes", ""),
        ])

    for column_cells in ws.columns:
        max_length = 0
        column = column_cells[0].column_letter
        for cell in column_cells:
            if cell.value is not None:
                max_length = max(max_length, len(str(cell.value)))
        ws.column_dimensions[column].width = min(max(14, max_length + 2), 80)

    for row in ws.iter_rows():
        for cell in row:
            cell.alignment = Alignment(vertical="top", wrap_text=True)


def normalize_data_from_json(json_path):
    with open(json_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    rows = []
    flattened = []
    flatten_object("root", data, flattened)

    for entry in flattened:
        key = entry["key"].replace("root.", "")
        if key.startswith("root"):
            key = key.replace("root", "", 1).lstrip(".")
        if key.startswith("["):
            key = key[1:]

        if key and not key.startswith("root"):
            key = key.replace("[0]", "")
            key = key.replace(".", " / ")
        else:
            key = key or "root"

        value = json.loads(entry.get("raw", "{}")) if entry.get("raw") else {}
        if isinstance(value, dict):
            en = value.get("en", "")
            es = value.get("es", "")
            fr = value.get("fr", "")
            notes = ""
            row_type = "locale_object"
        else:
            en = entry.get("en", "")
            es = entry.get("es", "")
            fr = entry.get("fr", "")
            notes = ""
            row_type = "value"

        rows.append({
            "key": key,
            "type": row_type,
            "en": en,
            "es": es,
            "fr": fr,
            "notes": notes,
        })

    return rows


wb = Workbook()
ws = wb.active
ws.title = "Instructions"
ws.append(["Vanguardia Reusable Content Review"])
ws.append([])
ws.append(["Instructions:"])
ws.append(["1. Review and edit the values in each sheet."])
ws.append(["2. Keep the structure for EN / ES / FR translations as needed."])
ws.append(["3. After editing, use this workbook as the source to update the JSON content."])
ws.append([])
ws.append(["Generated from:"])
for _, path in files:
    ws.append([path])

for cell in ws[1]:
    cell.font = Font(bold=True, size=14)
for row in ws.iter_rows(min_row=3):
    for cell in row:
        cell.alignment = Alignment(vertical="top", wrap_text=True)

editor_rows = []
for sheet_name, path in files:
    try:
        data = normalize_data_from_json(path)
        add_sheet(wb, sheet_name, data)

        with open(path, "r", encoding="utf-8") as file:
            source_data = json.load(file)
        flatten_for_editor(sheet_name, "", source_data, editor_rows)
    except Exception as exc:
        data = [{"key": "ERROR", "type": "error", "en": str(exc), "es": "", "fr": "", "notes": ""}]
        add_sheet(wb, sheet_name, data)

add_editor_sheet(wb, "Editor Copy", editor_rows)

# Move Instructions to front
instructions = wb["Instructions"]
wb._sheets.remove(instructions)
wb._sheets.insert(0, instructions)

# Keep the editor sheet near the front as well
editor_sheet = wb["Editor Copy"]
wb._sheets.remove(editor_sheet)
wb._sheets.insert(1, editor_sheet)

wb.save(output_file)
print(f"Created workbook: {output_file}")
