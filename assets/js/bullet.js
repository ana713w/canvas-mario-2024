class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.r = 10;
    this.x = x;
    this.y = y;

    this.vx = 30;
    this.vy = 0;

    this.ax = -0.01;
    this.ay = 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  move() {
    this.vx += this.ax;
    this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= this.ctx.canvas.height - 80) {
      this.vy *= -1;
    }
  }

  collides(el) {
    const colX = this.x + this.r >= el.x && this.x - this.r <= el.x + el.w;
    const colY = this.y + this.r >= el.y && this.y <= el.y + el.h;

    return colX && colY;
  }
}
