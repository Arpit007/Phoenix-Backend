import pandas as pd


import re
import nltk
from config import *
from nltk.corpus import stopwords
import pickle
from nltk.stem.porter import PorterStemmer
import os

classifier_pkl = 'classifier.pkl'
vec_pkl = 'vec.pkl'

if not os.path.isfile(classifier_pkl) or not os.path.isfile(vec_pkl):
    dataset = pd.read_csv('data1.tsv', delimiter='\t', quoting=3)
    corpus = []
    for i in range(0, len(dataset)):
        review = re.sub('[^a-zA-Z]', ' ', dataset['Review'][i])
        review = review.lower()
        review = review.split()
        ps = PorterStemmer()
        review = [ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
        review = ' '.join(review)
        corpus.append(review)

    from sklearn.feature_extraction.text import CountVectorizer

    cv = CountVectorizer(max_features=1500)
    cv.fit(corpus)
    X = cv.transform(corpus).toarray()
    y = dataset.iloc[:, 1].values

    from sklearn.cross_validation import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.10, random_state=0)

    from sklearn.metrics import confusion_matrix
    from sklearn.linear_model import LogisticRegression

    classifier = LogisticRegression(random_state=120)
    classifier.fit(X_train, y_train)
    y_pred = classifier.predict(X_test)
    cm = confusion_matrix(y_test, y_pred)
    Accuracy = (cm[0, 0] + cm[1, 1]) / sum(sum(cm))
    Precision = cm[1, 1] / (cm[0, 1] + cm[1, 1])
    Recall = cm[0, 0] / (cm[0, 0] + cm[1, 0])
    F1Score = 2 * Precision * Recall / (Precision + Recall)

    print('Name', 'Accuracy', 'Precision', 'Recall', 'F1 Score', sep='\t')
    print(Accuracy, Precision, Recall, F1Score, sep='\t')
    #Name	Accuracy	Precision	Recall	F1 Score
    #0.813333333333	0.875	0.767441860465	0.817699115044

    with open(classifier_pkl, 'wb') as fid:
        pickle.dump(classifier, fid)
    with open(vec_pkl, 'wb') as fid:
        pickle.dump(cv, fid)
else:
    with open(classifier_pkl, 'rb') as f:
        classifier = pickle.load(f)
    with open(vec_pkl, 'rb') as f:
        cv = pickle.load(f)

def Analyse(text):
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower()
    text = text.split()
    ps = PorterStemmer()
    text = [ps.stem(word) for word in text if not word in set(stopwords.words('english'))]
    text = ' '.join(text)
    x = cv.transform([text])
    pred = classifier.predict((x))
    return pred[0]

def Feedback(eventID, feedback):
    return Analyse(feedback)