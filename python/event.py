from matplotlib import pyplot as plt
from config import *


def graph(positive, negative, name):
    pass


def generateGraph(eventID):
    event = db.events.find_one({"_id": ObjectId(eventID)}, {"review": 1})
    name = event["_id"] + ".png"
    graph(event["review"]["positive"], event["review"]["negative"], )
