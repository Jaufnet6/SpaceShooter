//verifies is user already signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.location = "../game.html";

    } else {
        // No user is signed in.
        document.getElementById("main_div_id").style.display = "block";
    }
});

//Login to site
function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        document.getElementById('createSuccess').style.display = 'block';
        document.getElementById('createSuccess').innerHTML = errorMessage;

    });

}

//show create form
function createAccount() {
    document.getElementById("main_div_id").style.display = "none";
    document.getElementById("createAccountDivId").style.display = "block";
    document.getElementById('createSuccess').style.display = 'none';
}

//show back login form
function backToSignIn() {
    document.getElementById("main_div_id").style.display = "block";
    document.getElementById("createAccountDivId").style.display = "none";
    document.getElementById('createSuccess').style.display = "none";
}

//add user inside cloud DB
function createUser() {
    var userEmailCreate = document.getElementById("emailCreation_field").value;
    var userPasswordCreate = document.getElementById("passwordCreation_field").value;
    var userPassword2Create = document.getElementById("passwordCreation2_field").value;

    if (userPasswordCreate == userPassword2Create) {

        firebase.auth().createUserWithEmailAndPassword(userEmailCreate, userPasswordCreate).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById('createSuccess').style.display = 'block';
            document.getElementById('createSuccess').innerHTML = errorMessage;

        });

    } else {
        document.getElementById('createSuccess').style.display = 'block';
        document.getElementById('createSuccess').innerHTML = 'Passwords don\'t match!';
    }
}
