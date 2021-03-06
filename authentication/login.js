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
    //Get inputs from user
    var userUsername = document.getElementById("usernameCreation_Field").value;
    var userEmailCreate = document.getElementById("emailCreation_field").value;
    var userPasswordCreate = document.getElementById("passwordCreation_field").value;
    var userPassword2Create = document.getElementById("passwordCreation2_field").value;

    if (userPasswordCreate == userPassword2Create && userUsername.length > 0) {
        //If passwords match try to create user
        firebase.auth().createUserWithEmailAndPassword(userEmailCreate, userPasswordCreate).then(function(){
            //calls method to add elements to firebase
            var user = firebase.auth().currentUser;
            setUserData(user.uid, userUsername, userEmailCreate, "/images/default-user.png", 0);
        }).catch(function (error) {
            // Handle Errors here when creating account
            var errorMessage = error.message;
            document.getElementById('createSuccess').style.display = 'block';
            document.getElementById('createSuccess').innerHTML = errorMessage;
        });
        //Passwords don't match
    } else if (userUsername.length == 0) {
        document.getElementById('createSuccess').innerHTML = 'Username must be filled!';
        document.getElementById('createSuccess').style.display = 'block';
    } else {
        document.getElementById('createSuccess').style.display = 'block';
        document.getElementById('createSuccess').innerHTML = 'Passwords don\'t match!';
    }

}

var firebaseRef = firebase.database().ref();

//Add new user to database
function setUserData(userId, username, email, imageUrl, topScore) {
    firebaseRef.child("users").child(userId).set({
        username: username,
        email: email,
        profile_picture: imageUrl,
        topScore: topScore
    });
}
