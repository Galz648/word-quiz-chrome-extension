# flask web server
# flask imports
from flask import Flask, jsonify, request
from flask_cors import CORS
from os import system
# logging import
import logging

# delete so the chrome extension will load
system('rm -rf __pycache__')

# Flask app setup
app = Flask(__name__)
# Cross-origin resource sharing
CORS(app)

# Create and configure logger
LOG_FILE = 'chrome_extension.log'
LOG_FORMAT = '%(asctime)s:%(levelname)s:%(name)s -> %(message)s'
logging.basicConfig(
            filename = LOG_FILE,
            level = logging.INFO, 
            format = LOG_FORMAT)

logger = logging.getLogger(__name__)


# creating a handler to log on the console
#stream_handler = logging.StreamHandler()
#stream_handler.setFormatter(LOG_FORMAT)
#stream_handler.setLevel(logging.INFO)

@app.route('/arguments', methods=['GET'])
def test_route():
   return jsonify({'message': 'true'})

@app.route('/api', methods=['POST'])
def post_word():
    """
    POST word 
    example: GET /api?word=dog
    
    return : json object that contains ---
    """
    logger.info(f' user-selection : {request.json["sel"]}')
    
    return jsonify({'message':'success'})

if __name__ == '__main__':
    app.run(port=5000)