var
    /**
     * Game objects
     */
    display,
    frames,
    spFrame,
    lvFrame,
    alSprite,
    taSprite,
    ciSprite,
    aliens,
    dir,
    tank,
    bullets,
    cities,
    canvasWidth,
    canvasHeight;


var GameState = State.extend({



    init: function (game) {
        this._super(game);



        // score lives variables
        lives = 3;
        gameOver = false;
        score = 0;


        // store canvas dimensions for later use
        canvasWidth = game.canvas.ctx.width;
        canvasHeight = game.canvas.ctx.height;

        // set start settings
        frames  = 0;
        spFrame = 0;
        lvFrame = 60;

        dir = 1;
        // create the tank object
        tank = {
            sprite: taSprite,
            x: (canvasWidth - taSprite.w) / 2,
            y: canvasHeight - (30 + taSprite.h),
            visible:true
        };


        // initatie bullet array
        bullets = [];
        // create the cities object (and canvas)
        cities = {
            canvas: null,
            ctx: 	null,
            y: tank.y - (30 + ciSprite.h),
            h: ciSprite.h,
            /**
             * Create canvas and game graphic context
             */
            init: function() {
                // create canvas and grab 2d context
                this.canvas = document.createElement("canvas");
                this.canvas.width = canvasWidth;
                this.canvas.height = canvasHeight;
                this.ctx = this.canvas.getContext("2d");
                for (var i = 0; i < 4; i++) {
                    this.ctx.drawImage(ciSprite.img, ciSprite.x, ciSprite.y,
                        ciSprite.w, ciSprite.h,
                        68 + 111*i, 0, ciSprite.w, ciSprite.h);
                }
            },
            /**
             * Create damage effect on city-canvas
             *
             * @param  {number} x x-coordinate
             * @param  {number} y y-coordinate
             */
            generateDamage: function(x, y) {
                // round x, y position
                x = Math.floor(x/2) * 2;
                y = Math.floor(y/2) * 2;
                // draw dagame effect to canva
                this.ctx.clearRect(x-2, y-2, 4, 4);
                this.ctx.clearRect(x+2, y-4, 2, 4);
                this.ctx.clearRect(x+4, y, 2, 2);
                this.ctx.clearRect(x+2, y+2, 2, 2);
                this.ctx.clearRect(x-4, y+2, 2, 2);
                this.ctx.clearRect(x-6, y, 2, 2);
                this.ctx.clearRect(x-4, y-4, 2, 2);
                this.ctx.clearRect(x-2, y-6, 2, 2);
            },
            /**
             * Check if pixel at (x, y) is opaque
             *
             * @param  {number} x x-coordinate
             * @param  {number} y y-coordinate
             * @return {bool}     boolean value if pixel opaque
             */
            hits: function(x, y) {
                // transform y value to local coordinate system
                y -= this.y;
                // get imagedata and check if opaque
                var data = this.ctx.getImageData(x, y, 1, 1);
                if (data.data[3] !== 0) {
                    this.generateDamage(x, y);
                    return true;
                }
                return false;
            }
        };
        cities.init(); // initiate the cities
        // create and populate alien array
        aliens = [];
        var rows = [1, 0, 0, 2, 2];
        for (var i = 0, len = rows.length; i < len; i++) {
            for (var j = 0; j < 10; j++) {
                var a = rows[i];
                // create right offseted alien and push to alien
                // array
                aliens.push({
                    sprite: alSprite[a],
                    x: 30 + j*30 + [0, 4, 0][a],
                    y: 30 + i*30,
                    w: alSprite[a][0].w,
                    h: alSprite[a][0].h
                });
            }
        }
    },


    /**
     * @override State.handleInputs
     *
     * @param  {InputHandeler} input keeps track of all pressed keys
     */
    handleInputs: function(input) {
        // only update tank orientation and velocity if it's visible
        if (!tank.visible) {
            if (input.isPressed("spacebar")) {
                // change state if game over
                if (this.gameOver) {
                    this.game.nextState = States.END;
                    this.game.stateVars.score = this.score;
                    return;
                }
                this.tank.visible = true;
            }
            return;
        }
        // update tank position depending on pressed keys
        if (input.isDown("left")) { // Left
            tank.x -= 4;
        }
        if (input.isDown("right")) { // Right
            tank.x += 4;
        }


        // append new bullet to the bullet array if spacebar is
        // pressed
        if (input.isPressed("spacebar")) { // Space
            bullets.push(new Bullet(tank.x + 10, tank.y, -8, 2, 6, "#fff"));
        }
        

    },


    /**
     * Wrapper around the game loop function, updates and renders
     * the game
     */
    run: function() {
        var loop = function() {
            update();
            render();
            window.requestAnimationFrame(loop, display.canvas);
        };
        window.requestAnimationFrame(loop, display.canvas);
    },



    /**
     * Update the game logic
     */
    update: function() {
        // update the frame count
        frames++;

        // keep the tank sprite inside of the canvas
        tank.x = Math.max(Math.min(tank.x, canvasWidth - (30 + taSprite.w)), 30);

        // update all bullets position and checks
        for (var i = 0, nbBullet = bullets.length; i < nbBullet; i++) {
            var b = bullets[i];
            b.update();

            // remove bullets outside of the canvas
            if (b.y + b.height < 0 || b.y > canvasHeight) {
                bullets.splice(i, 1);
                i--;
                nbBullet--;
                continue;
            }
            // check if bullet hits any city
            var h2 = b.height * 0.5; // half hight is used for
                                     // simplicity
            if (cities.y < b.y+h2 && b.y+h2 < cities.y + cities.h) {
                if (cities.hits(b.x, b.y+h2)) {
                    bullets.splice(i, 1);
                    i--;
                    nbBullet--;
                    continue;
                }
            }


            //if tank get hit by bullet
            if(AABBIntersect(b.x, b.y, b.width, b.height, tank.x, tank.y, tank.w,tank.h )){

                this.lives--;
                if(this.lives <=0){
                    this.gameOver = true;

                }
                tank.x =  (canvasWidth- taSprite.w) / 2;
                tank.y = canvasHeight - (30 + taSprite.h)
                this.tank.visible = false

            }

            // check if bullet hit any aliens
            for (var j = 0, nbAlien = aliens.length; j < nbAlien; j++) {
                var a = aliens[j];
                if (AABBIntersect(b.x, b.y, b.width, b.height, a.x, a.y, a.w, a.h)) {
                    aliens.splice(j, 1);
                    j--;
                    nbAlien--;
                    bullets.splice(i, 1);
                    i--;
                    nbBullet--;




                    score += 51-nbAlien;
                    // increase the movement frequence of the aliens
                    // when there are less of them
                    switch (nbAlien) {

                        case 45: {
                            lvFrame = 50;

                            break;
                        }
                        case 40: {
                            lvFrame = 40;

                            break;
                        }
                        case 30: {
                            lvFrame = 30;

                            break;
                        }
                        case 20: {
                            lvFrame = 20;

                            break;
                        }
                        case 10: {
                            lvFrame = 15;

                            break;
                        }
                        case 5: {
                            lvFrame = 6;

                            break;
                        }
                    }
                }
            }
        }
        // makes the alien shoot in an random fashion
        if (Math.random() < 0.03 && aliens.length > 0) {
            var a = aliens[Math.round(Math.random() * (aliens.length - 1))];
            // iterate through aliens and check collision to make
            // sure only shoot from front line
            for (var i = 0, len = aliens.length; i < len; i++) {
                var b = aliens[i];
                if (AABBIntersect(a.x, a.y, a.w, 100, b.x, b.y, b.w, b.h)) {
                    a = b;
                }
            }
            // create and append new bullet
            bullets.push(new Bullet(a.x + a.w*0.5, a.y + a.h, 4, 2, 4, "#fff"));
        }
        // update the aliens at the current movement frequence
        if (frames % lvFrame === 0) {
            spFrame = (spFrame + 1) % 2;
            var _max = 0, _min = canvasWidth;
            // iterate through aliens and update postition
            for (var i = 0, len = aliens.length; i < len; i++) {
                var a = aliens[i];
                a.x += 30 * dir;
                // find min/max values of all aliens for direction
                // change test
                _max = Math.max(_max, a.x + a.w);
                _min = Math.min(_min, a.x);
            }
            // check if aliens should move down and change direction
            if (_max > canvasWidth - 30 || _min < 30) {
                // mirror direction and update position
                dir *= -1;
                for (var i = 0, len = aliens.length; i < len; i++) {
                    aliens[i].x += 30 * dir;
                    aliens[i].y += 30;
                }
            }
        }
    },


    /**
     * Render the game state to the canvas
     */
    render: function (contx) {


        contx.clearAll();// clear the game canvas
        // draw all aliens
        for (var i = 0, len = aliens.length; i < len; i++) {
            var a = aliens[i];
            contx.drawSprite(a.sprite[spFrame], a.x, a.y);
        }

        contx.vectorText(score.toString(), 3, 35, 10);
        for (var i = 0; i < lives; i++) {
            contx.drawSprite(tank.sprite, 400+25*i, 10);
        }
        // save context and draw bullet then restore
        contx.save();
        for (var i = 0, len = bullets.length; i < len; i++) {
            contx.drawBullet(bullets[i]);
        }
        contx.restore();

        // draw the city graphics to the canvas
        contx.drawImage(cities.canvas, 0, cities.y);
        // draw the tank sprite
        contx.drawSprite(tank.sprite, tank.x, tank.y);
    }


});






