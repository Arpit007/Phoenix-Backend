from config import db
from bson.objectid import ObjectId
import pandas as pd

def writeCSV(eventName, data):
    try:
        dataset = pd.DataFrame(data)
        dataset.to_csv('../public/static/' + eventName + '.csv', sep=',')
        return "/static/" + eventName + '.csv'
    except Exception as e:
        print(e)
        return ""

if __name__ is "__main__":
    data = writeCSV("5a59fa8d3322ae2f6089cf6b")
