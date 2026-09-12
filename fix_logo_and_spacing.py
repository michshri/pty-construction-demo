from pathlib import Path
import shutil

root = Path(r'c:\Users\Michael\Desktop\Cursor\pty-construction-demo\pty-construction-demo')
source = root / 'Vanguardia Logo.png'
dest = root / 'vanguardia-logo.png'
if source.exists() and not dest.exists():
    shutil.copy2(source, dest)

count = 0
for path in sorted(root.rglob('*.html')):
    text = path.read_text(encoding='utf-8')
    updated = text
    replacements = [
        ('src="Vanguardia Logo.png"', 'src="vanguardia-logo.png"'),
        ('src="../Vanguardia Logo.png"', 'src="../vanguardia-logo.png"'),
        ('src="Vanguardia%20Logo.png"', 'src="vanguardia-logo.png"'),
        ('src="../Vanguardia%20Logo.png"', 'src="../vanguardia-logo.png"'),
    ]
    for old, new in replacements:
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding='utf-8', newline='')
        count += 1

print(f'Updated logo refs in {count} HTML files')
print(f'Logo file exists: {dest.exists()}')
