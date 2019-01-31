export default class Input {
  constructor(game, player) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 32:
          player.jump();
          player.canJump = false;
          break;
        case 27:
          game.restart();
          game.togglePause();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 32:
          player.canJump = true;
          break;
      }
    });
  }
}
