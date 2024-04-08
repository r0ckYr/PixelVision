# -*- mode: python ; coding: utf-8 -*-
import crispy_bootstrap5

# Find the location of the crispy_bootstrap5 package
package_path = crispy_bootstrap5.__path__[0]


a = Analysis(
    ['pixelvision/manage.py'],
    pathex=[],
    binaries=[],
    datas=[('pixelvision/main', 'main'),
            (os.path.join('pixelvision', 'media'), 'media'),
            ('pixelvision/image_classification.py', 'image_classification'),
            (package_path, 'crispy_bootstrap5')
            ],
    hiddenimports=['main.apps', 'main.urls', 'crispy_bootstrap5'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='manage',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='manage',
)
