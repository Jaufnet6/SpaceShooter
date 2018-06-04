function changeColor(a){
    var newColor = a.value;
    localStorage.setItem("color", newColor);
    changeColorTheme();
}

function changeColorTheme(){
    var cssLink = document.getElementById("colorCSS");
    cssLink.setAttribute("href", localStorage.getItem("color"));
    window.reload();
}