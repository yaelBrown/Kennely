from config.config_mongo import db
from bson import ObjectId

class PetsService: 
  def createPet(self):
    pass

  def createPets(self):
    try: 
      newPets = db.pets.insert_one({"data": []})
      return str(newPets.inserted_id)
    except Exception as e:
      print(e)
      return False

  def getPet(self, nP):
    pass

  def getPets(self, petsId):
    try:
      resultPets = pets.find_one({"_id": ObjectId(petsId)})
      return resultPets
    except Exception as e: 
      print(e)
      return False

  def editPet(self, nP):
    pass

  def deletePet(self, nP):
    pass