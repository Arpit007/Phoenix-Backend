from config import db
from bson.objectid import ObjectId
import pandas as pd


def fetchData(eventID):
    result = db.status.find({"event": ObjectId(eventID), "going": False}, {"userID": 1})
    dataset = []
    for item in result:
        item = db.users.find_one({"_id": ObjectId(item['userID'])}, {"password": 0, "__v": 0})
        if item:
            dataset.append(item)
    dataset = pd.DataFrame(dataset)
    event = db.events.find_one({"_id":ObjectId(eventID)},{"name":1})
    name = event['name'] if event else ""
    return [dataset, name]


def writeCSV(eventID):
    try:
        result = fetchData(eventID)
        dataset = result[0]
        name = result[1] if result[1] else eventID
        dataset.to_csv('../public/static/' + name + '.csv', sep=',')

        return "/static/" + eventID + '.csv'
    except Exception as e:
        print(e)
        return ""

if __name__ is "__main__":
    data = writeCSV("5a59fa8d3322ae2f6089cf6b")
