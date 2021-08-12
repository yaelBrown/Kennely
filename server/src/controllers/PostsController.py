from flask import Flask, request, Blueprint
from flask_bcrypt import Bcrypt

import calendar
import time
import json

import services.PostsService as postsService

post = postsService.PostsService()

postsController = Blueprint('postsController', __name__)

@postsController.route('/post', methods=['POST'])
def createPost():
  """
  For creating a post
    text - text post
    photo - picture/photo post
    video - video post

  data = {
    authorId - [mongodb user id]
    caption - str
    postType - image/video (if none == text)
    contentSrc - str (url of image/video)
    petsTagged - [pet]
  }
  """
  data = request.get_json()

  if data == None:
    return {"msg": "Empty Request"}, 422

  newPost = {} 

  newPost["author_id"] = data["author_id"]
  newPost["dateTime"] = calendar.timegm(time.gmtime())
  newPost["caption"] = data["caption"]
  newPost["likes"] = 0

  if data["postType"] == "text" or "postType" not in data:
    newPost["postType"] = "text"
  else: 
    newPost["postType"] = data["postType"]
  
  if data["postType"] == "text": 
    newPost["contentSrc"] = ""
  else:
    newPost["contentSrc"] = data["contentSrc"]
  
  # if data["petsTagged"] == None: 
  #   newPost["petsTagged"] = []
  # else: 
  #   newPost["petsTagged"] = data["petsTagged"]

  res = post.createPost(newPost)

  if res == False: 
    return {"msg": "Unable to create new post"}, 422
  else:
    newPost["_id"] = str(newPost["_id"])
    return {"msg": "successfully created post", "data": newPost}, 200

@postsController.route('/post', methods=['GET'])
def getPosts():
  data = request.get_json()

  if data == None: 
    res = post.getPosts()
  elif "uId" in data: 
    res = post.getPostsById(data["uId"])
  else:
    res = False

  if res == False:
    return {"msg": "error getting posts"}
  else: 
    return {"msg": "successfully retrieved posts", "data": post.serialize(res) if res else []}, 200

@postsController.route('/post', methods=['PUT'])
def editPost():
  pass

@postsController.route('/post', methods=['DELETE'])
def deletePost():
  pass
