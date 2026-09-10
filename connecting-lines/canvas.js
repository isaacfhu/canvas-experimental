const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

const baseRadius = 4;
const amountOfPoints = 50;
const maxConnectLineDistance = 100;

let pointArray = [];
class Point {
  constructor(
    x = 300,
    y = 300,
    dx = 1,
    dy = 1,
    radius = baseRadius,
    color = "white",
    lineRGB = "133, 188, 255",
    lineOpacity = 0.9,
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.gap = this.radius * 1.2;
    this.lineWidth = this.radius * 0.3;
    this.totalRadius = this.radius + this.gap + this.lineWidth / 2;
    this.color = color;
    this.lineRGB = lineRGB;
    this.lineBaseOpacity = lineOpacity;
  }

  draw() {
    c.beginPath();
    c.lineWidth = 12;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    c.beginPath();
    c.lineWidth = this.lineWidth;
    c.arc(this.x, this.y, this.radius + this.gap, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
  }

  update() {
    if (
      this.x + this.totalRadius > canvas.width ||
      this.x - this.totalRadius < 0
    )
      this.dx = -this.dx;
    if (
      this.y + this.totalRadius > canvas.height ||
      this.y - this.totalRadius < 0
    )
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function init() {
  pointArray = [];
  const speed = 0.2;

  for (let i = 0; i < amountOfPoints; i++) {
    const newPoint = new Point();
    const x = Math.floor(
      Math.random() * (canvas.width - newPoint.totalRadius * 2) +
        newPoint.totalRadius,
    );
    const y = Math.floor(
      Math.random() * (canvas.height - newPoint.totalRadius * 2) +
        newPoint.totalRadius,
    );

    const angle = Math.random() * Math.PI * 2;

    // *a*
    const dx = Math.cos(angle) * speed; // X speed ratio (-1 to 1) * speed
    const dy = Math.sin(angle) * speed;
    //

    newPoint.x = x;
    newPoint.y = y;
    newPoint.dx = dx;
    newPoint.dy = dy;

    pointArray.push(newPoint);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let prev = 0; prev < pointArray.length; prev++) {
    for (let next = prev + 1; next < pointArray.length; next++) {
      const distanceX = Math.abs(pointArray[prev].x - pointArray[next].x);
      const distanceY = Math.abs(pointArray[prev].y - pointArray[next].y);

      if (
        distanceX < maxConnectLineDistance &&
        distanceY < maxConnectLineDistance
      ) {
        const maxOffset = Math.max(distanceX, distanceY);
        const opacity =
          (1 - maxOffset / maxConnectLineDistance) *
          pointArray[prev].lineBaseOpacity;
        c.beginPath();
        c.strokeStyle = `rgba(${pointArray[prev].lineRGB}, ${opacity})`;
        c.lineWidth = pointArray[prev].lineWidth;
        c.moveTo(pointArray[prev].x, pointArray[prev].y);
        c.lineTo(pointArray[next].x, pointArray[next].y);
        c.stroke();
      }
    }
  }

  for (let i = 0; i < pointArray.length; i++) {
    pointArray[i].update();
  }
}

init();
animate();
