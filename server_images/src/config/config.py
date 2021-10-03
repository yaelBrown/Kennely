from pymongo import MongoClient

class Config:
  # client = MongoClient("mongodb+srv://pet_owner:pets@peterest-db.fkffd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  client = MongoClient("mongodb://mongoadmin:secret@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false")
  db = client.get_database('Peterest_db')