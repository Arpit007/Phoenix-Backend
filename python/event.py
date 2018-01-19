from matplotlib import pyplot as plt
from config import *


def graph(positive, negative, name):
    fig, ax = plt.subplots()
    ind = [0.2, 0.6]
    pos, neg = ax.bar(ind, [positive, negative], width=0.2)
    pos.set_facecolor('b')
    neg.set_facecolor('g')
    ax.set_xticks(ind)
    ax.set_xticklabels(['Positive', 'Negative'])
    ax.set_xlim([0, 1])
    ax.set_ylabel('Attendees')
    ax.set_title('Reviews')
    fig.savefig(name)
    plt.close(fig)


def generateGraph(eventID):
    event = db.events.find_one({"_id": ObjectId(eventID)}, {"review": 1})
    name = '../public/static/' + event["_id"] + ".png"
    graph(event["review"]["positive"], event["review"]["negative"], name)
    return '/static/' + event["_id"] + ".png"
