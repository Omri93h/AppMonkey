import subprocess
from pathlib import Path
import shutil

def convert_docx_to_pdf(input_path: str, output_path: str) -> None:
    print("=== convert_docx_to_pdf START ===")
    print("Input path:", input_path)
    print("Desired output path:", output_path)

    # find LibreOffice binary
    lib = shutil.which('libreoffice') or shutil.which('soffice')
    print("LibreOffice binary:", lib)
    if not lib:
        raise RuntimeError('No LibreOffice binary found')

    outdir = Path(input_path).parent
    cmd = [
        lib,
        '--headless',
        '--convert-to', 'pdf:writer_pdf_Export',
        str(input_path),
        '--outdir', str(outdir)
    ]
    print("Running command:", " ".join(cmd))
    proc = subprocess.run(cmd, capture_output=True, text=True)
    print("Return code:", proc.returncode)
    print("stdout:\n", proc.stdout)
    print("stderr:\n", proc.stderr)

    generated = outdir / (Path(input_path).stem + '.pdf')
    print("Expected generated file:", generated)
    if not generated.exists():
        raise RuntimeError(f"Generated PDF not found at {generated}")

    # rename if needed
    if str(generated) != output_path:
        print(f"Renaming {generated} -> {output_path}")
        Path(generated).rename(output_path)
    else:
        print("No rename needed")

    print("=== convert_docx_to_pdf END ===")
