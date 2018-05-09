
// Enemies our player must avoid
var Enemy = function (x, y, sprite, spead) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.spead = spead;
};

// Player class.
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

// Generate random numbres from 100 to 400.
Enemy.prototype.getRandomSpead = function (x) {
    let moveX = Math.floor(Math.random() * 400 + 100);
    if (x == "NaN" ) {
        x =  0;
    }
    return moveX;
}

// Flag to know if the game started.
let isStart = false;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(isStart == true){
        this.x = this.x + this.spead * dt;
    }

    isStart = true;
    if (this.x > 505) {
        this.x = -1 * dt;
    }

    if(this.x == -1 * dt) {
        this.spead = this.x + this.getRandomSpead(this.x);
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collesion = function() {
    // Back the player to the first positon if successfully reach to the water
    if (player.y < -20 && player.y > -42) {
        player.x = 200;
        player.y = 420;
    }

    let enemyX = Math.ceil(this.x);
    let enemyY = Math.ceil(this.y);
    // The ranage of collisions
    let touchSpace = 40;
    // Back the player to the first position.
    if ((enemyX >= player.x && enemyX <= player.x + touchSpace)
     && (enemyY >= player.y && enemyY <= player.y + touchSpace)) {
        player.x = 200;
        player.y = 400;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// let enemy = new Enemy(0, 0, 'images/enemy-bug.png');
// Place all enemy objects in an array called allEnemies

let enemy1 = new Enemy(0, 60, "images/enemy-bug.png", 200);
let enemy2 = new Enemy(0, 150, "images/enemy-bug.png", 100);
let enemy3 = new Enemy(0, 230, "images/enemy-bug.png", 70);
let allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Render method for player class
Player.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.collesion = function() {
    return {x: this.x, y: this.y};
}
Player.prototype.update = function(dt) {
    // Variable represents the player move every time user press key button.
    let singleMovement = 90;
    // To prevent collisions with the right and left wall
    // Draw the enemy on the screen, required method for game
    switch (dt) {
        case "left":
            if (this.x > 20) { // prevent hit the left wall.
                this.x -= singleMovement;
            }
            break;
        case "right":
            if (this.x < 380) { // prevent hit the right wall.
                this.x += singleMovement;
            }
            break;
        case "up":
            if (this.y > 0) { // prevent hit the top wall.
                this.y -= singleMovement;
            }
            break;
        case "down":
            if (this.y < 380) { // prevent hit the bottom wall.
                this.y += singleMovement;
            }
            break;
        default:
            break;
    }
}

// add handleinput method to the original class
Player.prototype.handleInput = function(keyCode) {
    if(keyCode == "left") {
        player.update("left");
    }
    else if (keyCode == "up") {
        player.update("up");
    }
    else if(keyCode == "right") {
        player.update("right");
    }
    else if(keyCode == "down") {
        player.update("down");
    } 
}

// Place the player object in a variable called player
let player = new Player(200, 420, 'images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});