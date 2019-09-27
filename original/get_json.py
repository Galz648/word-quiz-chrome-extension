from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from cli import translate_expression
#from difflib import get_close_matches
#from cli import get_avaliable_languages
from os import system
system("rm -r __pycache__")
print("__pycache__ deleted")
app = Flask(__name__)
# adds the associated headers with CORS
CORS(app)
"""
@app.route('/', methods=['GET', 'POST'])
def serve_json():
	key = "key"
	result = "result"
	return jsonify({key: result})
	
@app.route('/api', methods=['GET', 'POST'])
def language_choice():
	print('route called')
	language = request.args['input'].lower()
	choice = request.args['lang_choice']
	print('choice: ', choice)
	print('language: ', language)
	
	# languages avaliable for translation on google translate
	# change the code so that the function will return an array.
	# use the getter decorator.
	languages_list = get_avaliable_languages()
	print('languages_list: \n', languages_list)

	matches_list = get_close_matches(language, languages_list, n=6)
	matches_list = list(set([i.lower() for i in matches_list]))

	print(type(matches_list))
	# pythonObj --> jsonString
	jsonString = json.dumps(matches_list)
	# jsonString --> jsObj
	jsonObj = jsonify(json.loads(jsonString))
	return jsonObj

"""

@app.route('/translate', methods=['GET'])
def translate_api():
    expression = request.args['expression']
    language = request.args['language']
    translation = translate_expression(expression, language)
    # translate expression using the language key
    print('expression: {}, \nlanguage: {}'.format(expression, language))
    print('original : {}, translation: {}'.format(expression, translation))
    #translate expression with the given language 
    pythonObj = {'expression': expression, 'language': language, 'translation': translation}
    # pythonObj --> jsonString
    jsonString = json.dumps(pythonObj)
    # jsonString --> jsObj
    jsonObj = jsonify(json.loads(jsonString))
    print("sent jsonObj: ", jsonObj)
    return jsonObj

if __name__ == '__main__':
	app.run(debug=True, port=8080)
