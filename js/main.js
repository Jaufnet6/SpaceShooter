

// etat du jeu
var States = {
    NO_CHANGE: 0,
    MENU: 1,
    GAME: 2,
    END: 3
}


var Game = Class.extend({

    // constructeur
    init: function() {


        //declaration du canvas
        this.canvas = new Canvas(504, 600);

        // declaration du input handeler
        this.input = new InputHandeler({
            left:     37,
            right:    39,
            spacebar: 32,
            enter:    13
        });

        // set stroke style to white, since canvas has black
        // bacground
        this.canvas.ctx.strokeStyle = "#fff";

        // initialise les sprites en chargeant une image
        var img = new Image();

        // donne la source de l'image
        img.src = "res/invaders.png";

        // quand l'image est chargee, associe les sprites aux parties de l'image
        img.addEventListener("load", function() {
            alSprite = [
                [new Sprite(this, 0, 0, 22, 16), new Sprite(this, 0, 16, 22, 16)],
                [new Sprite(this, 22, 0, 16, 16), new Sprite(this, 22, 16, 16, 16)],
                [new Sprite(this, 38, 0, 24, 16), new Sprite(this, 38, 16, 24, 16)]
            ];
            taSprite = new Sprite(this, 62, 0, 22, 16);
            ciSprite = new Sprite(this, 84, 8, 36, 24);

        });




        //declare l'etat courant et le score a 0
        this.currentState = null;
        this.stateVars = {
            score: 0
        }
        this.nextState = States.MENU;
    },


    run: function() {
        var self = this;

        this.canvas.animate(function() {

            //  permet de gerer l'etat du canvas (menu, game, game over)
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

            // appelle tout les states ainsi que leur methode
            self.currentState.handleInputs(self.input);
            self.currentState.update();
            self.currentState.render(self.canvas.ctx);
        });
    }


});