const player = {
  sprite: null,
  animationSpeed: 0.5,
  sheet: null,
  sheetURL: '2.json',
  animations: {
    E: null,
    N: null,
    NE: null,
    NW: null,
    S: null,
    SE: null,
    SW: null,
    W: null
  },
  movment: {
    stopLastAnimation() {
      player.sprite.children.forEach(element => {
        element.stop()
        element.visible = false
      })
    },
    setLeft() {
      let animation = player.sprite.children[player.animations['W']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setUpLeft() {
      let animation = player.sprite.children[player.animations['NW']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setUpRight() {
      let animation = player.sprite.children[player.animations['NE']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setDownLeft() {
      let animation = player.sprite.children[player.animations['SW']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setDownRight() {
      let animation = player.sprite.children[player.animations['SE']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setRight() {
      let animation = player.sprite.children[player.animations['E']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setDown() {
      let animation = player.sprite.children[player.animations['S']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    },
    setUp() {
      let animation = player.sprite.children[player.animations['N']]
      this.stopLastAnimation()
      animation.play()
      animation.visible = true
    }
  }
}

export default player
