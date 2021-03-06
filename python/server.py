from eventCSV import writeCSV
from nlp import Feedback
from event import generateGraph
from flask import Flask, request, abort, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)

@app.route('/getCSV', methods=['POST'])
def getCSV():
    data = dict(request.form)
    data = json.loads(data['data'][0])
    return jsonify({'path': writeCSV(data['name'], data['dataset'])}), 200



@app.route('/feedback', methods=['POST'])
def setFeedback():
    data = dict(request.form)
    data = Feedback(data['eventID'][0], data['feedback'][0])
    return jsonify({"data": int(data)}), 200


@app.route('/graph', methods=['POST'])
def getGraph():
    data = dict(request.form)
    if 'eventID' in data:
        data = generateGraph(data['eventID'][0], data['positive'][0], data['negative'][0])
        return jsonify({'path': data}), 200
    else:
        return jsonify({}), 403


if __name__ == '__main__':
    app.run(host= '0.0.0.0', debug=True)
