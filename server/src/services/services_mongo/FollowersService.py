from config.config_mongo import db
from bson import ObjectId

class FollowerService: 

  def createFollowers(self):
    try: 
      newFollowers = db.followers.insert_one({"data": []})
      return str(newFollowers.inserted_id)
    except Exception as e:
      print(e)
      return False
      
  def getFollowers(self):
    pass

  def editFollowers(self):
    """
    used for adding a follower, and removing a follower
    """
    pass

  def deleteFollowers(self):
    pass