from flask import Flask, send_from_directory
from flask_cors import CORS

from controllers.UserController import userController
from controllers.PostsController import postsController
from controllers.FeedController import feedController
from controllers.DashboardController import dashboardController

app = Flask(
  __name__, 
  static_url_path='')
  # static_folder='/static',
  # template_folder='/template')

CORS(app)

app.register_blueprint(userController, url_prefix='/api/users/')
app.register_blueprint(postsController, url_prefix='/api/posts/')
app.register_blueprint(feedController, url_prefix='/api/feed/')
app.register_blueprint(dashboardController, url_prefix='/api/dashboard/')

@app.route("/")
def testApi():
  return app.send_static_file('index.html')

@app.route("/test")
def testdb():
  return "0.o"

if __name__ == "__main__":
  app.run(port=5000, debug=True)