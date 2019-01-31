//detects collision between player and another object
export function detectCollision(player, obstacle) {
  //player sides
  let playerTop = player.position.y;
  let playerBottom = player.position.y + player.height;
  let playerRight = player.position.x + player.width;
  let playerLeft = player.position.x;

  //object sides
  let obstacleTop = obstacle.position.y;
  let obstacleBottom = obstacle.position.y + obstacle.height;
  let obstacleLeft = obstacle.position.x;
  let obstacleRight = obstacle.position.x + obstacle.width;

  //detects collision of top of player with bottom of a top-obstacle
  if (
    obstacle.type === 1 &&
    playerTop >= obstacleTop &&
    playerTop < obstacleBottom &&
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight
  ) {
    return true;

    //detects collision of bottom of player with bottom of a bottom-obstacle
  } else if (
    obstacle.type === 2 &&
    playerBottom > obstacleTop &&
    playerBottom <= obstacleBottom &&
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight
  ) {
    return true;

    //detects collision of side of player with side of obstacle
  } else if (
    playerTop >= obstacleTop &&
    playerBottom <= obstacleBottom &&
    playerRight > obstacleLeft &&
    playerLeft < obstacleRight
  ) {
    return true;

    //detects collision of of player with reverse object
  } else if (
    obstacle.type === 3 &&
    ((playerTop >= obstacleTop &&
      playerTop <= obstacleBottom &&
      playerRight > obstacleLeft &&
      playerLeft < obstacleRight) ||
      (playerBottom >= obstacleTop &&
        playerBottom <= obstacleBottom &&
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight))
  ) {
    return true;

    //no collision
  } else {
    return false;
  }
}
