var States = {
    NO_CHANGE: 0,
    MENU: 1,
    GAME: 2,
    END: 3
}



var Game = Class.extend({

    /**
     * Constructor
     */
    init: function() {


        // public important members used for update and rendering
        this.canvas = new Canvas(504, 600);

        this.input = new InputHandeler({
            left:     37,
            right:    39,
            spacebar: 32,
            enter:    13
        });

        // set stroke style to white, since canvas has black
        // bacground
        this.canvas.ctx.strokeStyle = "#fff";

        // init all the sprite
        var img = new Image();

        img.addEventListener("load", function() {
            alSprite = [
                [new Sprite(this, 0, 0, 22, 16), new Sprite(this, 0, 16, 22, 16)],
                [new Sprite(this, 22, 0, 16, 16), new Sprite(this, 22, 16, 16, 16)],
                [new Sprite(this, 38, 0, 24, 16), new Sprite(this, 38, 16, 24, 16)]
            ];
            taSprite = new Sprite(this, 62, 0, 22, 16);
            ciSprite = new Sprite(this, 84, 8, 36, 24);

        });

        img.src = "res/invaders.png";


        // declate variables used for managing states
        this.currentState = null;
        this.stateVars = {
            score: 0
        }
        this.nextState = States.MENU;
    },

    /**
     * Starts and runs the game
     */
    run: function() {
        var self = this;

        this.canvas.animate(function() {
            // change and initiate states when needed0
            if (self.nextState !== States.NO_CHANGE) {
                switch(self.nextState) {
                    case States.MENU:
                        self.currentState = new MenuState(self);
                        break;
                    case States.GAME:
                        self.currentState = new GameState(self);
                        break;
                    case States.END:
                        self.currentState = new EndState(self);
                        break;
                }
                self.nextState = States.NO_CHANGE;
            }

            // update and render active state

            self.currentState.handleInputs(self.input);
            self.currentState.update();
            self.currentState.render(self.canvas.ctx);
        });
    }


});