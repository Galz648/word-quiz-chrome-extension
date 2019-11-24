from flask import jsonify, request, abort, Response # flask web server
from backend import app, db
from backend.models import UserSelection, handle_exists_UserSelection
from wordnik import *
from random import choices
import json
import requests
from quiz import QuizCompleteSentence
url = "https://similarwords.p.rapidapi.com/moar"

headers = {
    'x-rapidapi-host': "similarwords.p.rapidapi.com",
    'x-rapidapi-key': "2673ac97d8msha4b25ea1e8cadb0p1ea850jsn733fcb764f76"
    }



db.create_all()
apiUrl = 'http://api.wordnik.com/v4'
apiKey = 'hoh3cbniehkwxjk0b93leoxieddrvll7cr63ay4sjvasj6eh6'
client = swagger.ApiClient(apiKey, apiUrl)
wordApi = WordApi.WordApi(client)
# information about flask.request :
# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request

@app.route('/api/define', methods=['GET', 'POST'])        # posts to api to look up word meaning
def define():
    """
    functionality:
        define a word using the wordnik api - not yet implemented
    return:

    """
    # testing out the wordnik api
    # remove later
    print(request.url)
    # insert to database
    # return json formatted response
    print('view define_word')
    word = request.args.get("word")
    return jsonify({'message': 'success'}) # returns json msg w/ 'success'

@app.route('/api/add', methods=['POST'])
def add():
    """
    functionality :
        add a word to the personal dictionary.
    return:

    """
    print('view add word')

    # add to table UserSelection
    selected_word = request.args.get("word")
    handle_exists_UserSelection(selected_word)
    
    # json response
    return jsonify({'message': 'success'}) # returns json msg w/ 'success'


@app.route('/api/words', methods=['GET'])
def words():
    # break down query string
    return jsonify([_.serialize for _ in UserSelection.query.all()])

@app.route('/api/word/quiz', methods=['GET'])
def word_quiz():
    word = request.args.get("word")
    if not word:
        abort(400) # bad request
    
    quiz = QuizCompleteSentence()
    quiz_json = quiz.serialize(word)
    return quiz_json

@app.route('/api/words/quiz', methods=['GET'])
def words_quiz():
    # tested out api call from front end
    return jsonify(['this', 'that'])