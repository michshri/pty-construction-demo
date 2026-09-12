from pathlib import Path

root = Path(r'c:\Users\Michael\Desktop\Cursor\pty-construction-demo\pty-construction-demo')
replacements = {
    "\u00c3\u00a1": "á", "\u00c3\u00a9": "é", "\u00c3\u00ad": "í", "\u00c3\u00b3": "ó", "\u00c3\u00ba": "ú", "\u00c3\u00b1": "ñ", "\u00c3\u00bc": "ü",
    "\u00c3\u0081": "Á", "\u00c3\u0089": "É", "\u00c3\u008d": "Í", "\u00c3\u0093": "Ó", "\u00c3\u009a": "Ú", "\u00c3\u0091": "Ñ", "\u00c3\u009c": "Ü",
    "\u00c3\u00a0": "à", "\u00c3\u00a8": "è", "\u00c3\u00ac": "ì", "\u00c3\u00b2": "ò", "\u00c3\u00b8": "ø", "\u00c3\u00b9": "ù", "\u00c3\u00bb": "û", "\u00c3\u00bf": "ÿ",
    "\u00c3\u00a2": "â", "\u00c3\u00a4": "ä", "\u00c3\u00a5": "å", "\u00c3\u00a6": "æ", "\u00c3\u00a7": "ç", "\u00c3\u00aa": "ê", "\u00c3\u00ab": "ë", "\u00c3\u00af": "ï", "\u00c3\u00b4": "ô", "\u00c3\u00b5": "õ", "\u00c3\u00b6": "ö", "\u00c3\u00be": "þ",
    "\u00c3\u00a3": "ã", "\u00c3\u00a6": "æ", "\u00c3\u0080": "À", "\u00c3\u0082": "Â", "\u00c3\u0084": "Ä", "\u00c3\u0085": "Å", "\u00c3\u0087": "Ç", "\u00c3\u0088": "È", "\u00c3\u008a": "Ê", "\u00c3\u008b": "Ë", "\u00c3\u008c": "Ì", "\u00c3\u0092": "Î", "\u00c3\u009f": "Ï", "\u00c3\u0090": "Ð", "\u00c3\u0092": "Î", "\u00c3\u0094": "Ô", "\u00c3\u0096": "Ö", "\u00c3\u0098": "Ø", "\u00c3\u0099": "Ù", "\u00c3\u009b": "Û", "\u00c3\u009e": "Þ", "\u00c3\u009f": "ß",
    "\u00c2\u00a1": "¡", "\u00c2\u00a9": "©", "\u00c2\u00b0": "°", "\u00c2\u00b7": "·", "\u00c2\u00bf": "¿",
    "\u00e2\u20ac\u2122": "™", "\u00e2\u20ac\u2019": "’", "\u00e2\u20ac\u2018": "‘", "\u00e2\u20ac\u201c": "“", "\u00e2\u20ac\u201d": "”", "\u00e2\u20ac\u2013": "–", "\u00e2\u20ac\u2014": "—", "\u00e2\u20ac\u20ac": "€",
    "\u00c2\u00a0": " ", "\u00c2\u00a2": "¢", "\u00c2\u00a3": "£", "\u00c2\u00a5": "¥", "\u00c2\u00a6": "¦", "\u00c2\u00a7": "§", "\u00c2\u00ae": "®",
    "\u00c3\u0091": "Ñ", "\u00c3\u009a": "Ú", "\u00c3\u009c": "Ü",
    "\u00c3\u00a9\u00c2\u00a9": "é"
}

count = 0
for path in sorted(root.rglob('*.html')):
    text = path.read_text(encoding='utf-8')
    original = text
    for bad, good in replacements.items():
        text = text.replace(bad, good)
    if text != original:
        path.write_text(text, encoding='utf-8', newline='')
        count += 1
print(f'Updated {count} HTML files with mojibake replacements.')
