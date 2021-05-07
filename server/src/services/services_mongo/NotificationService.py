from config.config_mongo import db
from bson import ObjectId

class NotificationService:
  def createNotifications(self):
    try: 
      newNotifications = db.notifications.insert_one({"data": []})
      return str(newNotifications.inserted_id)
    except Exception as e:
      print(e)
      return False

  def getNotifications(self, notificationId):
    try: 
      resultNotifications = notifications.find_one({"_id": ObjectId(notificationId)})
      return resultNotifications
    except Exception as e:
      print(e)
      return False

  def updateNotifications(self):
    pass

  def deleteNotifications(self):
    pass