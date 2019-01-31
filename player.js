//Millenium Falcon
export default class Player {
  constructor(game) {
    this.game = game;
    this.height = 50; //height
    this.width = 50; //width
    this.position = {
      //position, start at middle-left of screen
      x: 20,
      y: game.gameheight / 2 - this.height / 2
    };
    this.speed = 0; //initial vertical speed
    this.jumpSpeed = -10; //jumping speed
    this.canJump = true; //used to prevent holdingdown of jump
    this.image = document.getElementById("falcon");
  }

  //draw player
  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width + 10,
      this.height
    );
  }

  //update player
  update() {
    //update speed and position
    this.speed += this.game.gravity;
    this.position.y += this.speed;

    //check if at top or bottom of screen, player cant go outside bounds
    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y + this.height > this.game.gameheight) {
      this.position.y = this.game.gameheight - this.height;
    }
  }

  //jump player, set speed
  jump() {
    if (this.canJump) {
      this.speed = this.jumpSpeed;
    }
  }
}
