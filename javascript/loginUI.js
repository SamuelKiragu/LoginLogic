document.addEventListener('DOMContentLoaded',function(){
  let authForm;
  if(document.querySelector('#register') != null){
    //for register form
    authForm = document.querySelector('#register');
    authForm.onclick = function(){
        //validateForm
        validateForm(document.forms["register"]);
    };
  }
});

//validateForm function
function validateForm(form,errorContainer){
  let authBtn = document.querySelector('#register');

  let i1 = form["email"];
  let i2 = form["password"];

  //means that the form being validated is a registration form and a login form if otherwise
  if(form["confirmpassword"] != null ){
    let i3 = form["confirmpassword"];
    register(i1,i2,i3);
  }
  else{
    login(i1,i2);
  }
}

//displayError function
function displayError(errorCont,errorMessage){
  // this needs thorough looking into
  errorCont.innerHTML=`<p id="password-match-error"><img id="error-icon" src="static/icons/erroricon.png">${errorMessage}</p>`;
  errorCont.style.display = "block";
}

//hideError function
function hideError(counter,errorCont,t){
  if(counter == 4){
    clearInterval(t);
    errorCont.style.display = "none";
    counter == 0;
  }
}

//dataValidation function
function dataValidation(xhttpObj){
  switch (xhttpObj.readyState) {
    case 4:
      if(xhttpObj.status == 200){
        //redirect to home
        if(xhttpObj.responseText == "success"){
          window.location.replace("/");
        }
        else{
          notificationTimer(xhttpObj.responseText);
        }
      }
      break;
  }
}


//times the notification duration using counter
function notificationTimer(text){
  let counter = 0;

  //the error container
  let errorContainer = document.querySelector('#error-div');

  var t = setInterval(function(){
    displayError(errorContainer,text);
    counter++;
    hideError(counter,errorContainer,t);
  },500);
}

function httpPostRequest(destination,value1,value2){
  //variable declaration
  let xhttp;

  // initializing the xhttp object depending on the browser
  // compatibility
  if(window.XMLHttpRequest){
    xhttp = new XMLHttpRequest();
  }
  else{
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // opening a post request
  xhttp.open("POST", destination,true)
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`email=${value1}&password=${value2}`);

  xhttp.onreadystatechange = function(){
    dataValidation(xhttp);
  };
}


//function for registering
function register(userField,passwordField,confirmPasswordField){
  //check whether they are blank
  if(
    (userField.value == null||passwordField.value == null||confirmPasswordField.value == null)
    ||
    (userField.value == ""||passwordField.value == ""||confirmPasswordField.value == "")
  ){
    notificationTimer(errorContainer,"Fill in all input fields");
  }
  else{
    if(confirmPasswordField.value != null){
      //first validate the authenticity of the email
      if(isEmailValid(userField.value)){
        if(validatePassword(passwordField.value, confirmPasswordField.value)){
          // sends the request to the server
          httpPostRequest("/Register",userField.value,passwordField.value)
        }
        else{
          notificationTimer("passwords do not match");
          //clear password and confirmpassword
          passwordField.value = '';
          confirmPasswordField.value = '';
        }
      }
      else{
        //clear email input field
        notificationTimer("Invalid email");
        userField.value = '';
      }
    }
  }
}


function login(usrField,pswdField){
  //check whether they are blank
  if((usrField.value == null||pswdField.value == null) || (usrField.value == ""||pswdField.value == "")){
    notificationTimer("Fill in all input fields");
  }
  else{
    if(isEmailValid(usrField.value)){
      // sends a request to the server
      httpPostRequest("/login",usrField.value,pswdField.value);
    }else{
      notificationTimer("Invalid email");
      //clear email input field
      usrField.value = '';
    }
  }
}
