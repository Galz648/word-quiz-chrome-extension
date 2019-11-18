# Third-party imports...
from nose.tools import assert_is_none, assert_list_equal

# Local imports...
from backend.quiz_basic import quiz_basic

# Standard Library Imports
from unittest.mock import Mock, patch
"""
@patch('backend.quiz_basic.requests.get')
def test_quiz_complete_response_is_ok(mock_get):
    examples = ["first example sentence", "second example sentence"]

    # Configure the mock to return a response with an OK status code. Also, the mock should have
    # a `json()` method that returns a list of examples.
    mock_get.return_value = Mock(ok=True)
    mock_get.return_value.json.return_value.examples = examples

    # Call the service, which will send a request to the server.
    response = quiz_basic()

    # If the request is sent successfully, then I expect a response to be returned.
    assert_list_equal(response.json().examples, examples)


@patch('backend.quiz_basic.requests.get')
def test_quiz_basic_response_is_not_ok(mock_get):
    # Configure the mock to not return a response with an OK status code.
    mock_get.return_value.ok = False

    # Call the service, which will send a request to the server.
    response = quiz_basic()

    # If the response contains an error, I should get no example object.
    assert_is_none(response)
"""

# 