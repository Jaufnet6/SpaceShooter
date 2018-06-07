// class objet permettant de gere les actions de l'utilisateur

var InputHandeler = Class.extend({

    //constructeur
    init: function(keys) {

        this.keys = {};
        this.down = {};
        this.pressed = {};

        for (key in keys) {
            var code = keys[key];

            this.keys[code] = key;
            this.down[key] = false;
            this.pressed[key] = false;
        }

        var self = this;

        // eventListener determinant si la touche est pressee
        document.addEventListener("keydown", function(evt) {
            if (self.keys[evt.keyCode]) {

                self.down[self.keys[evt.keyCode]] = true;
            }
        });
        // eventListener determinant si la touche est levee
        document.addEventListener("keyup", function(evt) {
            if (self.keys[evt.keyCode]) {

                self.down[self.keys[evt.keyCode]] = false;
                self.pressed[self.keys[evt.keyCode]] = false;
            }
        });
    },

    // methode pour savoir si la touche est appuyee et maintenue
    isDown: function(key) {
        return this.down[key];
    },

    // permet de retourner un boolean pour determiner si une touche a ete pressee
    isPressed: function(key) {
        if (this.pressed[key]) {
            return false;
        } else if (this.down[key]) {
            return this.pressed[key] = true;
        }
        return false;
    }
});