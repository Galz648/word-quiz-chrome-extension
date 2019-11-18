from os import environ

similiar_words_URL = "https://similarwords.p.rapidapi.com/moar"
similiar_words_headers = {
            'x-rapidapi-host': "similarwords.p.rapidapi.com",
            'x-rapidapi-key': environ["SIMILAR_WORDS_API_KEY"]
            }

wordnik_api_URL = 'http://api.wordnik.com/v4'
wordnik_api_key = environ['WORDNIK_API_KEY']