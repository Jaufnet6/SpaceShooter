// methode retournant un bool pour savoir si un objet en touche un autre

function touche(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};

// objet permettant de tirer avec la position x, y du tir, sa vitesse, sa taille en 2d et sa couleur
function Bullet(x, y, vely, w, h, color) {

    this.width = w;
    this.height = h;
	this.x = x;
	this.y = y;
	this.speed = vely;
	this.color = color;
};

// methode  prototype pour ajouter une fonction a bullet
Bullet.prototype.update = function() {
	this.y += this.speed;
};

//objet sprite
function Sprite(img, x, y, w, h) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.img = img;
}