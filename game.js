import Player from "./player";
import Input from "./input";
import Obstacle from "./obstacle";

const GAMESTATE = {
  RUNNING: 1,
  PAUSED: 2,
  MENU: 3,
  GAMEOVER: 4
};

export default class Game {
  constructor(gamewidth, gameheight) {
    this.gameheight = gameheight;
    this.gamewidth = gamewidth;
    this.player = new Player(this);
    this.myinput = new Input(this, this.player);
    this.gameObjects = [this.player];
    this.gravity = 0.5;
    this.timePassed = 0;
    this.collided = false;
    this.gamestate = GAMESTATE.MENU;
    this.score = 0;
    this.backgroundImg = document.getElementById("background");
  }

  start(ctx) {
    this.buildObstacles();
    this.ctx = ctx;
  }

  update() {
    if (this.collided) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    if (this.gamestate !== GAMESTATE.RUNNING) {
      return;
    }

    this.timePassed += 1;
    this.score += 1;

    this.gameObjects.forEach(object => {
      object.update();
    });

    if (this.timePassed % 80 === 0) {
      this.buildObstacles();
    }

    this.gameObjects = this.gameObjects.filter(object => !object.removeMe);
  }

  draw(ctx) {
    ctx.drawImage(this.backgroundImg, 0, 0, this.gamewidth, this.gameheight);

    this.gameObjects.forEach(object => {
      object.draw(ctx);
    });

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "#fff";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ESC to Begin",
        this.gamewidth / 2,
        this.gameheight / 2
      );
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "SPACE to Jump",
        this.gamewidth / 2,
        this.gameheight / 2 + 50
      );
      ctx.fillText(
        "ESC to Pause",
        this.gamewidth / 2,
        this.gameheight / 2 + 100
      );
    } else if (this.gamestate === GAMESTATE.RUNNING) {
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.fillText(
        "Parsecs: " + this.score,
        this.gamewidth * 0.05,
        this.gameheight * 0.05
      );
    } else if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "#fff";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gamewidth / 2, this.gameheight / 2);
    } else if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "#fff";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gamewidth / 2, this.gameheight / 2);
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ESC to Restart",
        this.gamewidth / 2,
        this.gameheight / 2 + 50
      );
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "You made it " + this.score + " parsecs",
        this.gamewidth / 2,
        this.gameheight / 2 + 100
      );
    }
  }

  buildObstacles() {
    let space = Math.floor(Math.random() * 100 + 175);
    let height1 = Math.floor(Math.random() * (this.gameheight - space));
    let height2 = this.gameheight - height1 - space;
    let ypos1 = 0;
    let ypos2 = height1 + space;
    this.gameObjects.push(new Obstacle(this, height1, ypos1, 1));
    this.gameObjects.push(new Obstacle(this, height2, ypos2, 2));
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.RUNNING) {
      this.gamestate = GAMESTATE.PAUSED;
    } else if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) {
      this.gamestate = GAMESTATE.RUNNING;
    }
  }

  restart() {
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      this.ctx.clearRect(0, 0, this.gamewidth, this.gameheight);
      this.timePassed = 0;
      this.score = 0;
      this.collided = false;
      this.player.position = {
        x: 20,
        y: this.gameheight / 2 - this.player.height / 2
      };
      this.player.image = document.getElementById("falcon");
      this.gameObjects = [];
      this.gameObjects.push(this.player);
      this.start(this.ctx);
    }
  }
}
