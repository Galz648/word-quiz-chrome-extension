from flask import jsonify, request   # flask web server
from backend import app, db
from backend.models import UserSelection, handle_exists_UserSelection
db.create_all()

# information about flask.request :
# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request

@app.route('/api/define_word', methods=['POST'])        # posts to api to look up word meaning
def define_word():
    """
    functionality:
        define a word using the wordnik api - not yet implemented
    return:

    """
    # insert to database
    # return json formatted response
    print('view define_word')
    print(request.mimetype)
    print(request.data)
    print(request.get_json())
    return jsonify({'message': 'success'}) # returns json msg w/ 'success'

@app.route('/api/add_word', methods=['POST'])
def add_word():
    """
    functionality :
        add a word to the personal dictionary.
    return:

    """
    print('add word route called')
    print(request.mimetype)
    selected_word = request.get_json()['selection']
    print(f'selected_word: {selected_word}')
    # add to table UserSelection
    handle_exists_UserSelection(selected_word)
    
    # json response
    return jsonify({'message': 'success'}) # returns json msg w/ 'success'


@app.route('/api/get_words', methods=['GET'])
def get_words():
    return jsonify([_.serialize for _ in UserSelection.query.all()])