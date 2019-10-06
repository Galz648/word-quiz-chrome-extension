from flask import Flask, jsonify, request   # flask web server
from flask_cors import CORS                 # flask imports
from os import system                       
import logging                              # logging import

system('rm -rf __pycache__')                # delete so the chrome extension will load

app = Flask(__name__)                       # Flask app setup

CORS(app)                                   # Cross-origin resource sharing


LOG_FILE = 'chrome_extension_test.log'           # Create and configure logger
LOG_FORMAT = '%(asctime)s:%(levelname)s:%(name)s -> %(message)s'
logging.basicConfig(
            filename = LOG_FILE,
            level = logging.INFO, 
            format = LOG_FORMAT)

logger = logging.getLogger()

@app.route('/api/define_word', methods=['POST'])        # posts to api to look up word meaning
def define_word():
    """
    functionality:
        define a word
    query example:
        /api/define_word?word="dog"
    return:

    """
    print(f'selection from define {request.json["sel"]}')                               
    logger.info(f' define-word : {request.json["sel"]}') # log word to define
    return jsonify({'message':'success'}) # returns json msg w/ 'success'

@app.route('/api/add_word', methods=['POST'])
def add_word():
    """
    functionality :
        add a word to the personal dictionary.
    query example:
        /api/add_word?word="dog"
    return:

    """
    print(f'selection from add {request.json["sel"]}')
    logger.info(f'add-word : {request.json["sel"]}') # log word to add
    return jsonify({'message':'success'}) # returns json msg w/ 'success'

if __name__ == '__main__':
    app.run(port=5000)