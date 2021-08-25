from flask import Flask, request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from datetime import datetime

import json
import jwt
import calendar
import time

import services.UserService as userService

u = userService.UserService()

userController = Blueprint('userController', __name__)

_rounds = 12
cache = {}

@userController.route('/login', methods=['POST'])
def login():
  """
  Expected data/json
    {
      email: "test@test.com"
      password: "test"
      rememberMe: false
    }
  """
  data = request.get_json()
  email = data["email"]
  password = data["password"]
  # rememberMe = data["rememberMe"] # this is passed for future functionality

  out = u.loginUser(email, password)

  if out["msg"] != "ok": 
    return { "msg": "user not found", "err": out["msg"] }, 200
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
  newUser["email"] = data["email"]
  newUser["location"] = data["location"]
  newUser["password"] = Bcrypt.generate_password_hash(None, data["password"], 12)
  newUser["gender"] = data["gender"]
  newUser["is_admin"] = 0
  newUser["name"] = data["name"]
  if data["profilePic"] == None or data["profilePic"] == "": 
    newUser["profile_pic"] = "" # eventually add url for default profile picture
  else: 
    newUser["profile_pic"] = data["profilePic"]
  newUser["date_created"] = int(datetime.now().timestamp())
  newUser["date_last_login"] = 0

  nU = u.registerUser(newUser)

  if nU != True:
    return {"msg": "Unable to create new user", "new_user": nU}, 422
  else: 
    # cache[nU] = newUser
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














