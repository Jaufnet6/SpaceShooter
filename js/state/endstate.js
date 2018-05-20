var EndState = State.extend({


    /**
     * Constructor
     *
     * @param  {Game} game manager for the state
     */
    init: function(game) {
        this._super(game); // call super constructor

        this.hasEnterName = false; // internal stage flag
        this.nick = "no name";
        this.score = game.stateVars.score;

    }



    
});