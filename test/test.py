from extract_pdf import extract_text_from_pdf, clean_text



pdf_path = '/home/space/Downloads/test.pdf'  
text = extract_text_from_pdf(pdf_path)
print(text[4000:8000])