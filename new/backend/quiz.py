from backend.constants import similiar_words_URL, similiar_words_headers, wordnik_api_key, wordnik_api_URL
import requests
import random
import json

from wordnik import *

"""
types of quizes - 
complete the sentence quiz:
    have 1 main word and 3 similar words (either from an api or from the db)

    class functionality:
        create a batch of cards for the user to answer, and once you get a response, you update the specific quiz table of the results, 
        and repeat the process until the number of asked quizes have been reached

    return: correct word, example sentence of correct word, options of choice (3 words)

    
connotation test
    positive negative and neutral
    class functionionality:
        
    return: correct connotation, options of choice (connotations), sentence usage as hint
"""

# A quiz consists of cards - when a quiz is instastantiated, top priority cards should be fetched for the upcoming quiz

class QuizCompleteSentence:
    def __init__(self, cards=3, batch=None):
        self.cards = cards
        self.batch = self.cards if not batch else batch
        # wordnik api setup
        self.client = swagger.ApiClient(wordnik_api_key, wordnik_api_URL)
        self.wordApi = WordApi.WordApi(self.client)
        # make a database call to the UserSelection table - to fetch similar words



    def getSimilarWordsResponse(self, word):
        """
        # using some api
        response = requests.get(similiar_words_URL, headers=similiar_words_headers, params={"query":word})
        if response.ok:
            return response

        else:
            return None
        """
        # using wordnik api
        similar_words_obj = self.wordApi.getRelatedWords(relationshipTypes="same-context",word=word)
        return similar_words_obj

        
    def getSimilarWords(self, word, similar=3):
        """
        # using some api
        response = self.getSimilarWordsResponse(word)
        if response:
            similar_words = random.choices( json.loads(response.text)["result"], k=similar)
            return similar_words
        else:
            raise Exception("Response object is None")
        """
        response = self.getSimilarWordsResponse(word)
        return response
        # using wordnik api

    def getSentenceExamples(self, word, limit=3):
        # get examples if test_word
        examples_list = self.wordApi.getExamples(word=word, limit=limit).examples
        examples_list = [example.text for example in examples_list]
        return examples_list

    
    def serialize(self, word, limit=3, similar=3):
        examples_list = self.getSentenceExamples(word, limit)
        similar_words_list = self.getSimilarWords(word, similar)
        return json.dumps({"word":word, 'examples': examples_list, 'similar_words': similar_words_list})
