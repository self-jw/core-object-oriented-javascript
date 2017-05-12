// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.speed = this.getRandomNumber(200, 500);

  this.x += this.speed * dt;
  if (this.x > 400) {
    this.x = -(this.getRandomNumber(400, 100));
  }

};

// Random number between and including min and max.
Enemy.prototype.getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
  // Reset to starting position when there is a collision.
  for (var enemy = 0; enemy < allEnemies.length; enemy++) {
    if (allEnemies[enemy].x > (this.x - 60) && (allEnemies[enemy].x < this.x + 60)) {
      if (allEnemies[enemy].y > (this.y - 60) && (allEnemies[enemy].y < this.y + 60)) {
        this.resetPosition;
        this.x = 200;
        this.y = 365;
      }
    }
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPosition = function () {
  this.x = 200;
  this.y = 365;
};

//Input handler for player
Player.prototype.handleInput = function (e) {
  // Check which movement key was pressed.
  switch (e) {
    case 'left':
      this.x -= 100;
      break;
    case 'up':
      this.y -= 75;
      break;
    case 'right':
      this.x += 100;
      break;
    case 'down':
      this.y += 75;
      break;
    default:
  }

  // Player has hit the left edge.
  if (this.x < 0) {
    this.x = 0;
  }

  // Player has hit the right edge.
  if (this.x > 400) {
    this.x = 400;
  }

  // Player has hit the top edge.
  // Player has won the game!
  if (this.y < 0) {
    this.x = 200;
    this.y = 365;
  }

  // Player has hit the bottom edge.
  if (this.y > 365) {
    this.y = 365;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(-260, 60, 300));
allEnemies.push(new Enemy(-110, 145, 300));
allEnemies.push(new Enemy(-320, 230, 300));

var player = new Player(200, 365, 1);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

  player.handleInput(allowedKeys[e.keyCode]);
});
