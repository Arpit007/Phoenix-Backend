import os
import json
from pymongo import MongoClient

if 'PY_ENV' in os.environ:
    debugMode = os.environ['PY_ENV'] == 'development'
else: debugMode = True


with open('../config/config_debug.json') as file:
    xConfig = json.load(file)

client = MongoClient(xConfig['dbConfig']['url'])
db = client[xConfig['dbConfig']['db']]


