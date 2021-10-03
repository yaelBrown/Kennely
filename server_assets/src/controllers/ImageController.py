from flask import Flask, request, Blueprint, jsonify
from datetime import datetime

import json
import calendar
import time

import services.ImageService as imageService

i = imageService.ImageService()

imageController = Blueprint('imageController', __name__)

@imageController.route('/', methods=['POST'])
def postImage():
  pass

@imageController.route('/', methods=['GET'])
def getImage():
  pass

@imageController.route('/', methods=['UPDATE'])
def updateImage():
  pass

@imageController.route('/', methods=['DELETE'])
def deleteImage():
  pass




