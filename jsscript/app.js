/**
 * Todo list: Completed 1.win screen - hide game screen tags -show end game screen tags
 *            Completed 2. create retreat button html
 *            completed 3. create Retreat screen
 *            partialy completed 4. Create choose your difficulty level
 *            completed 5. use accuracy to determine luck of hit
 *             6. balancing the game
 */
let prompt = "easy"
let playerStatDisplay=document.querySelector(".playerStats")
let enemyStatDisplay=document.querySelector(".enemyStats")
let endGameMessage =document.getElementById("endGameScreen")
let gameContainer = document.querySelector(".bodyContainer") 
let newGame=""
let startMenuElements= document.querySelector("#startMenu")
function revealGameElements(){
    startMenuElements.style.display="none"
    gameContainer.style.display="flex"
}
class Ship{
    hitPoints=0;
    firePower =0
    accuracy =0
    constructor(hp,firePower,accuracy){
        this.hitPoints=hp;
        this.firePower=firePower;
        this.accuracy=accuracy;
    }
    hit(firePower){
        this.hitPoints-=firePower;
        console.log(this.hitPoints)
    }
}
class Enemy extends Ship{
    constructor(hp,firePower,accuracy){
        super(hp,firePower,accuracy);
        
    }
    hit(firePower){
        this.hitPoints-=firePower;
        console.log(this.hitPoints)
    }

}
class Player extends Ship{
    constructor(hp,firePower,accuracy){
        super(hp,firePower,accuracy)
        playerStatDisplay.innerHTML =` Hull : ${hp} <br> FirePower : ${firePower} <br> Accuracy : ${accuracy} <br>`
    }
    hit(firePower){
        this.hitPoints-=firePower;
        console.log(this.hitPoints)
    }
}
function hideGame(message){
    document.getElementById("endGameMessage").innerHTML=message
    gameContainer.style.display="none";

}
function createGame(difficulty){}
class Game{
    static difEnemies=[6,7,8]
    checkIfWin(){
        if(this.player.hitPoints<0){
            hideGame("Game Over\nYou Lose")
        }
        else if(this.enemy.length<=0){
            hideGame("Congratz\n You are the winner")
        }
        else if(this.enemy[this.enemy.length-1].hitPoints<0){
        this.player.hitPoints= this.player.hitPoints+1
        this.enemy.pop()
        console.log("nextEnemy")
        }
        else{console.log("continue battle")}
    }
    createPlayer(hp,fp,acc){
        this.player = new Player(hp,fp,acc)
    }
    createEnemy(){
        let randNumHP = Math.floor(Math.random()*10+1)
        let randNumFP = Math.floor(Math.random()*4)
        let randNumACC = Math.random()
        this.enemy.push(new Enemy(randNumHP,randNumFP,randNumACC))
    }
    enemyHit(player,enemyfirePower){
        let enemyLuck = Math.random();
        if (enemyLuck<this.enemy[this.enemy.length-1].accuracy){
            player.hit(enemyfirePower)
            console.log("enemy hit")
        }
        else console.log("enemy miss")
    }
    round(enemyFighting){
        //this.checkIfWin()
        //console.log(`Player luck is ${playerLuck} php=${this.player.hitPoints} ehp=${enemyFighting.hitPoints}`)
        let playerLuck = Math.random();
        let enemyLuck = Math.random();
        //console.log(`Player luck is ${playerLuck} php=${this.player.hitPoints} ehp=${this.enemy[this.enemy.length-1].hitPoints}`)
        if(playerLuck<this.player.accuracy&&this.enemy.length>0){
            console.log(  this.enemy)
            console.log()
            enemyStatDisplay.innerHTML=` Hull : ${this.enemy[this.enemy.length-1].hitPoints} <br> FirePower : ${this.enemy[this.enemy.length-1].firePower} <br> Accuracy : ${this.enemy[this.enemy.length-1].accuracy} <br>`
            this.enemy[this.enemy.length-1].hit(this.player.firePower)
            this.enemyHit(this.player,this.enemy[this.enemy.length-1].firePower)
            }
        else if(this.enemy.length>0){
            console.log("Player miss hit")
            this.enemyHit(this.player,this.enemy[this.enemy.length-1].firePower)
            playerStatDisplay.innerHTML =` Hull : ${this.player.hitPoints} <br> FirePower : ${this.player.firePower} <br> Accuracy : ${this.player.accuracy} <br>`
        }
        this.checkIfWin()
    }
    constructor(difficulty){
        this.difficulty=difficulty  
        this.enemy=[]    
        if(this.difficulty.toLowerCase()=="easy"){
            this.createPlayer(20,5,0.6);
            for(let iterator = 0 ; iterator < 6; iterator++){
                this.createEnemy();
            }
        }
        else if(this.difficulty.toLowerCase()=="medium"){
            this.createPlayer(15,4,0.5);
            for(let iterator = 0 ; iterator < 6; iterator++){
                this.createEnemy();
            }
        }
        else if(this.difficulty.toLowerCase()=="hard"){
            this.createPlayer(10,3,0.4);
            for(let iterator = 0 ; iterator < 6; iterator++){
                this.createEnemy();
            }
        }
        enemyStatDisplay.innerHTML=` Hull : ${this.enemy[this.enemy.length-1].hitPoints} <br> FirePower : ${this.enemy[this.enemy.length-1].firePower} <br> Accuracy : ${this.enemy[this.enemy.length-1].accuracy} <br>`
        
        
    }
    
}
function createGame(difficulty){revealGameElements();console.log("new GAme ");newGame = new Game(difficulty);}

//console.log(newGame)
//console.log(newGame.player)
//console.log(newGame.enemy)