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

    switch (newColor) {

        case "styles/backgroundGreen.css" :
            // change les couleur si vert
            cssLink.replaceWith('<link href="styles/backgroundGreen.css" type="text/css" rel="stylesheet">');
            break;


        case  "styles/backgroundGrey.css" :
            //change les couleurs si gris

            cssLink.replaceWith('<link href="styles/backgroundGrey.css" type="text/css" rel="stylesheet">');

            break;

        case "styles/backgroundBlue.css" :
            // change couleur bleu
            cssLink.replaceWith('<link href="styles/backgroundBlue.css" type="text/css" rel="stylesheet">');
            break;
        default:
            cssLink.replaceWith('<link href="styles/backgroundBlue.css" type="text/css" rel="stylesheet">');
            break;

    }


}