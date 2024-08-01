from pypdf import PdfReader 
import re

stop_words = {'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
}

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

def clean_text(text):

    equations_pattern = r"([a-zA-Z0-9]+(?:\s*[=+\-*/]\s*[a-zA-Z0-9]+)+)"
    # Pattern to remove URLs
    url_pattern = r'https?://\S+'
    # Pattern to remove multiple consecutive spaces
    spaces_pattern = r'\s+'
    
    # Remove equations
    cleaned_text = re.sub(equations_pattern, '', text)
    # Remove URLs
    cleaned_text = re.sub(url_pattern, '', cleaned_text)
    # Replace multiple spaces with a single space
    cleaned_text = re.sub(spaces_pattern, ' ', cleaned_text)

    words = cleaned_text.split()
    cleaned_text = ' '.join([word for word in words if word.lower() not in stop_words])
    
    return cleaned_text.lower()
