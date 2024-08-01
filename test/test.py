from extract_pdf import extract_text_from_pdf, clean_text
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Step 2: Preprocess the text
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text):
    tokens = nltk.word_tokenize(text)
    tokens = [word for word in tokens if word.isalpha()]
    tokens = [word.lower() for word in tokens if word not in stop_words]
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return ' '.join(tokens)

# Step 3: Convert text to Document-Term Matrix
def convert_to_dtm(text_data):
    vectorizer = CountVectorizer(max_df=1.0, min_df=1, stop_words='english')
    dtm = vectorizer.fit_transform(text_data)
    return dtm, vectorizer

# Step 4: Perform LDA Topic Modeling
def perform_lda(dtm, num_topics=5):
    lda = LatentDirichletAllocation(n_components=num_topics, random_state=42)
    lda.fit(dtm)
    return lda

# Step 5: Interpret the Results
def print_topics(model, vectorizer, num_words=10):
    words = vectorizer.get_feature_names_out()
    for topic_idx, topic in enumerate(model.components_):
        print(f"Topic #{topic_idx + 1}:")
        print(" ".join([words[i] for i in topic.argsort()[:-num_words - 1:-1]]))

# Main Function
def main(pdf_path, num_topics=5, num_words=10):
    text = extract_text_from_pdf(pdf_path)
    preprocessed_text = preprocess_text(text)
    dtm, vectorizer = convert_to_dtm([preprocessed_text])
    lda_model = perform_lda(dtm, num_topics)
    print_topics(lda_model, vectorizer, num_words)

# Example Usage
pdf_path = '/home/space/Downloads/test2.pdf'  # Replace with your PDF file path
main(pdf_path)
