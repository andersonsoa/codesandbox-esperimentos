import "./styles.css";

const canvas = document.querySelector("canvas");
const pincel = canvas.getContext("2d");

pincel.fillStyle = "#232323";
pincel.fillRect(0, 0, 600, 500);

let drawing = false;
let size = 20;
let cur = { x: null, y: null };
let prev = { x: null, y: null };
let colorHue = 0;
let brush = "line";
let factor = 2;

const cricle = (x, y, size, color) => {
  pincel.fillStyle = color;
  pincel.strokeStyle = "#23232366";
  pincel.beginPath();
  pincel.arc(x, y, size, 0, 2 * Math.PI);
  pincel.fill();
  pincel.stroke();
};

const line = (curX, curY, prevX, prevY) => {
  pincel.strokeStyle = `hsl(${colorHue % 360}, 50%, 50%)`;
  pincel.lineWidth = 2;
  pincel.beginPath();
  pincel.moveTo(prevX, prevY);
  pincel.lineTo(curX, curY);
  pincel.stroke();
};

function startDrawing(event) {
  cur.x = event.offsetX;
  cur.y = event.offsetY;
  drawing = true;
}

function drawCircle(event) {
  if (drawing) {
    const x = event.offsetX;
    const y = event.offsetY;

    cricle(x, y, size, `hsl(${colorHue % 360}, 50%, 50%)`);

    colorHue += 2;
    size += factor;
    if (size > 40) factor *= -1;
    if (size < 20) factor *= -1;
  }
}

function drawLine({ offsetX, offsetY }) {
  if (drawing) {
    prev = { ...cur };
    cur = { x: offsetX, y: offsetY };
    line(cur.x, cur.y, prev.x, prev.y, "red");
    colorHue += 2;
  }
}

function endDrawing(event) {
  drawing = false;
}

function clearScreen() {
  canvas.width = 600;
  pincel.fillStyle = "#232323";
  pincel.fillRect(0, 0, 600, 500);
}

function switchBrush() {
  if (brush === "line") {
    brush = "circle";
    canvas.onmousemove = drawCircle;
  } else {
    brush = "line";
    canvas.onmousemove = drawLine;
  }
}

canvas.onmousedown = startDrawing;
canvas.onmousemove = drawLine;
canvas.onmouseup = endDrawing;
canvas.onmouseleave = endDrawing;

document.querySelector(".limpar").onclick = clearScreen;
document.querySelector(".pincel").onclick = switchBrush;
