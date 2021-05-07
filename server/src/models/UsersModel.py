

class UsersModel:
  """
    `id`
    `email`
    `password`
    `isAdmin`
    `name`
    `location`
    `gender`
    `coverPic`
    `profilePic`
    `dateCreated`
    `dateLastLogin`
    `optionsId`
  """
    
  def __init__(self, nU):
    self.id = nU["id"]
    self.email = nU["email"]
    self.password = nU["password"]
    self.isAdmin = nU["isAdmin"]
    self.name = nU["name"]
    self.location = nU["location"]
    self.gender = nU["gender"]
    self.coverPic = nU["coverPic"]
    self.profilePic = nU["profilePic"]
    self.dateCreated = nU["dateCreated"]
    self.dateLastLogin = nU["dateLastLogin"]
    self.optionsId = nU["optionsId"]

  def serialize(self):
    out = {
      "id": self.id,
      "email": self.email,
      "password": self.password,
      "isAdmin": self.isAdmin,
      "name": self.name,
      "location": self.location,
      "gender": self.gender,
      "coverPic": self.coverPic,
      "profilePic": self.profilePic,
      "dateCreated": self.dateCreated,
      "dateLastLogin": self.dateLastLogin,
      "optionsId": self.optionsId,
    }
    return out

  def p(self):
    print(self.serialize())


if __name__ == "__main__":
  test = dict()
  test["id"] = 1
  test["email"] = "yael@yaelbrown.com"
  test["password"] = "yaelpass"
  test["isAdmin"] = False
  test["name"] = "Yael"
  test["location"] = "YaelVille, USA"
  test["gender"] = True
  test["coverPic"] = "yaelCover.jpg"
  test["profilePic"] = "yaelProfile.jpg"
  test["dateCreated"] = 123123123
  test["dateLastLogin"] = 321321321
  test["optionsId"] = 555555555

  tU = UsersModel(test)

  tU.p()

  print(type(tU.serialize()["email"]))