import { detectCollision } from "./collision";

export default class Obstacle {
  constructor(game, height, yPos, type) {
    this.height = height;
    this.width = 50;
    this.speed = 5;
    this.position = {
      x: game.gamewidth,
      y: yPos
    };
    this.removeMe = false;
    this.type = type;
    this.game = game;
    this.numTies = Math.ceil(height / 50);
    this.image = document.getElementById("tie");
  }

  update() {
    this.position.x -= this.speed;

    if (this.position.x + this.width < 0) {
      this.removeMe = true;
    }

    if (detectCollision(this.game.player, this)) {
      this.game.collided = true;
      this.game.player.image = document.getElementById("explosion");
    }
  }

  draw(ctx) {
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
