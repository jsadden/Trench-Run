import Player from "./player";
import Input from "./input";
import Obstacle from "./obstacle";
import Reverse from "./reverse";

//gamestates
const GAMESTATE = {
  RUNNING: 1,
  PAUSED: 2,
  MENU: 3,
  GAMEOVER: 4
};

export default class Game {
  constructor(gamewidth, gameheight) {
    this.gameheight = gameheight; //height
    this.gamewidth = gamewidth; //width
    this.player = new Player(this); //millenium falcon
    this.myinput = new Input(this, this.player); //input events
    this.gameObjects = [this.player]; //add player to object array
    this.gravity = 0.5; //acceleration
    this.timePassed = 0; //timer
    this.collided = false; //true if run into obstacle
    this.gamestate = GAMESTATE.MENU; //start at menu
    this.score = 0;
    this.backgroundImg = document.getElementById("background");
  }

  //start the game by setting the context and building the first obstacles
  start(ctx) {
    this.buildObstacles();
    this.ctx = ctx;
  }

  //update the game
  update() {
    //check for collision
    if (this.collided) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    //only update positions if game is running
    if (this.gamestate !== GAMESTATE.RUNNING) {
      return;
    }

    //increment score and time
    this.timePassed += 1;
    this.score += 1;

    //update each object
    this.gameObjects.forEach(object => {
      object.update();
    });

    //put in a new obstacle every 80 frames
    if (this.timePassed % 80 === 0) {
      this.buildObstacles();
    }

    //remove marked objects that go offscreen
    this.gameObjects = this.gameObjects.filter(object => !object.removeMe);
  }

  //draw the game
  draw(ctx) {
    //background image
    ctx.drawImage(this.backgroundImg, 0, 0, this.gamewidth, this.gameheight);

    //draw each object
    this.gameObjects.forEach(object => {
      object.draw(ctx);
    });

    //if menu state
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

      //if running state, update score
    } else if (this.gamestate === GAMESTATE.RUNNING) {
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.fillText(
        "Parsecs: " + this.score,
        this.gamewidth * 0.05,
        this.gameheight * 0.05
      );

      //if paused state
    } else if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "#fff";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gamewidth / 2, this.gameheight / 2);

      //if gameover state
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

  //building obstacles, calculates positions
  buildObstacles() {
    //calculate space between objects between 175-275 pixels
    let space = Math.floor(Math.random() * 100 + 175);

    //calculate heights of objects
    let height1 = Math.floor(Math.random() * (this.gameheight - space));
    let height2 = this.gameheight - height1 - space;

    //set y positions of objects and add them to game object array
    let ypos1 = 0;
    let ypos2 = height1 + space;
    this.gameObjects.push(new Obstacle(this, height1, ypos1, 1));
    this.gameObjects.push(new Obstacle(this, height2, ypos2, 2));

    //5% chance of adding a reverse object to the game, which reverses the gravity
    let reverseChance = Math.round(Math.random() * 100);
    if (reverseChance >= 95) {
      let ypos3 = Math.round(this.gameheight - height2 - space / 2);
      this.gameObjects.push(new Reverse(this, ypos3));
    }
  }

  //turn pause on and off
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

  //restart game after gameover state, resets game and player initial consitions
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
      this.player.jumpSpeed = -10;
      this.gravity = 0.5;
      this.gameObjects = [];
      this.gameObjects.push(this.player);
      this.start(this.ctx);
    }
  }
}
