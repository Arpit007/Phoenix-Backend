from eventCSV import writeCSV
from nlp import Feedback
from event import generateGraph
from flask import Flask, request, abort, jsonify

app = Flask(__name__)


@app.route('/getCSV', methods=['POST'])
def getCSV():
    if not request.form or not 'eventID' in request.form:
        abort(400)
    data = dict(request.form)
    return jsonify({'path': writeCSV(data['eventID'][0])}), 200


@app.route('/feedback', methods=['POST'])
def setFeedback():
    data = dict(request.form)
    data = Feedback(data['eventID'][0], data['feedback'][0])
    return jsonify({"data": int(data)}), 200


@app.route('/graph', methods=['POST'])
def getGraph():
    data = dict(request.form)
    data = generateGraph(data['eventID'][0])
    return jsonify({'path': data}), 200


if __name__ == '__main__':
    app.run(host= '0.0.0.0', debug=True)
