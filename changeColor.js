function changeColor(a){
    var newColor = a.value;
    alert("new Color: "+ newColor);
    getLocalStorageColor(newColor);
    localStorage.setItem("color", value);
}

function getLocalStorageColor(newColor){
    var oldColor = localStorage.getItem("color");
    alert("OldColor:" + oldColor);
    var cssLink = $('link[href*=oldColor]');

    cssLink.replaceWith('<link href=newColor type="text/css" rel="stylesheet">');
}