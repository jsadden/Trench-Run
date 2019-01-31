import { detectCollision } from "./collision";

//Reverse object, reverses gravity
export default class Reverse {
  constructor(game, yPos) {
    this.height = 50; //height
    this.width = 50; //width
    this.image = document.getElementById("reverse");
    this.game = game;
    this.position = {
      //position
      x: game.gamewidth + 80,
      y: yPos - this.height / 2
    };
    this.removeMe = false; //remove tag, true if hit by player
    this.speed = 5; //speed it moves across screen
    this.type = 3; //type of obstacle, passed to collision detection
  }

  //update object
  update() {
    //update position
    this.position.x -= this.speed;

    //remove this if it goes off screen
    if (this.position.x + this.width < 0) {
      this.removeMe = true;
    }

    //remove this if hit and reverse gravity and direction of player jump
    if (detectCollision(this.game.player, this)) {
      this.removeMe = true;
      this.game.gravity = -this.game.gravity;
      this.game.player.jumpSpeed = -this.game.player.jumpSpeed;
    }
  }

  //draw object
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
