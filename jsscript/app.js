/**
 * Todo list: 1.win screen - hide game screen tags -show end game screen tags
 *            2.
 */
let prompt = "easy"
let playerStatDisplay=document.querySelector(".playerStats")
let enemyStatDisplay=document.querySelector(".enemyStats")
let endGameMessage =document.getElementById("endGameScreen")
let gameContainer = document.querySelector(".bodyContainer") 
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
function hideGame(){
    gameContainer.style.display="none";

}
class Game{
    static difEnemies=[6,7,8]
    checkIfWin(){
        if(this.player.hitPoints<0){
            document.getElementById("endGameMessage").innerHTML="you lose"
            hideGame()
        }
        else if(this.enemy.length<=0){
            document.getElementById("endGameMessage").innerHTML="you win"
            hideGame()
        }
        else if(this.enemy[this.enemy.length-1].hitPoints<0){
        this.player.hitPoints= this.player.hitPoints+1
        this.enemy.pop()
        
        console.log("nextEnemy")
        }
        else{console.log("continue battle")}
    }
    createPlayer(){
        this.player = new Player(15,3,0.3)
    }
    createEnemy(){
        let randNumHP = Math.floor(Math.random()*10+1)
        let randNumFP = Math.floor(Math.random()*4)
        let randNumACC = Math.random()
        this.enemy.push(new Enemy(randNumHP,randNumFP,randNumACC))


    }
    enemyHit(player,enemyfirePower){
        let enemyLuck = Math.random();
        if (enemyLuck>0.5){
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
        if(playerLuck>0.3&&this.enemy.length>0){
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
            this.createPlayer();
            for(let iterator = 0 ; iterator < 6; iterator++){
                this.createEnemy();
            }
        }
        enemyStatDisplay.innerHTML=` Hull : ${this.enemy[this.enemy.length-1].hitPoints} <br> FirePower : ${this.enemy[this.enemy.length-1].firePower} <br> Accuracy : ${this.enemy[this.enemy.length-1].accuracy} <br>`
        
        
    }
    
}

let difficulty = prompt;
let newGame = new Game(difficulty);
//console.log(newGame)
console.log(newGame.player)
//console.log(newGame.enemy)