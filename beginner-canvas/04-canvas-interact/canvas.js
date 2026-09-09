const canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

const mouse = {
  x: undefined,
  y: undefined,
};
const maxRadius = 40;
// const minRadius = 2;
const mouseRadius = 50;
const colorArray = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

class Circle {
  constructor(x = 200, y = 200, dx = 3, dy = 3, radius = 2) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < mouseRadius &&
      mouse.x - this.x > -mouseRadius &&
      mouse.y - this.y < mouseRadius &&
      mouse.y - this.y > -mouseRadius
    ) {
      if (this.radius < maxRadius) this.radius++;
    } else if (this.radius > this.minRadius) {
      this.radius--;
    }

    this.draw();
  }
}

let circleArray = [];

function init() {
  circleArray = [];

  for (let i = 0; i < 800; i++) {
    const radius = Math.random() * 3 + 1; // max radius = 4 / min radius = 1
    const x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
    const y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
    const dx = Math.random() - 0.5; // Math.random() - 0.5 => 50/50 chance get negative or positive value
    const dy = Math.random() - 0.5;

    // less efficient => creates new array
    //circleArray = [...circleArray, new Circle(x, y, dx, dy, radius)];
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();

/* 02-canvas-draw
c.fillStyle = "rgba(255, 0, 0, 0.5)"; // any css color (rgba(), #ffffff, etc.)
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0, 0, 255, 0.5)"; // any css color (rgba(), #ffffff, etc.)
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(0, 255, 0, 0.5)"; // any css color (rgba(), #ffffff, etc.)
c.fillRect(300, 300, 100, 100);

// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3"; // any css color
c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

for (let i = 0; i < 5; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  c.strokeStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.stroke();
*/
