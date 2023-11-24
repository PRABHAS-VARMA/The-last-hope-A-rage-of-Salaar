const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let score = 0;

canvas.width = 1519;

canvas.height = 729;
document.getElementById('backgroundMusic').play(); // Start playing background music
document.getElementById('backgroundMusic').volume = 0.5;
// document.addEventListener('keydown', function(event) {
//   var soundEffect = document.getElementById('soundEffect');
 
//   if (event.key === ' ') { // Replace ' ' with the key you want to trigger the sound effect
//      soundEffect.play();
//      document.removeEventListener('keydown', arguments.callee);
//   }
//  });
window.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
     playSound();
  }
 });
 
 function playSound() {
  const audio = new Audio('../backgroundSound/punch-1-166694.mp3');
  audio.play();
 }
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

const background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "../backgroundImg/for.png",
    
  })

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Idle.png",
  framesMax: 10,
  scale: 2.5
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "yellow",
  offset: {
    x: -50,
    y: 0,
  },
});

console.log(player);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

// let lastKey;//checkkkkkkk it bruh

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //Bahubali movement
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }

  // monster collision detection
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 4.5;
    document.querySelector("#monsterHealth").style.width = enemy.health + "%";

    score += 5;
    document.querySelector("#score").innerText = score;
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#BahubaliHealth").style.width = player.health + "%";
  }

  //end game
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "w":
      player.velocity.y = -15;
      break;
    case " ":
      player.attack();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lstKey = "ArrowRight";
      break;
  }
  console.log(keys.pressed);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
});
