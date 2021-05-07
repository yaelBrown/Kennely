import json
import bcrypt
import jwt
import datetime
import calendar
import time

from bson import json_util, ObjectId
from config.config_mongo import db

class UserService: 

  def loginUser(self, email, password, remember):
    try:
      requestedUser = db.users.find_one({"email": email})
      if requestedUser is None:
        return False
      if bcrypt.checkpw(bytes(password, "utf-8"), requestedUser["password"]):
        if remember: 
          tokenData = {
            "email": email, 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=365)
          }
        else:   
          tokenData = {
            "email": email, 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
          }
        secret = "ilovepets"
        token = jwt.encode(tokenData, secret)
        del requestedUser["_id"]
        del requestedUser["password"]
        db.users.update_one({"email": email}, {"$set": {'dateLastLogin': calendar.timegm(time.gmtime())}})
        return {"token": token.decode("UTF-8"), "user": requestedUser}
      else: 
        return False
    except Exception as e: 
      print(e)
      return False

  def registerUser(self, newUser): 
    try:
      uid = db.users.insert_one(newUser)
      if uid is None: 
        raise Exception("Unable to create user")
      else: 
        return uid.inserted_id
    except Exception as e: 
      print(e)
      return False

  def editUser(self, u):
    pass

  def deleteUser(self, u):
    try: 
      deletedUser = db["users"].delete_one({"_id": ObjectId(u)})
      print(deletedUser)

      return True
    except Exception as e: 
      print(e)
      return False

  def getUsers(self, u):
    try:
      queryParams = {
          "password": 0, 
          "email": 0, 
          "gender": 0, 
          "coverPic": 0, 
          "dateLastLogin": 0, 
          "optionsId": 0, 
          "dateCreated": 0
        } 
      if len(u) > 1: 
        qUsers = [ObjectId(uid) for uid in u]
        users = db["users"].find({"_id": {"$in" : qUsers}}, queryParams) # fix this to find 1
      else: 
        users = db["users"].find({"_id": ObjectId(u[0])}, queryParams) # fix this to find more than one
      
      if users != None: 
        return [u for u in users]
      else: 
        return False
    except Exception as e:
      print(e)
      return False

  def serialize(self, results):
    return [json.dumps(u, default=json_util.default) for u in results]
