from flask import Flask
from flask_cors import CORS

from controllers.ImageController import imageController

app = Flask(__name__)

CORS(app)

app.register_blueprint(imageController, url_prefix="/assets/images/")

@app.route("/test")
def testdb():
  return "0.o"

if __name__ == "__main__":
  app.run(port=5050, debug=True)