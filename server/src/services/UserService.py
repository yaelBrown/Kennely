import json
from flask_bcrypt import Bcrypt
import jwt
import datetime
import calendar
import time
import sys

from bson import ObjectId

from config.config_mysql import (cur, con)

class UserService: 

  def loginUser(self, email, password, remember):
    def updateLastLogin():
      try: 
        dll = calendar.timegm(time.gmtime())
        sql = "Update users set dateLastLogin = %s where email = %s"

        cur.execute(sql, (dll, email))
        con.commit()
      except Exception as e:
        print(e)
        return False

    try: 
      requestedUser = self.getUser(email)
      if requestedUser is None:
        raise RuntimeError("Cannot find user by email: " + email)
      hashedPw = Bcrypt.generate_password_hash(None, password, 12)

      if Bcrypt.check_password_hash(None, requestedUser["password"], password):
        if remember: 
          tokenData = {
            "email": email, 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=365)
          }
        else:   
          tokenData = {
            "email": email, 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
          }

        secret = "Ilovethosep3ts"
        token = jwt.encode(tokenData, secret)
        
        updateLastLogin()
        
        out = {
          "id": requestedUser["id"],
          "email": requestedUser["email"]
          }
        
        return {"token": token.decode("UTF-8"), "user": out}
      else: 
        raise Exception("Incorrect Password")
    except Exception as e: 
      print(e)
      return False

  def registerUser(self, newUser): 
    try: 
      sql = 'insert into users (email, password, isAdmin, name, location, gender, coverPic, profilePic, dateCreated, dateLastLogin) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
      print(newUser)
      cur.execute(sql, (
        newUser["email"],
        newUser["password"],
        newUser["isAdmin"],
        newUser["name"],
        newUser["location"],
        newUser["gender"],
        newUser["coverPic"],
        newUser["profilePic"],
        newUser["dateCreated"],
        newUser["dateLastLogin"],
      ))

      con.commit()
      return True
    
    except Exception as e: 
      print(e)
      return False

  def editUser(self, u):
    pass

  def deleteUser(self, u):
    try: 
      sql = 'delete from users where id = %d'
      cur.execute(sql, (u))
      con.commit()
    except Exception as e: 
      print(e)
      return False

  def getUser(self, uId, isLoggingIn="all"):
    try: 
      if isinstance(uId, int):
        if isLoggingIn == "all": 
          sql = "Select * from users where id = %d"
        elif isLoggingIn == "login":
          sql = "Select email, password where id = %d"
        elif isLoggingIn == "cache":
          sql = "Select name, profilePic, location where id = %d"
      elif isinstance(uId, str):
        sql = "Select id, email, password from users where email = %s"

      cur.execute(sql, (uId))
      con.commit()
      res = cur.fetchone()
      print(res)
      return res
    except Exception as e: 
      print(e)
      return False


  def getUsers(self, uIds):
    try: 
      if len(uIds) < 1:
        res = getUser(uIds)
      else: 
        sql = "Select name, profilePic, location where id = "
        for x in range(len(uIds)):
          if x == len(uIds):
            sql += "%d"
          else: 
            sql += "%d, "

        cur.execute(sql, tuple(uIds))
        con.commit()
        res = cur.fetchall()
        print(res)
      return res
    except Exception as e:
      print(e)
      return False

  def serialize(self, results):
    # return [json.dumps(u, default=json_util.default) for u in results]
    pass

if __name__ == "__main__":
  print("this is working")