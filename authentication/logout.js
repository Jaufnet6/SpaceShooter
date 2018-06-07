//Logout function
function logout() {
    firebase.auth().signOut().then(function () {
        //Success
        document.location = "../index.html";
    }).catch(function (error) {
        //error login out
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });
}