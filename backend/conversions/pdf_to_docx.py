from pdf2docx import Converter

def convert_pdf_to_docx(input_path: str, output_path: str) -> None:
    """
    Convert a PDF file at input_path to DOCX at output_path.
    """
    cv = Converter(input_path)
    cv.convert(output_path)
    cv.close()
