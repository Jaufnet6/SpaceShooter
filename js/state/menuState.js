// menu avant le jeu,
var MenuState = State.extend({

    init: function(game) {
        //constructeur
        this._super(game);

    },

    // gere l'action utilisateur
    handleInputs: function(input) {
        if (input.isPressed("spacebar")) {
            this.game.nextState = States.GAME;
        }
    },

    // ecris dans le canvas
    render: function (ctx) {

        ctx.clearAll();

        ctx.vectorText("Spaceshooters", 6, null,180)
        ctx.vectorText("push space to play", 2, null, 260);
        ctx.vectorText("game developed by ", 1 , null, 300);
        ctx.vectorText("Midly Intersting software", 1 , null, 340);


    }


    });