from extract_pdf import extract_text_from_pdf, extract_text_from_pdfs


text = extract_text_from_pdf("/home/space/Downloads/test.pdf")
print(text[0:1000])