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
        ctx.vectorText("Thank you for playing", 4, null, 100);
        ctx.vectorText(this.score, 3, null, 300);
    }





});