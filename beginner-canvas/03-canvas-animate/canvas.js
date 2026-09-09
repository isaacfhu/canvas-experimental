const canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");

class Circle {
  constructor(x = 200, y = 200, dx = 3, dy = 3, radius = 30) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    c.fill();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let circleArray = [];
for (let i = 0; i < 100; i++) {
  const radius = 30;
  const x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius);
  const y = Math.floor(Math.random() * (canvas.height - radius * 2) + radius);
  const dx = Math.random() - 0.5; // Math.random() - 0.5 => 50/50 chance get negative or positive value
  const dy = Math.random() - 0.5;

  // less efficient => creates new array
  //circleArray = [...circleArray, new Circle(x, y, dx, dy, radius)];
  circleArray.push(new Circle(x, y, dx, dy, radius));
}
console.log(circleArray);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

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
