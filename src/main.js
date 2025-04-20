import './style.css';

// Importações de classes
import QuadraticCurve from './utils/QuadraticBrezier.js';
import CustomPolygon from './utils/CustomPolygon.js';
import CurvedPolygon from './utils/CurvedPolygon.js';
import Circle from './utils/Circle.js';
import Polygon from './utils/Polygon.js';
import Retangle from './utils/RetangleRing.js';
import QuadrantGrid from './utils/Quadrants.js';
import Text3D from './utils/Text3D.js';
import Image from './utils/Image.js';
import LinearGradientRect from './utils/GradientRectangle.js';
import RadialGradientRectangle from './utils/RadialGradientRectangle.js';
import SegmentedLine from './utils/SegmentLine.js';
import CenterGradientRect from './utils/CenterGradient.js';
import Ring from './utils/Ring.js';
import Text from './utils/Text.js';
import QuadraticBezierCurve from './utils/QuadraticBrezier.js';
import Triangle from './utils/Trangle.js';
import Grid from './utils/Grid.js';
import Square from './utils/Square.js';
import CustomMouse from './utils/CustomMouse.js';
import Particle from './utils/Particle.js';
import Color from './utils/Color.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let dpr = window.devicePixelRatio || 1;
let radius = 2;

const points = [
  { x2: 100, y2: 100, color: "red", lineWidth: 2 },
  { x2: 150, y2: 50, color: "blue", lineWidth: 3, shadow: true, shadowColor: "rgba(0, 0, 255, 0.5)", shadowBlur: 10 },
  { x2: 200, y2: 150, color: "green" }
];

const circulos = []
const particulas = []
const mouse = {
  x: undefined,
  y: undefined
}
//                 CLASSES

for (let i = 0; i < 100; i++) {
  var radians = Math.random() * 2 * Math.PI;
  particulas.push(new Particle(ctx, 150, 150, 4,radians,
     (Math.random() * 100) + 100, (Math.random() * 100) + 100,{
    fillColor: Color.getRandomColorHexBetween(ctx, 
      "rgba(0, 2, 107, 0.14)", "rgba(0, 143, 209, 0.12)"),
      
    strokeColor: 'black',
    shadow:false
  }));
  
}
for (let i = 0; i < 1000; i++) {
  let x = Math.floor(Math.random() * innerWidth);
  let y = Math.floor(Math.random() * innerHeight);
  const ring = new Circle(ctx, Math.random() * window.innerWidth, Math.random() * window.innerWidth, 1, {
    fillColor: '#00ff0d%, 50.00%)',
    strokeColor: '#00ff0d',
    // strokeWidth: 2,
    // shadow: true,
    // shadowBlur: 10
})
  ring.vx = Math.random() / 4;
  ring.vy = Math.random() /4;
  circulos.push(ring);
}

const gradienteCentral = new CenterGradientRect(ctx, 760, 600, 300, 200, "#ffffff", "#0000ff", {
  shadow: true,
  shadowColor: "rgba(0,0,0,0.3)"
});

const mousePerson = new CustomMouse(ctx, {
  size: 22,
  color: "green",
  circle: true,
  shadow: true
});


const line = new SegmentedLine(ctx, 0, 0, points, true, "red", 5);

const texto = new Text(ctx, "Hello World!", 250, 100, {
  font: "24px Open Sans",
  color: "rgba(0, 255, 85, 0.88)",
  align: "center",
  shadow: true,
  shadowColor: "rgba(0, 255, 85, 0.88)",
  shadowBlur: 8,
})
const circulo = new Circle(ctx, 300, 300, 40, {
  fillColor: "yellow",
  strokeColor: "orange",
  strokeWidth: 3,
  shadow: true,
  shadowColor: "rgba(255, 165, 0, 0.6)",
  shadowBlur: 10,
});

const QuadGradiente = new QuadraticCurve(ctx, 50, 200, 150, 50, 250, 200, {
  strokeColor: "green",
  strokeWidth: 3,
  shadow: true,
  shadowColor: "rgba(0, 128, 11, 0.77)",
  shadowBlur: 10,
});

const bezier = new QuadraticBezierCurve(ctx, 50, 250, 100, 50, 200, 450, 300, 250, {
  strokeColor: "blue",
  strokeWidth: 4,
  shadow: true,
  shadowColor: "rgba(0,0,255,0.3)",
  shadowBlur: 6
});

const poligono = new Polygon(ctx, 400, 300, 90, 3, {
  fillColor: "#3498db",
  strokeColor: "#3a4450",
  lineWidth: 2,
  rotation: Math.PI / 6,
  shadow: true,
  shadowColor: "rgba(0, 247, 255, 0.57)",
  shadowBlur: 4,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});

const triangulo = new Triangle(ctx, 440, 150, 50, {
  fillColor: "orange",
  strokeColor: "brown",
  lineWidth: 3,
  rotation: Math.PI / 3,
  shadow: true
});

const quadrado = new Square(ctx, 150, 150, 100, {
  fillColor: "#8e44ad",
  rotation: Math.PI / 4,
  shadow: true
});
const PoligonoCustomizado = new CustomPolygon(ctx, [
  { x: 500, y: 100 },
  { x: 640, y: 120 },
  { x: 800, y: 200 },
  { x: 620, y: 180 }
], {
  fillColor: "lightgreen",
  strokeColor: "darkgreen",
  lineWidth: 2
})
const retangulo = new Retangle(ctx, 500, 300, 200, 150, 20, {
  fillColor: "#4CAF50",
  strokeColor: "#222",
  lineWidth: 2,
  shadow: true
});
const poligonoCurvado = new CurvedPolygon(ctx, [
  { x: 100, y: 150 },
  { x: 150, y: 100 },
  { x: 200, y: 150 },
  { x: 180, y: 200 },
  { x: 120, y: 200 }
], 20, {
  fillColor: "#3498db",
  strokeColor: "#2c3e50",
  lineWidth: 2,
  shadow: true
});
const grid = new Grid(ctx, 100, {
  strokeColor: "#181",
  lineWidth: 0.4,
  shadow: true
});
const quadrante = new QuadrantGrid(ctx, {
  strokeColor: "gray",
  lineWidth: 2,
  showLabels: false
});
const texto3D = new Text3D(ctx, "Olá, mundo 3D!", 100, 700, {
  font: "bold 50px Arial",
  textColor: "#FFD700",
  depthColor: "#B8860B",
  depth: 10,
  offsetX: 2,
  offsetY: 2
});
const Imagem = new Image(ctx, "/vite.svg", 200, 500, 150, 180, {
  shadow: true
});
const gradienteLinear = new LinearGradientRect(ctx, 400, 500, 300, 150, [
  { offset: 0, color: "#3498db" },
  { offset: 1, color: "#8e44ad" }
], "diagonal", {
  shadow: false,
});
const gradientRect = new RadialGradientRectangle(ctx, { shadow: true });
gradientRect.setRectOptions({
  x: 50,
  y: 50,
  width: 200,
  height: 150,
  colorStops: [
    { offset: 0, color: "yellow" },
    { offset: 1, color: "orange" }
  ]
});

function init() {
  resizeCanvas();
  animate();
}

function draw() {
  circulos.forEach((circle) => {
    circle.draw();
    circle.moveAndBounceInCanvas(canvas);
    circle.getColiderWithMouse(mouse.x, mouse.y, {
      pushForce: 2.7,
      sizeMouse: 30,
      decay: 0.959
    })
    circle.updateSizeForMouse(mouse, {
      minSize: 1.5,
      maxSize: 8,
      speedGrow: 2,
      speedShrink: 2,
      prox: 120
    });
    // ring.applyGravity({
    //   gravity: 1.1,
    //   ground: innerHeight,
    //   bounce: 0.1,
    //   friction: 0.9,
    //   delta: 0.4,
    //   tolerance: 0.3
    // });

  });

  

  
  mousePerson.draw();
  grid.draw();
  particulas.forEach((item) => {
    item.draw();
    item.animationCircular({
      velocity: 0.007,
        radius: item.randomBetween(15,20),
        center: {
            x: mouse.x,
            y: mouse.y
        }
    });
  });
  line.draw();
  texto.draw();
  // circulo.draw();
  // QuadGradiente.draw();
  // bezier.draw();
  // poligono.draw();
  // triangulo.draw();
  // quadrado.draw();
  // PoligonoCustomizado.draw();
  // retangulo.draw();
  // poligonoCurvado.draw();
  quadrante.draw();
  // texto3D.draw();
  // Imagem.draw();;
  // gradienteCentral.draw();
  // gradientRect.draw();
  // gradienteLinear.draw();
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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



