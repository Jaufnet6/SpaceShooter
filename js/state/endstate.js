var EndState = State.extend({


    /**
     * Constructor
     *
     * @param  {Game} game manager for the state
     */
    init: function(game) {
        this._super(game); // call super constructor

        this.score = game.stateVars.score;

        gameSound = document.getElementById("gameOver");
        gameSound.loop = true;
        gameSound.volume = .25;
        gameSound.load();
        gameSound.play();



    },



    handleInputs: function(input) {

            if (input.isPressed("enter")) {
                // change the game state
                gameSound.pause();
                this.game.nextState = States.MENU;
            }

    },


    render: function(ctx) {
        ctx.clearAll();

        if (gameOver == true){


            ctx.vectorText("Your score " + score, 3, null, 300);
            ctx.vectorText("Press enter to begin a new game", 2, null, 200);
            ctx.vectorText("Thank you for playing", 3, null, 100);

        }

    }





});