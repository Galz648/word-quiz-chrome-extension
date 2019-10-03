from datetime import datetime                               # database file, datetime
from flask_sqlalchemy import SQLAlchemy                     # db-ORM import 
from main_flask import app


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False        # database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' # using sqlite db
db = SQLAlchemy(app)                                        # define database for the app

class User(db.Model):                                       # user database-table setup
    pass

class UserSelection(db.Model):                              # user-selection database-table setup
    id = db.Column(db.Integer, primary_key=True)            # id, word, occurence, datastamp, username - not added yet
    word = db.Column(db.String(60), unique=True)            
    occurence = db.Column(db.Integer)
    datestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):                                     # representation function
        return f'id:{self.id}|word:{self.word}|occcurence:{self.occurence}|datestamp:{self.datestamp}'


