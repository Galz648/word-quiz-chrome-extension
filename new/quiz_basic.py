from backend.constants import similiar_words_URL, similiar_words_headers
import requests


def quiz_basic():
    response = requests.get(similiar_words_URL, headers=similiar_words_headers, params={"query": "example"})
    print(response.status_code)
    if response.ok:
        return response
    else:
        return None