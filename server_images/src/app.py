from flask import Flask
from flask_cors import CORS

from controllers.ImageController import imageController

app = Flask(__name__)

CORS(app)

app.register_blueprint()




if __name__ == "__main__":
  app.run(port=5050, debug=True)