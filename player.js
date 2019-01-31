export default class Player {
  constructor(game) {
    this.game = game;
    this.height = 50;
    this.width = 50;
    this.position = {
      x: 20,
      y: game.gameheight / 2 - this.height / 2
    };
    this.speed = 0;
    this.jumpSpeed = -10;
    this.canJump = true; //used to prevent holdingdown of jump
    this.image = document.getElementById("falcon");
  }

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

  update() {
    this.speed += this.game.gravity;
    this.position.y += this.speed;

    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y + this.height > this.game.gameheight) {
      this.position.y = this.game.gameheight - this.height;
    }
  }

  jump() {
    if (this.canJump) {
      this.speed = this.jumpSpeed;
    }
  }
}
