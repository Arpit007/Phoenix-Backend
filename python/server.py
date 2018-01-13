from eventCSV import writeCSV
from nlp import Feedback

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
    return jsonify({"data":int(data)}), 200


if __name__ == '__main__':
    app.run(debug=True)