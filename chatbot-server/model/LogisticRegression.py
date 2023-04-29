import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

import nltk
import re
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import matplotlib.pyplot as plt
import pickle
import numpy as np

# Descargar los datos de NLTK necesarios
nltk.download('punkt')
nltk.download('stopwords')

# Función de preprocesamiento
def preprocess(text):
    # Convertir el texto a minúsculas
    text = text.lower()
    
    # Eliminar caracteres especiales y números
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    
    # Tokenizar el texto
    tokens = nltk.word_tokenize(text)
    
    # Eliminar las palabras vacías (stopwords)
    stop_words = set(stopwords.words('spanish'))
    tokens = [word for word in tokens if word not in stop_words]
    
    # Aplicar la derivación (stemming)
    stemmer = SnowballStemmer('spanish')
    tokens = [stemmer.stem(word) for word in tokens]
    
    # Unir los tokens para obtener el texto preprocesado
    preprocessed_text = ' '.join(tokens)
    
    return preprocessed_text

# Función para cargar el modelo y el vectorizador desde archivos

import pickle

def load_model_and_vectorizer():
    with open("C:/Users/diego/Desktop/VSCODE/ChatBot/chatbot-server/model/LogisticRegression_model.pkl", "rb") as model_file:
        nb_classifier = pickle.load(model_file)

    with open("C:/Users/diego/Desktop/VSCODE/ChatBot/chatbot-server/model/LogisticRegressionvectorizer.pkl", "rb") as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)

    return nb_classifier, vectorizer


# Cargar el modelo y el vectorizador

def predict_intent_with_scores(text, nb_classifier, vectorizer):
    text_preprocessed = preprocess(text)
    vector = vectorizer.transform([text_preprocessed])
    intent = nb_classifier.predict(vector)
    
    probabilities = nb_classifier.predict_proba(vector)
    max_prob_index = np.argmax(probabilities[0])
    
    max_prob_percentage = round(probabilities[0][max_prob_index] * 100, 2)
    
    return intent[0], max_prob_percentage

# Hacer una predicción y obtener el acurracy

def predict (prompt):

    nb_classifier_loaded, vectorizer_loaded = load_model_and_vectorizer()
    predicted_intent, prediction_scores = predict_intent_with_scores(prompt, nb_classifier_loaded, vectorizer_loaded)   
    return predicted_intent , prediction_scores

