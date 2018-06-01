firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.location = "../game.html";

  } else {
    // No user is signed in.
    document.getElementById("main_div_id").style.display = "block";
  }
});


function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPassword = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error: " + errorMessage);

  });

}

function createAccount() {
  document.getElementById("main_div_id").style.display = "none";
  document.getElementById("createAccountDivId").style.display = "block";
}

function backToSignIn(){
  document.getElementById("main_div_id").style.display = "block";
  document.getElementById("createAccountDivId").style.display = "none";
}

function createUser(){
  var userEmailCreate = document.getElementById("emailCreation_field").value;
  var userPasswordCreate = document.getElementById("passwordCreation_field").value;
  var userPassword2Create = document.getElementById("passwordCreation2_field").value;


  if(userPasswordCreate == userPassword2Create){

    firebase.auth().createUserWithEmailAndPassword(userEmailCreate, userPasswordCreate).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);

    });

  } else {
    document.getElementById('createSuccess').innerHTML = 'Passwords don\'t match!';
    document.getElementById('createSuccess').style.color = '#fff';
    document.getElementById('createSuccess').style.background = '#bf3333';
    document.getElementById('createSuccess').style.borderRadius = '1em';
  }
}
