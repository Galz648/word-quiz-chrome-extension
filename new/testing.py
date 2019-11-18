from unittest.mock import patch, Mock
from unittest import TestCase
from backend.quiz import QuizCompleteSentence
from noise.tools import assert_list_equal

class TestQuiz(TestCase):
    def setUp(self):
        self.quizObject = QuizCompleteSentence()

    @patch('backend.quiz.QuizCompleteSentence')
    def test_similar_words_api_response_is_ok(mock_get):
    examples = ["first sentence example", "second sentence example", "third sentence example"]
    # Configure the mock to return a response with an OK status code. Also, the mock should have
    # a `json()` method that returns a list of examples.
    mock_get.return_value = Mock(ok=True)
    mock_get.return_value.json.return_value.examples = examples

    # Call the service, which will send a request to the server.
    self.quizObject.getSimiliarWordsResponse()

    # If the request is sent successfully, then I expect a response to be returned.
    assert_list_equal(response.json().examples, examples)

    @patch('backend.quiz.QuizCompleteSentence')
    def test_similar_words_api_response_is_none(mock_get):
        mock_get.return_value = None

        # call the service
        # response = service_call

        assert
if __name__ == "__main__":
    unittest.main()


