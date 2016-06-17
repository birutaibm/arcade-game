//superCalss de Enemy e Player
var Entity = function(x, y, sprite) {
   this.x = x;
   this.y = y;
   this.velocity = 200 * Math.random() + 50;
   this.sprite = sprite;
};
// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(row) {
   Entity.call(this, 0, row*80-11, 'images/enemy-bug.png');
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x = this.x + this.velocity*dt;
   if (this.x > 510)
      this.x = -100;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
   Entity.call(this, 202, 400, 'images/char-boy.png');
   this.dir = '';
   this.dx = 80 * Math.random() + 20;
   this.dy = 80 * Math.random() + 20;
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
   if (this.dir === 'left')
      this.x -= this.dx;
   else if (this.dir === 'right')
      this.x += this.dx;
   else if (this.dir === 'up')
      this.y -= this.dy;
   else if (this.dir === 'down')
      this.y += this.dy;
   this.dir = '';
};
Player.prototype.handleInput = function(dir) {
   this.dir = dir;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
// Place the player object in a variable called player
var player = new Player(); //TODO alterar essa linha quando criar a classe Player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
