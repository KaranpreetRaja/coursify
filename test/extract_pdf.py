from pypdf import PdfReader 

def extract_text_from_pdf(pdf_path):
    pdf = PdfReader(pdf_path)
    text = ''

    for page in pdf.pages:
        text += page.extract_text()
    return text

def extract_text_from_pdfs(pdf_paths):
    extracted_text = {}
    for pdf_path in pdf_paths:
        pdf = PdfReader(pdf_path)
        text = ''

        for page in pdf.pages:
            text += page.extract_text()
        extracted_text[pdf_path] = text
    return extracted_text