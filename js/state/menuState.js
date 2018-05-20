var MenuState = State.extend({

    init: function(game) {
        this._super(game); // call super construtor

        // store canvas dimensions for later use
        this.canvasWidth = game.canvas.ctx.width;
        this.canvasHeight = game.canvas.ctx.height;
    },

    update: function() {

    },


    handleInputs: function(input) {
        if (input.isPressed("spacebar")) {
            this.game.nextState = States.GAME;
        }
    },

    render: function (ctx) {

        ctx.clearAll();

        ctx.vectorText("Spaceshooters", 6, null,180)
        ctx.vectorText("push space to play", 2, null, 260);

    }


    });