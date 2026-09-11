import { randomIntFromRange } from "../../../00-canvas-boilerplate/src/js/utils";
import utils, { randomColor } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

const gravity = 1;
const friction = 0.99;

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => {
  init();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    // y axis
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    // x axis
    if (
      // >= and <= not necessary(very minor improvement)
      // can replace both with > and < instead
      this.x + this.radius + this.dx >= canvas.width ||
      this.x - this.radius + this.dx <= 0
    ) {
      this.dx = -this.dx * friction;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let ball;
// Implementation
let ballArray = [];
function init() {
  ballArray = [];

  for (let i = 0; i < 400; i++) {
    const dx = randomIntFromRange(-2, 2);
    const dy = randomIntFromRange(-2, 2);
    const radius = randomIntFromRange(8, 20);
    const color = randomColor(colors);

    const x = randomIntFromRange(radius, canvas.width - radius);
    // = randomIntFromRange(0 + radius, canvas.width - radius);
    const y = randomIntFromRange(radius, canvas.height - radius);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
  console.log(ballArray);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  ballArray.forEach((ball) => {
    ball.update();
  });
  /* // OR:
    for (let i = 0; i < ballArray.length; i++) {
      ballArray[i].update()
    }
  */
}

init();
animate();
