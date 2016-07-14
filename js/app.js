//superCalss de Enemy e Player
var Entity = function(x, y, sprite) {
   this.x = x;
   this.y = y;
   this.w = 101;
   this.h = 80;
   this.sprite = sprite;
};
// Draw the enemy on the screen, required method for game
Entity.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*80-11);
};

// Enemies our player must avoid
var Enemy = function(row, col) {
	if (col === undefined)
   	Entity.call(this, -1, row, 'images/enemy-bug.png');
	else
   	Entity.call(this, col, row, 'images/enemy-bug.png');
   this.velocity = 2 * Math.random() + 0.5;
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x = this.x + this.velocity*dt;
   if (this.x > 6.5)
      this.x = -1.5;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
   Entity.call(this, 2, 5, 'images/char-boy.png');
   this.dx = 101;
   this.ix = 0;
   this.iy = 0;   
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
   var newValue;
   if (this.ix != 0) {
      newValue = this.x + this.ix;
      if (newValue < 0)
         this.x = 0;
      else if (newValue >= 5)
         this.x = 4;
      else
         this.x = newValue;
      this.ix = 0;
   }
   if (this.iy != 0) {
      newValue = this.y + this.iy;
      if (newValue < 0)
         this.y = 0;
      else if (newValue >= 6)
         this.y = 5;
      else
         this.y = newValue;
      this.iy = 0;   
   }
};
Player.prototype.handleInput = function(dir) {
   if (dir === 'left')
      this.ix--;
   else if (dir === 'right')
      this.ix++;
   else if (dir === 'up')
      this.iy--;
   else if (dir === 'down')
      this.iy++;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1,0), new Enemy(1), new Enemy(2), new Enemy(3), new Enemy(2,0), new Enemy(3,0)];
// Place the player object in a variable called player
var player = new Player();

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
