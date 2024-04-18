let xp= 0;
let health= 100;
let gold= 50;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory= ["stick"];
const button1= document.querySelector("#button1");
const button2= document.querySelector("#button2");
const button3= document.querySelector("#button3");
const text= document.querySelector("#text");
const xpText= document.querySelector("#xpText");
const healthText= document.querySelector("#healthText");
const goldText= document.querySelector("#goldText");
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");

const weapons= [{

    name: "stick",
    power: 5
    },

    {

    name: "dagger",
    power: 30

    },
    {

    name: "claw hammer",
    power: 50

    },
    {

    name: "sword",
    power: 100
    
    }




];

const locations=[
    {
        name:  "town sqaure ",
        "button text": ["Go to store", "Go to cave","Fight dragon"],
        "button function":[goStore,goCave,fightDragon],
        text:"You are in the town square. You see a sign that says \"store\""
    },

    {
        name:  " store ",
        "button text": ["Buy 10 health (10 Gold)", "Buy weapon (30 Gold)","Go to town sqaure"],
        "button function":[buyHealth,buyWeapon,goTown],
        text:"You are in a store"
    },

    {
        name: "cave",
        "button text": ["Fight Slime", "Fight Fanged Beast", "Go To Town Square"],
        "button function":[fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters"
    

    },


    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button function":[attackmons, dodgemons, goTown],
        text: "You are fighting a monster"
        
    },
    {
        name: "kill monster",
        "button text": ["Go To Town Square","Go To Town Square", "Go To Town Square"],
        "button function":[goTown,goTown,easterEgg],
        text: "The monster screams Arg! as it dies. You gain experience points and find gold"

    },
    {
        name: "lose",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button function":[restart, restart, restart],
        text: "☠️You Died☠️"
        
    },
    {
        name: "win",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button function":[restart, restart, restart],
        text: "You defeated the Dragon! YOU WIN THE GAME!!🥳🎉"
    },
    {
        name: "Eater egg",
        "button text": ["2", "8","Go to town"],
        "button function": [pick1, pick8, goTown],
        text: "You've find a search game. Pick a number above. ten number will be randomly selected between 1 and 0. If the number you choose matches one of the numbers, You win the game.☺️ "
    }


];

const monsters=[
    {
        name:"slime",
        level: 2,
        health: 15,

    },
    {
        name:"franged beast",
        level: 8,
        health: 60,
    },
    {
        name:"dragon",
        level: 20,
        health: 300,
    }
];

button1.onclick= goStore;
button2.onclick= goCave;
button3.onclick= fightDragon;




function update(location) {
    monsterStats.style.display="none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button function"][0];
    button2.onclick=location["button function"][1];
    button3.onclick=location["button function"][2];
    text.innerText= location.text;
    
}

function goTown(){
    update(locations[0]);
    

}

function goStore( ) {

   update(locations[1]);

}


function goCave( ) {

    update(locations[2]);
    
}



function buyHealth() {
   if (gold >=10) {
       gold -=10;
       health +=10;
    goldText.innerText= gold;
    healthText.innerText= health;   
   } else{
    text.innerText="Sorry. You do not have enogh gold coins ";

   }
   
    

}

function buyWeapon(){

    if (currentWeapon < weapons.length-1 ) {
        if (gold>=30) {

            gold-=30;
            currentWeapon++; 
            goldText.innerText = gold;
            let newWeapon= weapons[currentWeapon].name;
            text.innerText = "You have a "+ newWeapon + ".";
            inventory.push(newWeapon);
    
            text.innerText+=" In you inventory, you have: "+ inventory;
            
        } else {
            text.innerText = "You dont have enough gold to buy a weapon"
        }
        
    } else{
        text.innerText= "You already have the most powerful weapon";
        button2.innerText= "Sell weapon for 15 gold";
        button2.onclick=sellWeapon;
    }

}

function sellWeapon(){

    if (inventory.length >1) {

        gold+=15;
        goldText.innerText=gold;
        let currentWeapon=inventory.shift();
        text.innerText="You sold a "+ currentWeapon + ".";
        text.innerText+=" In you inventory, you have: "+ inventory;
    }
    else{
        text.innerText="You dont have a weapon to sell";
    }


}



function fightDragon( ) {

    fighting=0;
    gofight();
    
}

function fightSlime() {

    fighting=1;
    gofight();

}


function fightBeast(){
    fighting=2;
    gofight();

}

function gofight(){

    update(locations[3]);
    monsterHealth= monsters[fighting].health;
    monsterStats.style.display="block";
    monsterNameText.innerText=monsters[fighting].name;
    monsterHealthText.innerText=monsterHealth;


}

function attackmons(){
    text.innerText= "The " + monsters[fighting].name + " attacks you. ";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name+ ".";
    if (monsterHit()) {

        health -= getMonsterAttackValue(monsters[fighting].level);
        
    } else {
        text.innerText="You miss.😓"
        
    }

   
    monsterHealth -=weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;

    monsterHealthText.innerText= monsterHealth;
    if (health <= 0) {
        lose();

    } else if (monsterHealth <=0 ) {
        
        fighting === 2 ? winGame():defeatMonster();
        
    }


    if (Math.random()<= .1  && inventory.length !== 1){

        text.innerText += " Your " + inventory.pop() +" breaks.... ";
        currentWeapon--;


    }
}
function monsterHit(){

    return Math.random() < 0.8;

}

function getMonsterAttackValue(monsterlevel){

    let hit = (monsterlevel * 5)-(Math.random() * xp);
    console.log(hit);

    return hit;

}

 
function dodgemons(){

    text.innerText = "You dodge the attack from the "+ monsters[fighting].name + "."

}


function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    xpText.innerText=xp;
    goldText.innerText=gold;
    update(locations[4]);


}

function lose(){

    update(locations[5]);

}


function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory= ["stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();


}

function  winGame() {
    update(locations[6]);    
}

function easterEgg(){
    
    update(locations[7]);
}


function pick1(){

    pick(2);

}

function pick8(){
    pick(8);

}


function pick(guess){

    let numbers =[];

    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random()*11));
    }

    text.innerText ="You picked "+ guess + ". Here are the random numbers.\n ";

    for (let i = 0; i < 10 ; i++) {
        text.innerText += numbers[i] + "\n";
    
    }

    if (numbers.indexOf(guess)!== -1){
        gold+= 20;
        goldText.innerText=gold;
        text.innerText += " Congratuations, you just won 20 gold 🐐";

    }
    else{
        health -=10
        goldText.innerText=gold;
        text.innerText += " Wrong! you just lost 10 health ☹️"; 
        if(health <= 0){
            lose();

        }

    }

}




