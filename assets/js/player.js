class Player {
  constructor(ctx) {
    this.ctx = ctx;

    this.w = 100;
    this.h = 200;

    this.x = 0;
    this.y = 0;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0;
    this.ay = 1;

    this.img = new Image();
    this.img.frames = 3;
    this.img.frameIndex = 0;
    this.img.src = "/assets/images/mario.sprite.png";

    this.tick = 0;

    this.bullets = [];
  }

  move() {
    this.vy += this.ay;
    this.vx += this.ax;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.h >= this.ctx.canvas.height - 80) {
      this.vy = 0;
      this.y = this.ctx.canvas.height - this.h - 80;
      this.isJumping = false;
    }

    this.bullets.forEach((b) => b.move());

    // clear bullets to free memory
    this.bullets = this.bullets.filter((b) => b.x <= this.ctx.canvas.width);
  }

  draw() {
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);

    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex / this.img.frames) * this.img.width,
      0,
      (1 / this.img.frames) * this.img.width,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.tick++;

    if (this.tick > 10) {
      this.tick = 0;

      this.img.frameIndex++;
      if (this.img.frameIndex > 2) {
        this.img.frameIndex = 0;
      }
    }

    if (this.isJumping) {
      this.img.frameIndex = 2;
    }

    this.bullets.forEach((b) => b.draw());
  }

  onKeyDown(code) {
    switch (code) {
      case KEY_UP:
        this.jump();
        break;
      case KEY_RIGHT:
        this.vx = 5;
        break;
      case KEY_LEFT:
        this.vx = -5;
        break;
      case KEY_SPACE:
        this.fire();
        break;
    }
  }

  onKeyUp(code) {
    switch (code) {
      case KEY_RIGHT:
      case KEY_LEFT:
        this.vx = 0;
        break;
    }
  }

  fire() {
    const bullet = new Bullet(this.ctx, this.x + this.w, this.y + this.h / 2);

    this.bullets.push(bullet);
  }

  collides(el) {
    const colX = el.x <= this.x + this.w && el.x + el.w >= this.x;
    const colY = el.y <= this.y + this.h && el.y + el.h >= this.y;

    return colX && colY;
  }

  jump() {
    if (!this.isJumping) {
      this.vy -= 30;
      this.isJumping = true;
    }
  }
}
