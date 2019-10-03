from flask import Flask, jsonify, request   # flask web server
from flask_cors import CORS                 # flask imports
from os import system                       
import logging                              # logging import

system('rm -rf __pycache__')                # delete so the chrome extension will load

app = Flask(__name__)                       # Flask app setup

CORS(app)                                   # Cross-origin resource sharing


LOG_FILE = 'chrome_extension.log'           # Create and configure logger
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

@app.route('/api', methods=['POST'])        # posts to api to look up word meaning 
def post_word():
    
# POST word 
# example: GET /api?word=dog
# return : json object that contains ---
                                    
    logger.info(f' user-selection : {request.json["sel"]}') #
    return jsonify({'message':'success'})   # returns json msg w/ 'success'

if __name__ == '__main__':
    app.run(port=5000)