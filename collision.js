export function detectCollision(player, obstacle) {
  let playerTop = player.position.y;
  let playerBottom = player.position.y + player.height;
  let playerRight = player.position.x + player.width;
  let playerLeft = player.position.x;

  let obstacleTop = obstacle.position.y;
  let obstacleBottom = obstacle.position.y + obstacle.height;
  let obstacleLeft = obstacle.position.x;
  let obstacleRight = obstacle.position.x + obstacle.width;

  if (
    obstacle.type === 1 &&
    playerTop >= obstacleTop &&
    playerTop < obstacleBottom &&
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight
  ) {
    return true;
  } else if (
    obstacle.type === 2 &&
    playerBottom > obstacleTop &&
    playerBottom <= obstacleBottom &&
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight
  ) {
    return true;
  } else if (
    playerTop >= obstacleTop &&
    playerBottom <= obstacleBottom &&
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight
  ) {
    return true;
  } else {
    return false;
  }
}
