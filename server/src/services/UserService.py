import json
from flask_bcrypt import Bcrypt
from flask_jwt import jwt, jwt_required, current_identity
from datetime import datetime
import calendar
import time
import sys

from bson import ObjectId

from config.config_mysql import (cur, con)

class UserService: 

  def loginUser(self, email, password):
    
    def _updateLastLogin():
      try: 
        dll = int(datetime.now().timestamp()) # dll - date last loggedIn
        sql = "Update users set date_last_login = %s where email = %s"

        cur.execute(sql, (dll, email))
        con.commit()

      except Exception as e:
        print(e)
        return False

    try: 
      requestedUser = self.getUser(email)
      
      if requestedUser is None:
        raise Exception("Cannot find user by email: " + email)
      
      hashedPw = Bcrypt.generate_password_hash(None, password, 12)

      if Bcrypt.check_password_hash(None, requestedUser["password"], password):
        # secret = "Ilovethosep3ts"
        # token = jwt.jwt_encode_handler(requestedUser, secret)
        
        _updateLastLogin()
        
        out = {
          "id": requestedUser["id"],
          "email": requestedUser["email"]
        }
        
        return {"token": "token", "user": out, "msg": "ok"}
      else: 
        raise Exception("Incorrect Password")
    except Exception as e: 
      print({"msg": e})
      return {"msg": str(e)}


  def registerUser(self, newUser): 
    try: 
      sql = "insert into users (email, location, password, gender, is_admin, name, profile_pic, date_created, date_last_login) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
      
      # print(newUser)
      
      cur.execute(sql, (
        newUser["email"],
        newUser["location"],
        newUser["password"],
        newUser["gender"],
        newUser["is_admin"],
        newUser["name"],
        newUser["profile_pic"],
        newUser["date_created"],
        newUser["date_last_login"],
      ))
      
      con.commit()
      return True
    except Exception as e: 
      print(e)
      return str(e)

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
      
      return cur.fetchone()
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

      return cur.fetchall()
    except Exception as e:
      print(e)
      return False

  def serialize(self, results):
    # return [json.dumps(u, default=json_util.default) for u in results]
    pass

if __name__ == "__main__":
  print("this is working")