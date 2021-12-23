/**
 * Todo list: Completed 1.win screen - hide game screen tags -show end game screen tags
 *            Completed 2. create retreat button html
 *            completed 3. create Retreat screen
 *            partialy completed 4. Create choose your difficulty level
 *            completed 5. use accuracy to determine luck of hit
 *            Partially completed 6. balancing the game
 *            6.Comment code
 */
//global variable declarations and html tag retreval for further manipulation
let prompt = "easy"
let playerStatDisplay=document.querySelector(".playerStats")
let enemyStatDisplay=document.querySelector(".enemyStats")
let endGameMessage =document.getElementById("endGameScreen")
let gameContainer = document.querySelector(".bodyContainer") 
let newGame=""
let startMenuElements= document.querySelector("#startMenu")
let difEnemies=[6,7,8]
// end of declarations for global variables

//declaration of function Reeveal game elements this function hides all
// menu elements and lets game to be playable, No parameters
function revealGameElements(){
    startMenuElements.style.display="none"
    gameContainer.style.display="flex"
}//end of revealGameElements function

//Class parent dectaration Ship
class Ship{
    //properties of ship class
    hitPoints=0;
    firePower =0
    accuracy =0
    //constructor for class ship Takes hull point fire power and accuracy as parameter
    constructor(hp,firePower,accuracy){
        this.hitPoints=hp;
        this.firePower=firePower;
        this.accuracy=accuracy;
    }// end of class ship costructor
    // method hit this methods subtracts firepower  from hitpoints upon sucessful hit 
    hit(firePower){
        this.hitPoints-=firePower;
        console.log(this.hitPoints)
    }//end of the hit method
}//end of ship class

//Class enemy declaration this method extends ship
class Enemy extends Ship{
    //enemy class constructor takes hull point fire power and accuracy as parameter
    constructor(hp,firePower,accuracy){
        super(hp,firePower,accuracy);
    }// end of constructor
    //hit method takes firepower as parameter
    hit(firePower){
        this.hitPoints-=firePower;
        console.log(this.hitPoints)
    }//end of hit method
}//end of enemy Class

//player class entends ship
class Player extends Ship{
    //player class constructor takes hull point fire power and accuracy as parameter
    constructor(hp,firePower,accuracy){
        super(hp,firePower,accuracy)
        playerStatDisplay.innerHTML =` Hull : ${hp} <br> FirePower : ${firePower} <br> Accuracy : ${accuracy} <br>`
    }//end  of the constructor
    //hit method takes firepower as parameter
    hit(firePower){
        this.hitPoints-=firePower;
        console.log(this.hitPoints)
    }//end of hit function
}//end of player class
//function that hides game tag elements and shows end game elements
function hideGame(message){
    document.getElementById("endGameMessage").innerHTML=message
    gameContainer.style.display="none";

}//ene of finction hideGame

// class declaration for game
class Game{
    //win conditions check function
    checkIfWin(){
        if(this.player.hitPoints<0){
            hideGame("Game Over\nYou Lose")
        }//end if
        else if(this.enemy.length<=0){
            hideGame("Congratz\n You are the winner")
        }//end else if
        else if(this.enemy[this.enemy.length-1].hitPoints<0){
        this.player.hitPoints= this.player.hitPoints+1
        this.enemy.pop()
        console.log("nextEnemy")
        }//end else if
        else{console.log("continue battle")}
    }//end of checkIfWin function
    // method that creats player object takes hull points fire power accuracy
    createPlayer(hp,fp,acc){
        this.player = new Player(hp,fp,acc)
    }// end of method create player

    // create enemy creats one enemy object and appends it to the enemy array randomly created
    createEnemy(){
        let randNumHP = Math.floor((Math.random()*3)+3)
        let randNumFP = Math.floor((Math.random()*2)+2)
        let randNumACC = (Math.random()*0.2)+0.6
        this.enemy.push(new Enemy(randNumHP,randNumFP,randNumACC))
    }// end of create enemy method

    // enemy hit turn this method is caled to to attack player creates random chance for enemy to hit
    enemyHit(player,enemyfirePower){
        let enemyLuck = Math.random();
        if (enemyLuck<this.enemy[this.enemy.length-1].accuracy){
            player.hit(enemyfirePower)
            alert("enemy hit")
        }// end of if statement
        else alert("enemy miss")
    }// end of enemy hit function

    // declaration of round method runs one round of the fight
    round(){
        //this.checkIfWin()
        //console.log(`Player luck is ${playerLuck} php=${this.player.hitPoints} ehp=${enemyFighting.hitPoints}`)
        let playerLuck = Math.random();
        let enemyLuck = Math.random();
        //console.log(`Player luck is ${playerLuck} php=${this.player.hitPoints} ehp=${this.enemy[this.enemy.length-1].hitPoints}`)
        if(playerLuck<this.player.accuracy&&this.enemy.length>0){
            alert("player hits")
            enemyStatDisplay.innerText=` Hull : ${this.enemy[this.enemy.length-1].hitPoints} \n FirePower : ${this.enemy[this.enemy.length-1].firePower} \n Accuracy : ${this.enemy[this.enemy.length-1].accuracy} <br>`
            this.enemy[this.enemy.length-1].hit(this.player.firePower)
            this.enemyHit(this.player,this.enemy[this.enemy.length-1].firePower)
            }// end of if statement
        else if(this.enemy.length>0){
            alert("Player miss hit")
            this.enemyHit(this.player,this.enemy[this.enemy.length-1].firePower)
            playerStatDisplay.innerHTML =` Hull : ${this.player.hitPoints} <br> FirePower : ${this.player.firePower} <br> Accuracy : ${this.player.accuracy} <br>`
        }// end of else if statement
        this.checkIfWin()
    }//end of round method 
    constructor(difficulty){
        this.difficulty=difficulty  
        this.enemy=[]    
        if(this.difficulty.toLowerCase()=="easy"){
            this.createPlayer(20,5,0.6);
            for(let iterator = 0 ; iterator < difEnemies[0]; iterator++){
                this.createEnemy();
            }
        }
        else if(this.difficulty.toLowerCase()=="medium"){
            this.createPlayer(15,4,0.5);
            for(let iterator = 0 ; iterator < difEnemies[1]; iterator++){
                this.createEnemy();
            }
        }
        else if(this.difficulty.toLowerCase()=="hard"){
            this.createPlayer(10,3,0.4);
            for(let iterator = 0 ; iterator < difEnemies[2]; iterator++){
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