// super class pour definir les fonctions des etat
var State = Class.extend({
    
    init: function (game ) {
        this.game = game;
        
    },


    // retourne 0 car définie plus tard

    handleInputs: function(input) {
        return void 0;
    },



    update: function() {
        return void 0;
    },

    render: function(ctx) {
        return void 0;
    }
    
});