import { detectCollision } from "./collision";

//Tie Fighters
export default class Obstacle {
  constructor(game, height, yPos, type) {
    this.height = height; //height
    this.width = 50; //width
    this.speed = 5; //speed it moves across screen
    this.position = {
      //position
      x: game.gamewidth,
      y: yPos
    };
    this.removeMe = false; //remove tag, true if off screen
    this.type = type; //top or bottom obstacle
    this.game = game;
    this.numTies = Math.ceil(height / 50); //number of tie fighters
    this.image = document.getElementById("tie");
  }

  //update obstacle
  update() {
    //update position
    this.position.x -= this.speed;

    //remove tag set if off screen
    if (this.position.x + this.width < 0) {
      this.removeMe = true;
    }

    //detect collision between player and object and set player to explosion
    if (detectCollision(this.game.player, this)) {
      this.game.collided = true;
      this.game.player.image = document.getElementById("explosion");
    }
  }

  //draw object
  draw(ctx) {
    //top object, draw ties from bottom-up
    if (this.type === 1) {
      for (let i = 0; i < this.numTies; i++) {
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y + this.height - 50 * (i + 1),
          50,
          50
        );
      }
      //bottom object, draw ties from top-down
    } else {
      for (let i = 0; i < this.numTies; i++) {
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y + 50 * i,
          50,
          50
        );
      }
    }
  }
}
