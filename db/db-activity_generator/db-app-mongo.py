import sys
import requests
import datetime
import time
import json
import os
import random
import math
from pymongo import MongoClient

# 1. vars 
MONGO_URI = "mongodb://mongoadmin:secret@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false"
API_URI = "http://localhost:5000/api"
DOG_API = "https://api.thedogapi.com/v1"
CAT_API = "https://api.thecatapi.com/v1"
USER_API = "https://randomuser.me/api"
TASKS = []
NUM_USERS = 0
NUM_PETS = 0

# mongo connection
client = MongoClient(MONGO_URI)
db = client.get_database('Peterest_db')

# 2. caches
userCache = []

# 3. api methods
def getOneHuman():
  return requests.get(USER_API).json()['results'][0]

def getOneDog(): 
  return requests.get(DOG_API + '/images/search').json()[0]["url"]

def getOneCat():
  return requests.get(CAT_API + '/images/search').json()[0]

def getCaption():
  return requests.get("https://baconipsum.com/api/?type=all-meat&sentences=1").json()[0]

def addRequestedHumans(numU):
  msg = "Creating " + numU + " users"
  l(msg)
  
  n = int(numU)
  cnt = 1
  while n != 0:
    l("generating user: " + str(cnt))
    
    temp = getOneHuman()

    u = {
      "email": temp['email'],
      "name": temp['name']['first'] + " " + temp['name']['last'],
      "location": temp['location']['city'] + ", " + temp['location']['country'],
      "password": temp['login']['password'],
      "profilePic": temp['picture']['medium'],
      "isAdmin": False
    }

    if temp['gender'] == "male":
      u['gender'] = True
    else: 
      u['gender'] = False

    l(str(u))
    res = requests.post(API_URI + "/users/register", json=u)
    if res.status_code == 200:
      msg = "Successfully Created user: " + str(cnt)  
      l(msg)
      userToCache(u)
    else: 
      l(str(res.status_code))
      msg = "Error Creating user: " + str(cnt)
      l(msg)
      # l(json.dumps(json.loads(res.text), sort_keys=True, indent=2, separators=(",", ": ")))
    
    cnt = cnt + 1
    n = n - 1

  l("Finished creating users", True)

def createPost(uId, postType):
  """
  {
    "authorId": "606e46be95860b96236a30c8",
    "caption": "1st post",
    "contentSrc": "",
    "postType": "text",
    "petsTagged": []
  }
  """
  newPost = {
    "authorId": str(uId),
    "caption": getCaption(),
    "postType": "photo" if postType is "photo" else "text",
    "petsTagged": [] 
  }
  newPost["contentSrc"] = getOneDog() if newPost["postType"] != "text" else ""

  res = requests.post(API_URI + "/posts/post", json=newPost)
  if res.status_code == 200:
    msg = "Successfully created " + postType + " post with caption = " + newPost["caption"]
    l(msg)
  else: 
    l(str(res.status_code))
    msg = "Error Creating Post"
    l(msg)

def addRequestedPets(numP):
  l("Adding " + numP + " pets!")


# 4. cache methods
def userToCache(user):
  return userCache.append(user)

def populateCache():
  l("Populating cache....", True)
  l(str(len(userCache)) + " users currently")

  all_users = db.users.find()
  for u in all_users:
    userCache.append(u)

  msg = str(len(userCache)) + " users currently"
  l(msg)
  l("", True)
  return len(userCache)


# 5. db methods 
def saveUser(): 
  pass

def savePet():
  pass

def getUsers():
  pass

def getPets():
  pass

def checkForUsers():
  pass


# 6. simulation methods
def l(s,p=False):
  ts = datetime.datetime.now().strftime("[ %H:%M:%S %m.%d.%y ]")
  if p == False:
    print(ts + " : " + s)
  else: 
    print(ts + " : ")
    print(ts + " : " + s)
    print(ts + " : ")

def sim():
  l("Running activity simulator", True)
  
  cnt = 1
  while True: 
    l("Post by user # " + str(cnt))

    randy = math.floor(random.random() * 10) % 2 == 0
    randyUser = random.choice(userCache)["_id"]
    postType = ""
    if randy == True: 
      postType = "text"
    else: 
      postType = "photo"
    createPost(randyUser, postType)
    
    cnt += 1
    time.sleep(3)


# 7. arg parser
def argParser():
  args = sys.argv  
  del args[0]

  if len(args) == 0:
    l("No arguments detected... Running sim")
    sim()

  else: 
    for t in args:
      temp = t.split("=")
      TASKS.append(temp)

      if temp[0] == "--users":
        l("Add Users: " + temp[1])
        addRequestedHumans(temp[1])

      if temp[0] == "--pets":
        l("Add Pets: " + temp[1])
        addRequestedPets(temp[1])

      if temp[0] == "--sim":
        l("Running Sim")
        sim()


# 8. main
def figlet():
  os.system("figlet -c Peterest Data Generator")

def main():
  figlet() # comment this out if you are on windows/dont have figlet installed
  l("Peterest Data Generator", True)
  l("Populating user cache")
  populateCache()
  l("Determining arguments")
  argParser()


if "__main__" == __name__: 
  main()

