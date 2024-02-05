let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let scene = document.getElementById("images");


const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store. There is little stock left, but all items are sturdily built by local craftsmen."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters!."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster!."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You groan in agony, as your last breath escapes your body, terrifying darkness envelops you... ☠️"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉" 
  },
  {
    name: "easter egg",
    "button text": ["2", "7", "Go to town square?"],
    "button functions": [pickTwo, pickSeven, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {

    
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/townsquare.jpg')";  
    let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/townsounds.mp3');
  //sounds.loop = true;
  sounds.play();
  
}



function goStore() {
  update(locations[1]);
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/store.jpg')";
  let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/blacksmith.mp3');
  //sounds.loop = true;
  sounds.play();
}

function goCave() {
  update(locations[2]);
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/cave.jpg')";
  let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/cavesounds.mp4');
  //sounds.loop = true;
  sounds.play();
}
//high pitched singing bowl zing dinking warm soft resonant harmonic
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/potion.png')";
  let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/potionsounds.mp4');
  //sounds.loop = true;
  sounds.play();
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/sell.jpg')";
  let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/coins.mp4');
  //sounds.loop = true;
  sounds.play();
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/slimer.jpg')";
  let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/slimer.mp4');
  //sounds.loop = true;
  sounds.play();
  goFight();
}

function fightBeast() {
  fighting = 1;
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/fangedbeast.jpg')";  
    let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/beastsounds.mp3');
  //sounds.loop = true;
  sounds.play();
  goFight();
}

function fightDragon() {
  fighting = 2;
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/dragon.jpg')";  
    let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/dragonsounds.mp4');
  //sounds.loop = true;
  sounds.play();
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You manage to deftly dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/gold.jpg')";  
    let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/coins.mp4');
  //sounds.loop = true;
  sounds.play();
  update(locations[4]);
}

function lose() {
  update(locations[5]);
  let scene = document.getElementById("images");
  scene.style.backgroundImage = "url('assets/images/death.jpg')";  
    let sounds = document.getElementById('audio');   
  sounds = new Audio('assets/sounds/losesounds.mp4');
  //sounds.loop = true;
  sounds.play();
  
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickSeven() {
  pick(7);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 7) {
    numbers.push(Math.floor(Math.random() * 14));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 7; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}