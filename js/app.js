
// Enemies our player must avoid
var Enemy = function (x,y,sprite,spead) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.spead = spead;
};

// Generate random numbres from 100 to 400.
function getRandomSpead(x) {
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

    if(this != player) {
        console.log("dt p",dt);
        if(isStart == true){
            this.x = this.x + this.spead * dt;
        }

        isStart = true;
        if (this.x > 505) {
            this.x = -1 * dt;
        }

        if(this.x == -1 * dt) {
           this.spead = this.x + getRandomSpead(this.x);
        }
    }
    else {
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
    if ((enemyX >= player.x && enemyX <= player.x + touchSpace) && (enemyY >= player.y && enemyY <= player.y + touchSpace)) {
        player.x = 200;
        player.y = 400;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
let enemy = new Enemy(0, 0,'images/enemy-bug.png');
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    {
        name: "enemy1",
        update: enemy.update,
        render : enemy.render,
        x: 0,
        y: 60,
        sprite: enemy.sprite,
        spead :200,
        collesion: enemy.collesion
    },
    {
        name: "enemy2",
        update: enemy.update,
        render: enemy.render,
        x: 0,
        y: 150,
        sprite: enemy.sprite,
        spead: 100,
        collesion: enemy.collesion
    },
    {
        name: "enemy3",
        update: enemy.update,
        render: enemy.render,
        x: 0,
        y: 230,
        sprite: enemy.sprite,
        spead: 70,
        collesion: enemy.collesion
    }
];

// Place the player object in a variable called player
let player = new Enemy(200, 420, 'images/char-boy.png');

console.log(player);
// add handleinput method to the original class
Enemy.prototype.handleInput = function(keyCode) {
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