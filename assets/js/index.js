const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const button = document.getElementById("start");

button.addEventListener("click", () => {
  if (game.started === false) {
    game.start();
  } else {
    game.pause();
  }
});
