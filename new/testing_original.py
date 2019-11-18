from backend import app
import unittest
from quiz import QuizCompleteSentence
import json
import requests
from wordnik import *
import random



class TestRoutes(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.tester = app.test_client(self)
    def test_wordQuizRoute(self):
        response = self.tester.get('/api/words/quiz')
        #response = self.tester.get('/api/word/quiz?word=word')
        #assert type(request.args['word']) != None
        #assert response.type == 'application/json' 
        self.assertEqual(response.status_code, 200)

class TestQuiz(unittest.TestCase):
    def setUp(self):
        self.quizObject = QuizCompleteSentence()

    # check if the you are trying to reach is avaliable
    
    def test_api_similar_words(self):    
        url = self.quizObject.url
        headers = self.quizObject.headers
        querystring = {'query': 'example'} # example querystring
        response = requests.request(
        "GET",
        url,
        headers=headers, 
        params=querystring)
        # test api response code
        self.assertEqual(response.status_code, 200, "response status is not 200")
        # check the type of data returned
        responseTextToDict = json.loads(response.text)
        self.assertEqual(type(responseTextToDict), type({}), "response.text is not of type dict")
        self.assertIsNotNone(responseTextToDict.get('result'), "key result does not exist")
        # check if the response text is not empty
        self.assertNotEqual(len(responseTextToDict['result']), 0, "result key in response.text is empty")

    def test_api_sentence_example(self):
        test_word = 'example'
        """
        apiUrl = 'http://api.wordnik.com/v4'
        apiKey = 'hoh3cbniehkwxjk0b93leoxieddrvll7cr63ay4sjvasj6eh6'
        client = swagger.ApiClient(apiKey, apiUrl)
        wordApi = WordApi.WordApi(client)
        # get examples if test_word
        examples = wordApi.getExamples(test_word)
        # type is a list
        self.assertEqual(type(examples.examples), type([]), "type of examples.examples is not a list")
        # length of the list is not 0 
        self.assertNotEqual(len(examples.examples), 0, "examples.examples list is empty")
        """
        random_limit = random.randint(1, 5)
        # test method
        word_examples = self.quizObject.getSentenceExamples(word=test_word, limit=random_limit)
        self.assertEqual(type(word_examples), type([]), 'word_examples are not of type list')
        self.assertEqual(len(word_examples), random_limit)


if __name__ == "__main__":
    unittest.main()


