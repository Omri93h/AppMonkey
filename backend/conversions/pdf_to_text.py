from pdfminer.high_level import extract_text

def convert_pdf_to_text(input_path: str, output_path: str) -> None:
    """
    Extract plain text from PDF at input_path → write to output_path
    """
    text = extract_text(input_path)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
