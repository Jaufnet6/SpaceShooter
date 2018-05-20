/*
state class, super class */
var State = Class.extend({
    
    init: function (game ) {
        this.game = game;
        
    },


/*

 React to pressed keys, called before the update  method
*/
    handleInputs: function(input) {
        return void 0;
    },


    /*

     Called when state is updated
     */
    update: function() {
        return void 0;
    },


    // render the state to canvas
    render: function(ctx) {
        return void 0;
    }
    
});