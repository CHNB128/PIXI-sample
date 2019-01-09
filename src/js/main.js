import * as PIXI from 'pixi.js'
import keyboard from './keyboard.js'
import player from './player.js'

const app = new PIXI.Application()
const loader = new PIXI.loaders.Loader()
const sprites = {}
document.body.appendChild(app.view)

function keyboardSetup() {
  const left = keyboard('ArrowLeft')
  const up = keyboard('ArrowUp')
  const right = keyboard('ArrowRight')
  const down = keyboard('ArrowDown')

  left.press = () => {
    player.sprite.vx = -1
    if (down.isDown) {
      player.movment.setDownLeft()
      player.sprite.vy = 1
    } else if (up.isDown) {
      player.movment.setUpLeft()
      player.sprite.vy = -1
    } else {
      player.movment.setLeft()
      player.sprite.vy = 0
    }
  }
  left.release = () => {
    if (up.isDown) {
      player.movment.setUp()
      player.sprite.vx = 0
    } else if (down.isDown) {
      player.movment.setDown()
      player.sprite.vx = 0
    } else if (right.isDown) {
      player.movment.setRight()
      player.sprite.vx = -player.sprite.vx
    } else {
      player.sprite.vx = 0
      player.sprite.vy = 0
    }
  }

  up.press = () => {
    player.sprite.vy = -1
    if (right.isDown) {
      player.movment.setUpRight()
      player.sprite.vx = 1
    } else if (left.isDown) {
      player.movment.setUpLeft()
      player.sprite.vx = -1
    } else {
      player.movment.setUp()
      player.sprite.vx = 0
    }
  }
  up.release = () => {
    if (left.isDown) {
      player.movment.setLeft()
      player.sprite.vy = 0
    } else if (down.isDown) {
      player.movment.setDown()
      player.sprite.vy = -player.sprite.vy
    } else if (right.isDown) {
      player.movment.setRight()
      player.sprite.vy = 0
    } else {
      player.sprite.vx = 0
      player.sprite.vy = 0
    }
  }

  right.press = () => {
    player.sprite.vx = 1
    if (up.isDown) {
      player.movment.setUpRight()
      player.sprite.vy = -1
    } else if (down.isDown) {
      player.movment.setDownRight()
      player.sprite.vy = 1
    } else {
      player.movment.setRight()
      player.sprite.vy = 0
    }
  }
  right.release = () => {
    if (up.isDown) {
      player.movment.setUp()
      player.sprite.vx = 0
    } else if (down.isDown) {
      player.movment.setDown()
      player.sprite.vx = 0
    } else if (left.isDown) {
      player.movment.setLeft()
      player.sprite.vx = -player.sprite.vx
    } else {
      player.sprite.vx = 0
      player.sprite.vy = 0
    }
  }

  down.press = () => {
    player.sprite.vy = 1
    if (left.isDown) {
      player.movment.setDownLeft()
      player.sprite.vx = -1
    } else if (right.isDown) {
      player.movment.setDownRight()
      player.sprite.vx = 1
    } else {
      player.movment.setDown()
      player.sprite.vx = 0
    }
  }
  down.release = () => {
    if (left.isDown) {
      player.movment.setLeft()
      player.sprite.vy = 0
    } else if (up.isDown) {
      player.movment.setUp()
      player.sprite.vy = -player.sprite.vy
    } else if (right.isDown) {
      player.movment.setRight()
      player.sprite.vy = 0
    } else {
      player.sprite.vx = 0
      player.sprite.vy = 0
    }
  }
}

function loadPlayer(loader, resources) {
  player.sheet = resources.player.spritesheet

  let movment = new PIXI.Container()
  Array('E', 'N', 'NE', 'NW', 'S', 'SE', 'SW', 'W').forEach((entry, index) => {
    let frames = []
    let animation
    for (let i = 0; i < 39; i++) {
      let val = i < 10 ? '_000' + i : '_00' + i
      frames.push(
        PIXI.Texture.fromFrame('woman_walk_def_' + entry + val + '.png')
      )
    }
    animation = new PIXI.extras.AnimatedSprite(frames)
    animation.animationSpeed = player.animationSpeed
    animation.visible = false
    movment.addChildAt(animation, index)
    player.animations[entry] = index
  })

  movment.vx = 0
  movment.vy = 0
  movment.x = app.screen.width / 2
  movment.y = app.screen.height / 2

  player.sprite = movment
  app.stage.addChild(movment)
}

function loadLand(loader, resources) {
  sprites.land = new PIXI.Sprite(resources.land.texture)
  app.stage.addChild(sprites.land)
}

function gameLoop(delta) {
  player.sprite.x += player.sprite.vx * delta * 0.5
  player.sprite.y += player.sprite.vy * delta * 0.5
}

loader
  .add('player', player.sheetURL)
  .add('land', 'land.png')
  .load((loader, resources) => {
    loadLand(loader, resources)
    loadPlayer(loader, resources)
    keyboardSetup()
    player.sprite.children[0].visible = true
    player.sprite.children[0].play()
    app.ticker.add(delta => gameLoop(delta))
  })
