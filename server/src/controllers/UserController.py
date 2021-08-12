from flask import Flask, request, Blueprint, jsonify
from flask_bcrypt import Bcrypt

import json
import jwt
import calendar
import time

import services.UserService as userService
# import services.OptionService as optionSerice
import services.PetsService as petsService
import services.PostsService as postsService
import services.PhotosService as photoService
import services.FollowersService as followerService
import services.NotificationService as notificationService

u = userService.UserService()
# o = optionSerice.OptionService()
# pet = petsService.PetsService()
# post = postsService.PostsService()
# photo = photoService.PhotoService()
# f = followerService.FollowerService()
# n = notificationService.NotificationService()

userController = Blueprint('userController', __name__)

_rounds = 12
cache = {}

@userController.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  email = data["email"]
  password = data["password"]
  rememberMe = data["rememberMe"]

  out = u.loginUser(email, password, rememberMe)

  if out is False: 
    return {"msg": "user not found"}, 200
  else: 
    return out, 200


@userController.route('/register', methods=['POST'])
def registerUser():
  """
  Expected data/json
    {
      "email": "yaeli@yaelbrown.com",
      "password": "yaelPass",
      "name": "Yael",
      "location": "YaelVille, USA",
      "gender": true,
      "profilePic": "yaelProfile.jpg"
    }
  """
  data = request.get_json()
  
  if data == None: 
    return {"msg": "Empty Request"}, 422

  newUser = {}
  newUser["password"] = Bcrypt.generate_password_hash(None, data["password"], _rounds)
  newUser["email"] = data["email"]
  newUser["name"] = data["name"]
  newUser["location"] = data["location"]
  newUser["gender"] = data["gender"]
  newUser["coverPic"] = ""
  newUser["dateCreated"] = calendar.timegm(time.gmtime())
  newUser["dateLastLogin"] = int()
  newUser["isAdmin"] = 0

  if data["profilePic"] == None: 
    newUser["profilePic"] = "" # eventually add url for default profile picture
  else: 
    newUser["profilePic"] = data["profilePic"]

  nU = u.registerUser(newUser)

  if nU == False:
    return {"msg": "Unable to create new user"}, 422
  else: 
    cache[nU] = newUser
    del newUser["password"]
    # newUser["_id"] = str(newUser["_id"]) # Only to prevent error for mongodb
    return {"msg": "successfully registered user", "data": newUser}, 200 

@userController.route('/edit', methods=["PUT"])
def edit():
  data = request.get_json()
  print(data)
  if data == None:
    return {"msg": "Invalid User Request"}, 422

  eU = u.edit(data)

  return {"msg": f"edited {data['username']}", "data": eU}, 200

@userController.route('/delete', methods=["DELETE"])
def delete():
  data = request.get_json()
  
  dU = u.deleteUser(data["uId"])
  dO = o.deleteOptions(data["uId"])
  if dU == False or dO == False: 
    return {"msg": f"Unable to delete {data['uId']}"}, 422 
  else:
    return {"msg": f"deleted user: {data['uId']}"}, 200

@userController.route('/user', methods=["POST"])
def users():
  """
  Method is used to get users by id (short info for cache purposes)
  This allows users profile pictures to show on pages

  returns payload = {
    "_id": str,
    "name": str,
    "profilePic": str,
    "location": str
  }
  """
  data = request.get_json()

  if data == None or "users" not in data or data["users"] == []: 
    return {"msg": "No user id's requested"}, 422

  res = u.getUsers(data["users"])

  if res == False:
    return {"msg": "Unable to get new user(s)"}, 422
  else: 
    msg = "Successfully found " + str(len(res)) + "/" + str(len(data["users"])) + " users"
    return {"msg": msg, "data": u.serialize(res) if res else []}, 200














