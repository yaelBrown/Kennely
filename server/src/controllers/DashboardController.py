from flask import Flask, request, Blueprint, jsonify

import json
import sys

import services.PostsService as postsService

post = postsService.PostsService()

dashboardController = Blueprint('dashboardController', __name__)

@dashboardController.route('/', methods=['GET'])
def getDashboard():
  """
  This route is for dashboard and gets feed and 
  information for all sections on initial page load.
  """
  data = dict()
  try: 
    data["user_id"] = int(request.args.get('user_id'))
  except Exception as e:
    print("asdfafasdfasdfasfsfd")
    return {
      "msg": "error getting dashboard",
      "err": "parsable integer must be passed as a parameter",
      "data": request.args.get('user_id')
    }, 422    

  noUserIdRes = {
    "msg": "error getting dashboard",
    "err": "must pass a user id to get dashboard information",
    "data": data
  }, 422 

  if data["user_id"] != None: 
    if data["user_id"] == None or type(data["user_id"]) != int: 
      return noUserIdRes
    else: 
      out = dict()

      out["posts"] = post.getPosts(data["user_id"])

      return {
        "msg": "ok",
        "data": out
      }, 200

  else: 
    return noUserIdRes 