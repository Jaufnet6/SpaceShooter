// etat de game over
var EndState = State.extend({


    init: function(game) {
        //constructeur
        this._super(game);

        // recupere le score du joueur
        this.score = game.stateVars.score;

        // musique specifique au game over un peu glauque parce qu'on est mort
        gameSound = document.getElementById("gameOver");
        gameSound.loop = true;
        gameSound.volume = .25;
        gameSound.load();
        gameSound.play();

    },


    // seul action possible permettant de recommencer une partie avec euh entereuh
    handleInputs: function(input) {

            if (input.isPressed("enter")) {
                // change the game state
                gameSound.pause();
                this.game.nextState = States.MENU;
            }
    },

    // genere le texte du game over

    render: function(ctx) {

        // NETOIE TOU MDR
        ctx.clearAll();

        if (gameOver == true){
            addScore(score);
            ctx.vectorText("Your score " + score, 3, null, 300);
            ctx.vectorText("Press enter to begin a new game", 2, null, 200);
            ctx.vectorText("Thank you for playing", 3, null, 100);

        }

    }
});