from flask import Flask, request, Blueprint
from flask_bcrypt import Bcrypt

import calendar
import time
import json
from datetime import datetime

import services.PostsService as postsService

post = postsService.PostsService()

postsController = Blueprint('postsController', __name__)

@postsController.route('/create', methods=['POST'])
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

  newPost = dict() 

  newPost["users_id"] = data["users_id"]
  newPost["date"] = int(datetime.now().timestamp())
  newPost["caption"] = data["caption"]
  newPost["likes"] = 0
  newPost["post_type"] = data["post_type"]
  newPost["content_src"] = data["content_src"]

  res = post.createPost(newPost)

  if res != True: 
    return {
      "msg": "Unable to create new post",
      "err": res,
      "data": newPost
      }, 422
  else:
    return {"msg": "successfully created post", "data": newPost}, 200


@postsController.route('/feed', methods=['GET'])
def getPosts():
  data = request.get_json()

  if data == None or "user_id" not in data: 
    return {
      "msg": "error getting posts",
      "err": "must pass a user id to get their feed",
      "data": data
    }, 422
  else: 
    res = post.getPosts(data["user_id"])
    if res != False:
      return {
        "msg": "ok",
        "data": res
      }, 200
    else: 
      return {
        "msg": "error getting posts",
      }, 422


@postsController.route('/post', methods=["GET"])
def getPostById():
  data = request.get_json()

  if data == None or "post_id" not in data:
    return {
      "msg": "error finding post",
      "err": "must pass a post_id to get a post",
      "data": data
    }, 422
  else: 
    res = post.getPost(data["post_id"])

    if res != False: 
      if res is None or len(res) == 0:
        return {
          "msg": "error finding post",
          "err": f"could not find post with post id {data['post_id']}",
          "data": res
        }, 422
      else: 
        return {
          "msg": "ok",
          "data": res
        }, 200
    else: 
      return {
        "msg": "error getting post",
        "data": res
      }, 422


@postsController.route('/post', methods=['PUT'])
def editPost():
  pass


@postsController.route('/post', methods=['DELETE'])
def deletePost():
  pass
