var EndState = State.extend({


    /**
     * Constructor
     *
     * @param  {Game} game manager for the state
     */
    init: function(game) {
        this._super(game); // call super constructor

        this.score = game.stateVars.score;


    },



    handleInputs: function(input) {
        if (this.hasEnterName) {
            if (input.isPressed("spacebar")) {
                // change the game state
                this.game.nextState = States.MENU;
            }
        }
    },


    render: function(ctx) {
        ctx.clearAll();

        if (gameOver == true){


            ctx.vectorText("Your score " + score, 3, null, 300);
            ctx.vectorText("Press spacebar to begin a new game", 2, null, 200);
            ctx.vectorText("Thank you for playing" + score, 3, null, 100);

        }

    }





});