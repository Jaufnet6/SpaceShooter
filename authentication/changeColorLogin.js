function changeColor(a){
    var newColor = a.value;
    localStorage.setItem("color", newColor);
    changeColorTheme();
}

function changeColorTheme(){
    if (localStorage.getItem("color") == null){
        localStorage.setItem("color", "authentication/loginBlue.css");
    }

    var cssString = localStorage.getItem("color");
    cssString = cssString.replace("background", "login");
    cssString = cssString.replace("styles/", "");
    alert(cssString);

    var cssLink = document.getElementById("colorCSS");
    cssLink.setAttribute("href", cssString);
    window.reload();
}