from config.config_mongo import db
from bson import ObjectId

class OptionService: 

  def createOptions(self):
    try: 
      newOptions = db.options.insert_one({})
      return str(newOptions.inserted_id)
    except Exception as e: 
      print(e)
      return False

  def getOptions(self, userId):
    try:
      resultOptions = db.options.find_one({"_id": ObjectId(userId)})
      return resultOptions
    except Exception as e: 
      print(e)
      return False

  def deleteOptions(self, userId):
    try:
      deletedOptions = db["options"].delete_one({"_id": ObjectId(userId)})
      print(deletedOptions)

      return True
    except Exception as e: 
      print(e)
      return False