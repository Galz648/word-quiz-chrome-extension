# python flask api
from flask import Flask, jsonify, request
from flask_cors import CORS




app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['POST'])
def post_word():
    """
    POST word 
    example: GET /word?word='dog'
    
    return : 
    """
    # GET request params
    word = request.args['word']
    
    # insert word to table
    # try except block

    return jsonify({'word': word, 'result': 'success!'})



app.run(port=5000)