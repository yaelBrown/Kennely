import pymysql

class Config: 
  con = pymysql.Connect(
    host='localhost', 
    user='root', 
    password='petmeplz', 
    db='peterest_db', 
    charset='utf8', 
    cursorclass=pymysql.cursors.DictCursor, 
    port=3306)

  cur = con.cursor()