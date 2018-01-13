from config import xConfig
from eventCSV import writeCSV

from flask import Flask, request, abort, jsonify

app = Flask(__name__)

@app.route('/getCSV', methods=['POST'])
def getCSV():
    if not request.form or not 'eventID' in request.form:
        abort(400)
    data = dict(request.form)
    return jsonify({'path': writeCSV(data['eventID'][0])}), 200


if __name__ == '__main__':
    app.run(debug=True)