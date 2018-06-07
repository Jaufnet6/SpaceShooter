//Get color and call method to change theme
function changeColor(a){
    var newColor = a.value;
    localStorage.setItem("color", newColor);
    changeColorTheme();
}

//Change color theme according to localStorage
function changeColorTheme(){
    if (localStorage.getItem("color") == null){
        localStorage.setItem("color", "authentication/loginBlue.css");
    }

    var cssString = localStorage.getItem("color");
    cssString = cssString.replace("background", "login");
    cssString = cssString.replace("styles/", "");

    var cssLink = document.getElementById("colorCSS");
    cssLink.setAttribute("href", cssString);
    window.reload();
}