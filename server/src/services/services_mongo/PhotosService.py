from config.config_mongo import db
from bson import ObjectId

class PhotoService: 

  def createPhotos(self):
    try:
      newPhotos = db.photos.insert_one({"data": []})
      return str(newPhotos.inserted_id)
    except Exception as e:
      print(e)
      return False

  def createPicture(self): 
    pass

  def getPicture(self): 
    pass

  def getPhotos(self): 
    try:
      resultPhotos = photos.find_one({"_id": ObjectId(userId)})
      return resultPhotos
    except Exception as e:
      print(e)
      return False

  def editPicture(self): 
    pass

  def deletePicture(self):
    pass

  def deletePhotos(self):
    pass