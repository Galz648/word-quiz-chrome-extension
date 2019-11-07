from datetime import datetime                               # database file, datetime 
from backend import db, app

class UserSelection(db.Model):                              # user-selection database-table setup
    # word, occurence, datastamp, method
    word = db.Column(db.String(20), primary_key=True)            
    occurence = db.Column(db.Integer, default=1)
    datestamp = db.Column(db.DateTime, default=datetime.utcnow)
    #method = db.Column(db.String(20), nullable=False, unique=True)
    
    def __repr__(self):                                     # representation function
        return f'word:{self.word}, occurence:{self.occurence}, datestamp:{self.datestamp})'

    @property
    def serialize(self):
        return {
            'word' : self.word,
            'occurence' : self.occurence,
            'datestamp' : self.datestamp
        }

# move method to class
def handle_exists_UserSelection(selected_word):
    exists = db.session.query(db.exists().where(UserSelection.word == selected_word)).scalar()
    if exists:
        row = UserSelection.query.filter_by(word=selected_word).first()
        row.occurence += 1
        print('row updated')
    else:
        word_selection = UserSelection(word=selected_word)
        db.session.add(word_selection)
        print('row added')    
    db.session.commit()