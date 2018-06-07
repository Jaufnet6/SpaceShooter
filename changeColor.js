// Get new color and call method to change it
function changeColor(a){
    var newColor = a.value;
    localStorage.setItem("color", newColor);
    changeColorTheme();
}

//Change page color style according to localStorage
function changeColorTheme(){
    if (localStorage.getItem("color") == null){
        localStorage.setItem("color", "styles/backgroundBlue.css");
    }
    var cssLink = document.getElementById("colorCSS");
    cssLink.setAttribute("href", localStorage.getItem("color"));
    window.reload();
}