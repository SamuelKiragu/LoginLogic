/************************
*************************
function that ensures Password meets requirements.
Here is a specification of the reuquirements

1. password must have a number ie: 1-9
2. password must have a small letter ie: a-z
3. password must have a capital letter ie: A-Z
4. password must have a special character e.g: @

_________________________________________________

EXAMPLE:

 isPswdRqrmntMt("password"); >> false //only small characters
 isPswdRqrmntMt("1234"); >> false //only numbers
 isPswdRqrmntMt("ABCD"); >> false //only capital letters
 isPswdRqrmntMt("@#$"); >> false //only special characters
 isPswdRqrmntMt("pasWO12@"); >> true //all conditions met
_________________________________________________

************************
************************
************************/

function isPswdRqrmntMt(password){

  //requirement ASCII range
  let rqmnts = new Array(
    {max: 57, min: 48}, //range for numbers
    {max: 122, min: 97}, //range for small letters
    {max: 90, min: 65}, //range for big letters
    {max: 47, min: 33}, //characters
    {max: 64,min: 58}//exeptional characters
  );

  let CtnsNumb = false;
  let CtnsSmLt = false;
  let CtnsBgLt = false;
  let CtnsSpChr = false;

  //iterates over the password checking if each requirement is met.
  for(i = 0; i < password.length; i++){
    //check if number
    if(password.charCodeAt([i]) >= rqmnts[0].min && password.charCodeAt([i]) <= rqmnts[0].max){
      if(!CtnsNumb){
        CtnsNumb = true;
      }
    }
    //check if small letter
    else if (password.charCodeAt([i]) >= rqmnts[1].min && password.charCodeAt([i]) <= rqmnts[1].max){
      if(!CtnsSmLt){
        CtnsSmLt = true;
      }
    }
    //check if capital letter
    else if (password.charCodeAt([i]) >= rqmnts[2].min && password.charCodeAt([i]) <= rqmnts[2].max){
      if(!CtnsBgLt){
        CtnsBgLt = true;
      }
    }
    //check if special character
    else if (password.charCodeAt([i]) >= rqmnts[3].min && password.charCodeAt([i]) <= rqmnts[3].max)
    {
      if(!CtnsSpChr){
        CtnsSpChr = true;
      }
    }
    //alternative special characters that can be accepted
    else if (password.charCodeAt([i]) >= rqmnts[4].min && password.charCodeAt([i]) <= rqmnts[4].max){
      if(!CtnsSpChr){
        CtnsSpChr = true;
      }
    }
  }
    //checks if all requirements are met
    if(CtnsNumb && CtnsSmLt && CtnsBgLt && CtnsSpChr){
      return true;
    }else{
      return false;
    }
}

/***********************************
************************************
************************************

This method checks whether a password meets the length requirements
ie, if password should be at least 8 characters long,
the function returns false if it is seven characters long

______________________________________________________

EXAMPLE:

isPasswdLong("password", 5); >> true
isPasswdLong("password", 12); >> false
_______________________________________________________

***********************************
***********************************
************************************/
function isPasswdLong(password, requiredLenghth = 0){
  if(password.length >= requiredLenghth){
    return true;
  }
  return false;
}


/*********************************
**********************************

this function checks whether the domain name of the email is supported
The supported email domains are stored and used to check incoming emails

______________________________________________________

EXAMPLE:
isEmailValid("email@asdf.com") >> false //the domain is not supported
isEmailValid("email@gmail.com") >> true //the domain is supported
______________________________________________________

*********************************
***********************************/
function isEmailValid(emailStr){
  //known domains for emails
  let domainArr = new Array("gmail","yahoo");

  let init = emailStr.indexOf("@");
  let last = emailStr.indexOf(".");

  //eD stands for email Domain
  let eD = emailStr.slice(init+1,last);

  //checks if domain is included in the Array
  if (domainArr.includes(eD)){
    return true;
  }
  else{
    return false;
  }
}


/****************************************
*****************************************
this function checks if the two passwords entered match
_________________________________________________

EXAMPLE:
confirmPasswords("password","pswrd"); >> false
confirmPasswords("password","password"); >> true



*****************************************
*****************************************/
function confirmPasswords(regpassword,confirmpassword){
  if(regpassword == confirmpassword){
    return true;
  }
  return false;
}


// test this methods
var testPassword,testEmail;


// this is a test for the password requirements
console.log("TEST PASSWORD REQUIRENT")

testPassword = "password";
console.log(`Password entered: ${testPassword} \nResults: ${isPswdRqrmntMt(testPassword)}\n`);

testPassword = "1234";
console.log(`Password entered: ${testPassword} \nResults: ${isPswdRqrmntMt(testPassword)}\n`);

testPassword = "ABCD";
console.log(`Password entered: ${testPassword} \nResults: ${isPswdRqrmntMt(testPassword)}\n`);

testPassword = "@#$";
console.log(`Password entered: ${testPassword} \nResults: ${isPswdRqrmntMt(testPassword)}\n`);

testPassword = "pasWO12@";
console.log(`Password entered: ${testPassword} \nResults: ${isPswdRqrmntMt(testPassword)}\n`);




// this is a test for the password length
console.log("TEST PASSWORD LENGTH");

testPassword = "password";
console.log(`Password entered: ${testPassword} \nResults: ${isPasswdLong(testPassword, 5)}\n`);


testPassword = "password";
console.log(`Password entered: ${testPassword} \nResults: ${isPasswdLong(testPassword, 12)}\n`);



// this is a test for the email validity
testEmail = "email@asdf.com";
console.log(`Email entered: ${testEmail} \nResults: ${isPasswdLong(testEmail, 5)}\n`);

testEmail = "email@gmail.com";
console.log(`Email entered: ${testEmail} \nResults: ${isPasswdLong(testEmail, 5)}\n`);
