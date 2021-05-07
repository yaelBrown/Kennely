import json

from pymongo import DESCENDING
from bson import json_util, ObjectId
from config.config_mongo import db

class PostsService: 
  def createPost(self, p):
    try: 
      newPosts = db.posts.insert_one(p)
      return str(newPosts.inserted_id)
    except Exception as e:
      print(e)
      return False

  def getPost(self, postsId):
    try:
      resultPosts = db.posts.find_one({"_id": ObjectId(postsId)})
      return resultPosts
    except Exception as e:
      print(e)
      return False

  def getPostsById(self, uId):
    try: 
      resultPosts = db.posts.find({"authorId": uId})
      return resultPosts
    except Exception as e:
      print(e)
      return False

  def getPosts(self):
    try: 
      resultPosts = db.posts.find().limit(250).sort("dateTime", DESCENDING)
      return resultPosts
    except Exception as e:
      print(e)
      return False

  def editPost(self, postsId):
    pass

  def deletePost(self, postId):
    pass

  def serialize(self, results):
    return [json.dumps(p, default=json_util.default) for p in results]

