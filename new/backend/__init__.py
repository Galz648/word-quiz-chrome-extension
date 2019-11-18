from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS


# logging setup
"""                     
import logging                              # logging import
#from flask_database import * # setting up db call

# logger configuration
LOG_FILE = 'chrome_extension_new.log'           # Create and configure logger
LOG_FORMAT = '%(asctime)s:%(levelname)s:%(name)s -> %(message)s'
logging.basicConfig(
            filename = LOG_FILE,
            level = logging.INFO, 
            format = LOG_FORMAT)

logger = logging.getLogger()
"""
app = Flask(__name__)

# run unit tests

# flask-app setup
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False        # database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' # using sqlite db


CORS(app)
db = SQLAlchemy(app)

from backend import routes