import './style.css';

import WaveLine from './utils/FireWorks.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let dpr = window.devicePixelRatio || 1;

const wave = new WaveLine(ctx, 0, window.innerHeight / 2, window.innerWidth, {
  frequency: 0.05,
  magnitude: 100,
  altitude: 1,
  color: 'blue',
  width: 2,
  shadow: true,
  shadowConfig: {
    color: 'rgba(0, 0, 255, 0.5)',
    blur: 2,
    offsetX: 2,
    offsetY: 2
  }
});

function init() {
  resizeCanvas();
  animate();
}

function generateRainbowColor(hue) {
  return `hsl(${hue}, 100%, 50%)`;  // Retorna uma cor em formato HSL.
}

function draw() {
  wave.draw();
  wave.phase += Math.sin(0.01);
  const t = Date.now() * 0.0001; // tempo em segundos;
  const rainbowColor = generateRainbowColor((t * 360) % 360); // Gera uma cor do arco-íris com base no tempo.
  wave.frequency = (2) / 1000;
  wave.color = rainbowColor; 
}


function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

console.log(window.devicePixelRatio)
function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  draw();
  requestAnimationFrame(animate);
}
init();



document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.style.setProperty('--cor-primaria', '#e74c3c');

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", ({ clientX, clientY }) => {
  mouse.x = clientX ?? 0;
  mouse.y = clientY ?? 0;
  mouse.lastMove = Date.now();
  mousePerson.updatePosition(clientX, clientY);
});

setInterval(() => {
  if (Date.now() - mouse.lastMove > 1000) {
    mouse.x = undefined;
    mouse.y = undefined;
  }
}, 100);



