// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=this.speed * dt;
    
    ///Check if the enemy is outside the "screen" and reset X
    if (this.x>900){
        this.x = -50;
        this.speed = getRandomArbitrary(150,350);
    }
    
    ///Check if player is in the same position that the enemy is
    ///In this case player will lost 1 life
    ///If life is equal 0 the game will restart
    if (
          (player.y==this.y) && 
          (              
              player.x<Math.round(this.x)+80
              &&
              player.x>Math.round(this.x)-30
          )
       ){
        player.y=380;        
        player.lifecounter--;
        if (player.lifecounter==0)  {
            alert("GAME OVER =(. BEST LUCK NEXT TIME =)");
            game.changeLevel(0);
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x,y,speed,sprite) {
     this.x = x;
     this.y = y;
     this.speed = speed;
     this.sprite = sprite;
     this.lifecounter = 3;     
}

Player.prototype.addLife = function(life){
    this.lifecounter += life;
}

Player.prototype.changeAvatar = function(newAvatar) {
    this.sprite = newAvatar;
}

Player.prototype.update = function() {
    ///Check if player is outside the screen in Y position
    if (this.y<0 || this.y > 380){   
        if(this.y<0) {
            game.changeLevel();
        }        
        this.y = 380;
    }

    ///Check if player is outside the screen in X position
    if (this.x < 0){
        this.x = 0 ;        
    } else if(this.x > 900) {
        this.x = 900 ;
    }

    ///If player has the same X/Y position than life will be add one more life to the player
   if ( (this.y==life.y) && (this.x==life.x)){       
       if (life_control===0){
        this.addLife(1);
        life_control=1;
        life.x=-100;
        life.y=-100;
       }
       return;
   };

    ///If player has the same X/Y position than GEMS[S] will be highlight the name of GEM
   if (this.x==gemblue.x && this.y==gemblue.y){  
        $("#gemblue").addClass("gemactive");
        gemblue.x=-100;
        gemblue.y=-100; 
   };

    if (this.x==gemgreen.x && this.y==gemgreen.y){
        $("#gemgreen").addClass("gemactive");
        gemgreen.x=-100;
        gemgreen.y=-100;
    }

    if (this.x==gemorange.x && this.y==gemorange.y){
        $("#gemorange").addClass("gemactive");
        gemorange.x=-100;
        gemorange.y=-100; 
    }

    document.getElementById("lifecounter").innerHTML = `LIFE: ${player.lifecounter}`;   
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keycode) {

    let control=Boolean(false);
            
    allRocks.forEach(checkRockPos);

    ///Before moving player will check if the position X/Y will be a rock
    ///If true then doesn´t move player
    function checkRockPos(item, index, arr) {

     if (keycode==='right'){
        if (((player.x + player.speed + 50)===item.x) && (player.y==item.y)) {
            //control=1;
            control=Boolean(true);
            //console.log('will be the same in the RIGHT');
            return false;
        }                
    } else if (keycode==='left'){
        if (((player.x - (player.speed + 50))===item.x) && (player.y==item.y)) {
            //control=1;
            control=Boolean(true);
            //console.log('will be the same in the LEFT');
            return false;
        }
    } else if (keycode === 'up'){
        if (((player.y - (player.speed + 30))===item.y) && (player.x==item.x)) {
            //control=1;
            control=Boolean(true);
            //console.log('will be the same in the UP');
            return false;
        }        
    } else if (keycode === 'down'){

        if (((player.y + player.speed + 30)===item.y) && (player.x==item.x)) {
            //control=1;
            control=Boolean(true);
            //console.log('will be the same in the DOWN');
            return false;
        }
    } 
}

    ///If control is false then player will move according keycode
    if (keycode==='right' && control===false){
        this.x += this.speed + 50;
                
    } else if (keycode==='left' && control===false){
        this.x -= this.speed + 50;

    } else if (keycode === 'up' && control===false){
        this.y -= this.speed + 30;
        
    } else if (keycode === 'down' && control===false){
            this.y += this.speed + 30;
    }   
}

Player.prototype.getSprite = function(){
    return this.sprite;
}

//gem class 
let Gem = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//life class
let Life = function (x,y,sprite){
  this.x=x;
  this.y=y;
  this.sprite=sprite;
}

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

let Rock = function (x,y,sprite){
    this.x=x;
    this.y=y;
    this.sprite=sprite;
}
  
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);      
}
  
let Game = function (){
    this.level=0;
}

Game.prototype.resetGame = function(){
        this.level=0;
        allEnemies = [];
        allRocks = [];
        player.x=0;
        player.y=380;
        player.lifecounter = 3;
        $("#gemblue").removeClass("gemactive");
        $("#gemgreen").removeClass("gemactive");
        $("#gemorange").removeClass("gemactive");
}

Game.prototype.changeLevel = function (levelx){    
    
    ///Reset Game
    if (levelx===0){
        this.resetGame();    
    }
    
    life_control=0;
    this.level++;
    
    document.getElementById("level").innerHTML = `LEVEL: ${this.level} \n`;   
    allEnemies.push(new Enemy(0,getRandomYPosition(),getRandomArbitrary(200,350)));
    
    ///Add rocks
    if ((this.level%2)===0){
        allRocks.push(new Rock(randAllPositions[0]["posx"],randAllPositions[0]["posy"],'images/Rock.png'));
        randAllPositions.shift();
    }

    ///Add Life
    if ((this.level%4)===0){        
        life.x=randAllPositions[0]["posx"];
        life.y=randAllPositions[0]["posy"];
        randAllPositions.shift();
    } 
    else
    {
        life.x=-100;
        life.y=-100;
    }

    ///Add Blue GEM
    if (this.level===7){                                    
        gemblue.x=randAllPositions[0]["posx"];
        gemblue.y=randAllPositions[0]["posy"];
        randAllPositions.shift();
    } 
    else
    {
        gemblue.x=-100;
        gemblue.y=-100;
    }    

    ///Add Green GEM
    if (this.level===14){                        
        gemgreen.x=randAllPositions[0]["posx"];
        gemgreen.y=randAllPositions[0]["posy"];
        randAllPositions.shift();        
    } 
    else
    {
        gemgreen.x=-100;
        gemgreen.y=-100;
    }  

    ///Add Orange GEM
    if (this.level===21){                  
        gemorange.x=randAllPositions[0]["posx"];
        gemorange.y=randAllPositions[0]["posy"];
        randAllPositions.shift();        
    } 
    else
    {        
        gemorange.x=-100;
        gemorange.y=-100;
    }      
    
    if (this.level===22){
        alert("Congrats. You are the boss.=)");
        this.level=21;
        game.changeLevel(0);
        return true;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let game = new Game(0);
document.getElementById("level").innerHTML = `LEVEL: ${game.level} \n`;   

let allXPositions = [0,100,200,300,400,500,600,700,800,900];
let allYPositions = [60,140,220];

function getRandomXPosition(){
   return allXPositions[Math.floor((Math.random() * 10))];
}

function getRandomYPosition(){
    return allYPositions[Math.floor((Math.random() * 3))];
}
 
let allPositions = [];
///Create an array with all X/Y combinations so this way the game will never have rock/life/gem in the same position
for(let i = 0; i < allXPositions.length; i++)
{
     for(let j = 0; j < allYPositions.length; j++)
     {      
        let temp = [];      
        temp["posx"]=allXPositions[i];
        temp["posy"]=allYPositions[j];
        allPositions.push(temp);
     }
}

function shuffle(array) {
    let i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

//Random the position, so each game will have different ROCK/LIFE/GEM positions
let randAllPositions = shuffle(allPositions);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let life_control=0;
let allEnemies = [];
let allRocks = [];
let player = new Player(0,380,50,'images/char-boy.png',3);
let life = new Life(-100,-100,'images/Heart.png');
let gemblue = new Gem(-100,-100,'images/Gem Blue.png');
let gemgreen = new Gem(-100,-100,'images/Gem Green.png');
let gemorange = new Gem(-100,-100,'images/Gem Orange.png');
allGems = [gemblue,gemgreen,gemorange];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});