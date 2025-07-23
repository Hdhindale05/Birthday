const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function HeartParticle(x, y, angle, speed, color) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.speed = speed;
  this.color = color;
  this.alpha = 1;

  this.update = function () {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.02;
  };

  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(1.51, 1.51); // ~0.8cm scale (30.2px / 20px base)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
    ctx.bezierCurveTo(-5, 3, 0, 5, 0, 8);
    ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
    ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
    ctx.restore();
  };
}

let fireworks = [];

function launchHeartFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const color = `255,105,180`; // Pink
  const burst = [];

  for (let i = 0; i < 50; i++) {
    burst.push(new HeartParticle(
      x, y,
      Math.random() * 2 * Math.PI,
      Math.random() * 5 + 1,
      color
    ));
  }

  fireworks.push(burst);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((burst, index) => {
    burst.forEach(p => {
      p.update();
      p.draw();
    });
    if (burst[0].alpha <= 0) fireworks.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

setInterval(launchHeartFirework, 900);
animate();