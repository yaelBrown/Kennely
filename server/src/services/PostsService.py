import json

from bson import json_util, ObjectId
from config.config_mysql import (cur, con)

class PostsService: 
  def createPost(self, newPost):
    try: 
      sql = "insert into posts (users_id, caption, post_type, content_src, date) values (%s, %s, %s, %s, %s)"
      cur.execute(sql, (
        newPost["users_id"],
        newPost["caption"],
        newPost["post_type"],
        newPost["content_src"],
        newPost["date"]
      ))

      con.commit()
      return True      
    except Exception as e:
      print(e)
      return str(e)

  def getPosts(self, user_id): 
    # passing user_id to get personalized feed based on friends.
    #   currently friends is not implemented
    try: 
      if type(user_id) != int: 
        raise Exception("post_id is not a integer")

      sql = "select * from posts limit 25"
      cur.execute(sql)
      
      return cur.fetchall()
    except Exception as e:
      print(e)
      return False

  def getPost(self, user_id):
    try: 
      if type(user_id) != int: 
        raise Exception("post_id is not a integer")

      sql = "select * from posts where id = %s"
      cur.execute(sql, user_id)
      
      return cur.fetchone()
    except Exception as e:
      print(e)
      return False

  def getMorePosts(self, user_id, offset):
    pass

  def editPost(self, postsId):
    pass

  def deletePost(self, postId):
    pass

  def serialize(self, results):
    return [json.dumps(p, default=json_util.default) for p in results]

