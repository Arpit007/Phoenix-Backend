import os
import json
from pymongo import MongoClient
from bson.objectid import ObjectId

if 'PY_ENV' in os.environ:
    debugMode = os.environ['PY_ENV'] == 'development'
else: debugMode = True


with open('../config/config_debug.json') as file:
    xConfig = json.load(file)

client = MongoClient("mongodb://192.168.31.169:27017")
db = client[xConfig['dbConfig']['db']]


