import Game from "./game";

//get canvas and its dimensions
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
let GAMEW = canvas.width;
let GAMEH = canvas.height;

//initialize game
let game = new Game(GAMEW, GAMEH);
game.start(ctx);

//game loop, clears canvas then redraws game
let lastTime = 0;
function loop(timeStamp) {
  let dt = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAMEW, GAMEH);

  game.update();
  game.draw(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
