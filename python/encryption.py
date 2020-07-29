# this module allows secure user authentication using encrption
# it is important to note this works for flask

#imports for file manipulation
from werkzeug.utils import secure_filename

#class for uploading new users
class User:
    def __init__(self,email,password):
        self.email = email
        self.password = sha256_crypt.hash(password)

    def userAuth(db,tableName,entrdEmail,entrdPswd):
        # extract hashed email from database
        actualPassword = db.execute(f"SELECT password FROM {tableName} WHERE email = :email",{"email":enteredEmail}).first()

        # check if the two passwords match
        if actualPassword != None:
            return sha256_crypt.verify(entrdPswd,actualPassword[0])
        return False
