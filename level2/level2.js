const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let score = 0
let lastKey;


canvas.width = 1519

canvas.height = 729
c.fillRect(0, 0, canvas.width, canvas.height)

document.getElementById('backgroundMusic').play() // Start playing background music
document.getElementById('backgroundMusic').volume = 1
// document.addEventListener('keydown', function(event) {
//   var soundEffect = document.getElementById('soundEffect');

//   if (event.key === ' ') { // Replace ' ' with the key you want to trigger the sound effect
//      soundEffect.play();
//      document.removeEventListener('keydown', arguments.callee);
//   }
//  });
window.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    playSound()
  }
})

function playSound() {
  const audio = new Audio('../backgroundSound/punch-1-166694.mp3')
  audio.play()
}

const gravity = 0.8

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: '../backgroundImg/frozen.png'
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc:
    '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Idle.png',
  framesMax: 10,
  scale: 2.5,
  offset: {
    x: 50,
    y: 105
  },
  sprites: {
    idle: {
      imageSrc:
        '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc:
        '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Attack1.png',
      framesMax: 7
    },
    takeHit: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/FantasyWarrior/Sprites/Death.png',
      framesMax: 7
    }
    
  },

  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }

})

const enemy = new Fighter({
  position: {
    x: 1300,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 100
  },
  sprites: {
    idle: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Idle.png',
      framesMax: 4
    },
    jump: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Idle.png',
      framesMax: 4
    },
    fall: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Idle.png',
      framesMax: 4
    },
    attack1: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Attack.png',
      framesMax: 8
    },
    takeHit: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: '../img/FantasyWarrior/FantasyWarrior/Sprites/Monsters_Creatures_Fantasy/Goblin/Death.png',
      framesMax: 4
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

enemy.flipHorizontal = true;

console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  // ArrowRight: {
  //   pressed: false
  // },
  // ArrowLeft: {
  //   pressed: false
  // }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update();

  player.velocity.x = 0
  enemy.velocity.x = 0

  //Bahubali movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5
    player.switchSprite("run")
 } else if (keys.d.pressed && player.lastKey ==="d") {
    player.velocity.x = 5
    player.switchSprite("run")
  } else{
    player.switchSprite("idle")

  }

  // jumping
  if (player.velocity.y<0){
    player.switchSprite("jump")
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

    // Enemy movement

  // if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
  //   enemy.velocity.x = -5
  //   enemy.switchSprite('idle')
  // } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
  //   enemy.velocity.x = 5
  //   enemy.switchSprite('idle')
  // } else {
  //   enemy.switchSprite('idle')
  // }


   // jumping
   if (enemy.velocity.y < 0) {
    enemy.switchSprite('idle')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('idle')
  }

  // monster collision detection
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking&&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false
    enemy.health -= 3.5
    document.querySelector("#monsterHealth").style.width = enemy.health + "%";

    
    score += 5
    document.querySelector('#score').innerText = score
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

    // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit2()
    enemy.isAttacking = false

    player.health -= 10
    document.querySelector("#BahubaliHealth").style.width = player.health + "%";

    
  }

  
  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  //end game
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
      case ' ':
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      // case 'ArrowRight':
      //   keys.ArrowRight.pressed = true
      //   enemy.lastKey = 'ArrowRight'
      //   break
      // case 'ArrowLeft':
      //   keys.ArrowLeft.pressed = true
      //   enemy.lastKey = 'ArrowLeft'
      //   break
      // case 'ArrowUp':
      //   enemy.velocity.y = -20
      //   break
      case 'ArrowDown':
        enemy.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    
  }
  // enemy keys
//   switch (event.key) {
//     case 'ArrowRight':
//       keys.ArrowRight.pressed = false
//       break
//     case 'ArrowLeft':
//       keys.ArrowLeft.pressed = false
//       break

// }
})
