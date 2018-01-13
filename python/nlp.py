import pandas as pd

dataset = pd.read_csv('data.tsv', sep='\t', quoting=3)

import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

stopwords = set(stopwords.words('english'))
ps = PorterStemmer()

corpus = []
for i in range(len(dataset)):
    review = re.sub('[^a-zA-Z]', ' ', dataset['Review'][i])
    review = review.lower()
    review = review.split()
    review = [ps.stem(word) for word in review if word not in stopwords]
    review = ' '.join(review)
    corpus.append(review)

from sklearn.feature_extraction.text import CountVectorizer

cv = CountVectorizer(max_features=1500)
X = cv.fit_transform(corpus).toarray()
y = dataset.iloc[:, 1].values


from sklearn.preprocessing import Imputer
y=y.reshape(-1,1)
imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
imputer = imputer.fit(y)
y = imputer.transform(y)


# from sklearn.feature_extraction.text import TfidfTransformer
# tf_transformer = TfidfTransformer(use_idf=False).fit(X)
# X_train_tf = tf_transformer.transform(X)

# Splitting the dataset into the Training set and Test set
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)

from sklearn.metrics import confusion_matrix

def Apply(classifier, name):
    classifier.fit(X_train, y_train)
    y_pred = classifier.predict(X_test)
    cm = confusion_matrix(y_test, y_pred)
    Accuracy = (cm[0, 0] + cm[1, 1]) / sum(sum(cm))
    Precision = cm[1, 1] / (cm[0, 1] + cm[1, 1])
    Recall = cm[0, 0] / (cm[0, 0] + cm[1, 0])
    F1Score = 2 * Precision * Recall / (Precision + Recall)
    print(name, Accuracy, Precision, Recall, F1Score, sep='\t')


print('Name', 'Accuracy', 'Precision', 'Recall', 'F1 Score', sep='\t')

from sklearn.linear_model import LogisticRegression

Apply(LogisticRegression(random_state=0), 'Logc')

from sklearn.neighbors import KNeighborsClassifier

Apply(KNeighborsClassifier(), 'KNN')

from sklearn.svm import SVC

Apply(SVC(kernel='rbf', random_state=0), 'SVM')

from sklearn.naive_bayes import GaussianNB

Apply(GaussianNB(), 'Naive')

from sklearn.tree import DecisionTreeClassifier

Apply(DecisionTreeClassifier(criterion='entropy', random_state=0), 'DTree')

from sklearn.ensemble import RandomForestClassifier

Apply(RandomForestClassifier(n_estimators=300, criterion='entropy', random_state=0), 'RForest')

import json
with open('abc.txt','wt+') as f:
    json.dump(f, X)