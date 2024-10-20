class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.player = new Player(ctx);
    this.background = new Background(ctx);
    this.enemies = [new Enemy(ctx)];

    this.interval = null;
    this.started = false;

    this.setListeners();

    this.audio = new Audio("/assets/audio/mw-theme.mp3");
    this.audio.volume = 0.05;
  }

  start() {
    this.audio.play();
    this.started = true;
    let tick = 0;

    this.interval = setInterval(() => {
      this.clear();

      this.move();

      this.draw();

      this.checkCollisions();

      tick++;

      if (tick >= 300) {
        tick = 0;
        this.addEnemy();
      }
    }, 1000 / 60);
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.player.collides(enemy)) {
        this.gameOver();
      }

      this.player.bullets.forEach((b) => {
        if (b.collides(enemy)) {
          // remove enemy from array
          this.enemies = this.enemies.filter((e) => e !== enemy);
        }
      });
    });
  }

  gameOver() {
    const audio = new Audio("/assets/audio/gameover.mp3");

    audio.volume = 0.05;

    audio.play();

    this.pause();
  }

  addEnemy() {
    const newEnemy = new Enemy(this.ctx);
    this.enemies.push(newEnemy);

    this.enemies = this.enemies.filter((e) => e.x + e.w > 0);

    console.log(this.enemies.length);
  }

  pause() {
    this.audio.pause();
    this.started = false;
    clearInterval(this.interval);
  }

  draw() {
    this.background.draw();
    this.enemies.forEach((e) => e.draw());
    this.player.draw();
  }

  move() {
    this.background.move();
    this.enemies.forEach((e) => e.move());
    this.player.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  setListeners() {
    document.addEventListener("keydown", (event) => {
      this.player.onKeyDown(event.keyCode);
    });

    document.addEventListener("keyup", (event) => {
      this.player.onKeyUp(event.keyCode);
    });
  }
}
