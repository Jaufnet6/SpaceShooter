function changeColor(a){
    var newColor = a.value;
    localStorage.setItem("color", newColor);
    changeColorTheme();
}

function changeColorTheme(){
    if (localStorage.getItem("color") == null){
        localStorage.setItem("color", "styles/backgroundBlue.css");
    }
    var cssLink = document.getElementById("colorCSS");
    cssLink.setAttribute("href", localStorage.getItem("color"));
    window.reload();
}