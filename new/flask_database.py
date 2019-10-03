# database file
# datetime
from datetime import datetime
# db-ORM import 
from flask_sqlalchemy import SQLAlchemy
from main_flask import app

# database setup
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# using sqlite db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

# user database-table setup
class User(db.Model):
    pass
# user-selection database-table setup
class UserSelection(db.Model):
    # id, word, occurence, datastamp, username - not added yet 
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(60), unique=True)    
    occurence = db.Column(db.Integer)
    datestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):
        return f'id:{self.id}|word:{self.word}|occcurence:{self.occurence}|datestamp:{self.datestamp}'


    def insert_word(self, parameter_list):
        pass