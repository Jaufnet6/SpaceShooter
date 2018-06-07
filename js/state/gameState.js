var
 //Variables
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

;

var GameState = State.extend({

    //initialise le score et les vies pour demarrer le jeu
    init: function (game) {
        this._super(game);
        lives = 3;
        gameOver = false;
        score = 0;
        lvl = 1;

        //Son de depart pour le jeu
        gameSound = document.getElementById("gameBackground");
        gameSound.loop = true;
        gameSound.volume = .25;
        gameSound.load();
        gameSound.play();

        //Son pour shooter
        shoot = new SoundPool(10);
        shoot.init("shoot");

        //son lors de l'explosion
        explosion = new SoundPool(20);
        explosion.init("explosion");

        //son lorsque'un ennemie est tue
        killed = new SoundPool(10);
        killed.init("invaderKilled");

        // dimensions du canevas
        canvasWidth = game.canvas.ctx.width;
        canvasHeight = game.canvas.ctx.height;

        // Vitesses de base
        frames  = 0;
        spFrame = 0;
        lvFrame = 60;

        dir = 1;

        // Initalise le tank
        tank = {
            sprite: taSprite,
            x: (canvasWidth - taSprite.w) / 2,
            y: canvasHeight - (30 + taSprite.h),
            visible:false
        };

        // initialise un tableau de boules
        bullets = [];
        // creation des villes
        cities = {
            canvas: null,
            ctx: 	null,
            y: tank.y - (30 + ciSprite.h),
            h: ciSprite.h,

            //Creation du canevas
            init: function() {
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

            // Affectation des villes
            // pour chaque position on va retirer des pixels
            generateDamage: function(x, y) {
                // round x, y position
                x = Math.floor(x/2) * 2;
                y = Math.floor(y/2) * 2;
                // ClearRect permet d'effacer des pixels
                this.ctx.clearRect(x-2, y-2, 4, 4);
                this.ctx.clearRect(x+2, y-4, 2, 4);
                this.ctx.clearRect(x+4, y, 2, 2);
                this.ctx.clearRect(x+2, y+2, 2, 2);
                this.ctx.clearRect(x-4, y+2, 2, 2);
                this.ctx.clearRect(x-6, y, 2, 2);
                this.ctx.clearRect(x-4, y-4, 2, 2);
                this.ctx.clearRect(x-2, y-6, 2, 2);
            },

            // Controle si le pxel a deja ete touche
            hits: function(x, y) {

                y -= this.y;
                // Verifie si le pixel est opaque
                var data = this.ctx.getImageData(x, y, 1, 1);
                if (data.data[3] !== 0) {
                    // Si opaque, genere des dommages sur la cite
                    this.generateDamage(x, y);
                    return true;
                }
                return false;
            }
        };

       //Initialise les villes
        cities.init();

        // Cree plusieurs aliens dans un tableau
        aliens = [];
        var rows = [1, 0, 0, 2, 2];
        for (var i = 0, len = rows.length; i < len; i++) {
            for (var j = 0; j < 10; j++) {
                var a = rows[i];

                // Affect chaque sprite à l'alien
                // Et les pousses un apres l'autre
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

    // Gestion des touches clavier : barre d'espace, droit, gauche
    handleInputs: function(input) {

        //Si le tank n'est pas visible
        if (!tank.visible) {
            // et que la barre d'espace est pressee
            if (input.isPressed("spacebar")) {
               // Check si le jeu doit s'arreter
                // arrete la musique et change d'état
                if (gameOver) {
                    gameSound.pause();
                    game.nextState = States.END;
                    game.stateVars.score = this.score;
                    return;
                }
                // le tank est mis a visible
                tank.visible = true;
            }
            return;
        }

        // Direction du tank
        if (input.isDown("left")) {
            tank.x -= 4;
        }
        // Direction du tank
        if (input.isDown("right")) {
            tank.x += 4;
        }

        // Permet de creer une ball et la tire
        // Quand on appuie sur la touche espace
        if (input.isPressed("spacebar")) {
            bullets.push(new Bullet(tank.x + 10, tank.y, -8, 2, 6, "#fff"));
            shoot.get();
        }
    },


    // Met à jour la logique du jeu
    update: function() {

        //Augmente les frames à chaque mise a jour
        frames++;

        // Bloque le tank a l'intérieur du canevas
        tank.x = Math.max(Math.min(tank.x, canvasWidth - (30 + taSprite.w)), 30);

        // met a jour toutes les balles
        // et verifie la logique des balles
        for (var i = 0, nbBullet = bullets.length; i < nbBullet; i++) {
            var b = bullets[i];
            b.update();

            // efface les balles
            if (b.y + b.height < 0 || b.y > canvasHeight) {
                bullets.splice(i, 1);
                i--;
                nbBullet--;
                continue;
            }

            //controle si les balles ont touche les cites
            var h2 = b.height * 0.5;


            // Detruit les balles quand une cite est touchee
            if (cities.y < b.y+h2 && b.y+h2 < cities.y + cities.h) {
                if (cities.hits(b.x, b.y+h2)) {
                    bullets.splice(i, 1);
                    i--;
                    nbBullet--;
                    continue;
                }
            }

            //si le tank est visible
            if (tank.visible == true) {
                // Si le tank est heurte par une balle
                if (touche(b.x, b.y, b.width, b.height, tank.x, tank.y, taSprite.w, taSprite.h)) {

                    //Efface la balle
                    bullets.splice(i, 1);
                    nbBullet--;

                    //reduit le nombre de vie du joueur
                    lives--;
                    if (lives <= 0) {
                        tank.visible = false;
                        gameOver = true;

                    }

                    //reinitalise la position du tank
                    tank.x = (canvasWidth - taSprite.w) / 2;
                    tank.y = canvasHeight - (30 + taSprite.h);
                    //Appelle le son d'explosion
                    explosion.get();

                    //A chaque fois que le tank est touche, il disparait
                    tank.visible = false;

                }
            }

            // Controle si les balles touche une ville ou un alien
            for (var j = 0, nbAlien = aliens.length; j < nbAlien; j++) {
                var a = aliens[j];

                // Quand les aliens touchent physiquement une ville
                // le jeu s'arrete
                if (touche(ciSprite.x, cities.y, ciSprite.w, cities.h, a.x, a.y, a.w, a.h)){
                    gameOver = true;
                    tank.visible = false;
                    lvFrame = 0;
                }

                // Verifie quand une balle touche un alien
                // l'alien disparait
                if (touche(b.x, b.y, b.width, b.height, a.x, a.y, a.w, a.h)) {
                    killed.get();
                    aliens.splice(j, 1);
                    j--;
                    nbAlien--;
                    bullets.splice(i, 1);
                    i--;
                    nbBullet--;

                    //les points augmentent
                    // selon les aliens restant
                    // et selon le niveau de vague des aliens
                    score += (51-nbAlien)*lvl;

                    // Augmente la vitesse selon le niveau de vague du joueur
                    switch (lvl) {
                        case 1: {
                            lvFrame = 45;

                            break;
                        }
                        case 2: {
                            lvFrame = 40;

                            break;
                        }
                        case 3: {
                            lvFrame = 35;

                            break;
                        }
                        case 4: {
                            lvFrame = 30;

                            break;
                        }
                        case 5: {
                            lvFrame = 25;

                            break;
                        }
                        case 6: {
                            lvFrame = 20;

                            break;
                        }
                    }

                    // augmente la vitesse en fonction du nombre d'alien restant
                    // dans le tableau actuel
                    switch (nbAlien) {
                        case 45: {
                            lvFrame = lvFrame - 2;

                            break;
                        }
                        case 40: {
                            lvFrame = lvFrame - 4;

                            break;
                        }
                        case 30: {
                            lvFrame = lvFrame - 6;

                            break;
                        }
                        case 20: {
                            lvFrame = lvFrame - 8;

                            break;
                        }
                        case 10: {
                            lvFrame = lvFrame - 10;

                            break;
                        }
                        case 5: {
                            lvFrame = lvFrame - 12;

                            break;
                        }
                    }
                }
            }
        }


       // Fais tirer les aliens sur le tank de maniere aleatoire
        if (Math.random() < 0.03 && aliens.length > 0) {
            var a = aliens[Math.round(Math.random() * (aliens.length - 1))];
            //Verifie que la première ligne d'alien tire seulement
            for (var i = 0, len = aliens.length; i < len; i++) {
                var b = aliens[i];
                if (touche(a.x, a.y, a.w, 100, b.x, b.y, b.w, b.h)) {
                    a = b;
                }
            }
            // creation de la balle
            bullets.push(new Bullet(a.x + a.w*0.5, a.y + a.h, 4, 2, 4, "#fff"));
        }

        // met a jour les aliens sur chaque frames
        if (frames % lvFrame === 0) {
            spFrame = (spFrame + 1) % 2;
            var _max = 0, _min = canvasWidth;

            //met à jour la position des aliens
            for (var i = 0, len = aliens.length; i < len; i++) {
                var a = aliens[i];
                a.x += 30 * dir;

                // trouve la valeur maximal a droite ou gauche
                _max = Math.max(_max, a.x + a.w);
                _min = Math.min(_min, a.x);
            }

            // regare dans quel direction les aliens doivent se diriger
            // et descendent
            if (_max > canvasWidth - 30 || _min < 30) {

                //mettent a jour la position
                dir *= -1;
                for (var i = 0, len = aliens.length; i < len; i++) {
                    aliens[i].x += 30 * dir;
                    aliens[i].y += 30;
                }
            }

            // Si il n'y a plus d'aliens
            if (aliens.length == 0 ){

                //Recreer un tableau d'alien et augmente le niveau
                var rows = [1, 0, 0, 2, 2];
                for (var i = 0, len = rows.length; i < len; i++) {
                    for (var j = 0; j < 10; j++) {
                        var a = rows[i];

                        aliens.push({
                            sprite: alSprite[a],
                            x: 30 + j*30 + [0, 4, 0][a],
                            y: 30 + i*30,
                            w: alSprite[a][0].w,
                            h: alSprite[a][0].h
                        });
                    }

                }
                lvl++;

            }
        }
    },


   // efface et remet le canevas completement
    render: function (contx) {

        //efface tout le canevas
        contx.clearAll();

        // remet tous les aliens
        for (var i = 0, len = aliens.length; i < len; i++) {
            var a = aliens[i];
            contx.drawSprite(a.sprite[spFrame], a.x, a.y);
        }

        // remet le score
        contx.vectorText(score.toString(), 3, 35, 10);
        for (var i = 0; i < lives; i++) {
            contx.drawSprite(tank.sprite, 400+25*i, 10);
        }

        // enregistre le context des balles et les redessine
        contx.save();
        for (var i = 0, len = bullets.length; i < len; i++) {
            contx.drawBullet(bullets[i]);
        }

        //restaure le context
        contx.restore();

        // remet les villes
        contx.drawImage(cities.canvas, 0, cities.y);
        //  remet le tank
        contx.drawSprite(tank.sprite, tank.x, tank.y);

        // Efface le sprite du tank si il n'est pas visible
        if (tank.visible == false )
            contx.clearRect(tank.x,tank.y, taSprite.w, taSprite.h);

        // si gameover
        // met un message pour l'utilisateur
        if (gameOver) {

            contx.vectorText("Game Over", 4, null, null);
            contx.clearRect(tank.x,tank.y, taSprite.w, taSprite.h);
        }
    }


});

// permet d'avoir plusieurs sons en memoire
function SoundPool(maxSize) {
    var size = maxSize;
    var pool = [];
    this.pool = pool;
    var currSound = 0;

    // permet d'attribuer une fonction a un son
    this.init = function(object) {
        switch(object){

            //son shoot
            case "shoot" : {
                for (var i = 0; i < size; i++) {
                    bullet = new Audio("audio/shoot.wav");
                    bullet.volume = .12;
                    bullet.load();
                    pool[i] = bullet;
                }
                break;
            }

            //son explosion
            case "explosion": {
                for (var i = 0; i < size; i++) {
                    var explosion = new Audio("audio/explosion.wav");
                    explosion.volume = .1;
                    explosion.load();
                    pool[i] = explosion;
                }
                break;
            }

            //son invalide
            case "invaderKilled":
            {
                for (var i = 0; i < size; i++) {
                    var explosion = new Audio("audio/invaderKilled.wav");
                    explosion.volume = .1;
                    explosion.load();
                    pool[i] = explosion;
                }
                break;
            }
        }
    };

    //lance les son
    this.get = function() {
        if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
            pool[currSound].play();
        }
        currSound = (currSound + 1) % size;
    };
}