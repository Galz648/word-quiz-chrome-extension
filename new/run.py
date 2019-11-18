from backend import app
from os import environ
# env variables

environ["FLASK_APP"] = __name__
environ["FLASK_DEBUG"] = "1"

if __name__ == '__main__':
    app.run(port=5000)
