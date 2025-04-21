# WebCanvas - Interactive Canvas Graphics Library

A lightweight, modular canvas graphics library built with Vite and Vanilla JavaScript that makes creating interactive canvas animations simple and intuitive.

![WebCanvas Demo](https://via.placeholder.com/800x400?text=WebCanvas+Demo)

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Basic Setup](#basic-setup)
- [Core Concepts](#core-concepts)
  - [Canvas Setup](#canvas-setup)
  - [Animation Loop](#animation-loop)
  - [Responsive Canvas](#responsive-canvas)
- [Shape Library](#shape-library)
  - [Basic Shapes](#basic-shapes)
  - [Complex Shapes](#complex-shapes)
  - [Text and Images](#text-and-images)
  - [Gradients and Effects](#gradients-and-effects)
- [Interactivity](#interactivity)
  - [Mouse Interactions](#mouse-interactions)
  - [Particle Systems](#particle-systems)
  - [Physics](#physics)
- [Advanced Examples](#advanced-examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Introduction

WebCanvas is a versatile canvas graphics library that provides a collection of ready-to-use components for creating interactive graphics, visualizations, and animations. Built with modern JavaScript and bundled with Vite, it offers an easy way to add dynamic visual elements to your web projects.

## Getting Started

### Installation

This project uses Vite as a build tool. To create a new project:

```bash
# Create a new project with Vite
npm create vite@latest my-webcanvas-project -- --template vanilla

# Navigate to project directory
cd my-webcanvas-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Basic Setup

Create a basic canvas setup in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WebCanvas Demo</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script type="module" src="/main.js"></script>
</body>
</html>
```

## Core Concepts

### Canvas Setup

Setting up your canvas with proper device pixel ratio handling:

```javascript
// main.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Handle high DPI displays
let dpr = window.devicePixelRatio || 1;

function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

// Initialize canvas
function init() {
  resizeCanvas();
  animate();
}

// Listen for window resize
window.addEventListener("resize", resizeCanvas);

init();
```

### Animation Loop

Creating a smooth animation loop:

```javascript
function draw() {
  // Your drawing code here
  // Example:
  ctx.fillStyle = 'blue';
  ctx.fillRect(100, 100, 200, 100);
}

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw your scene
  draw();
  
  // Request next frame
  requestAnimationFrame(animate);
}
```

### Responsive Canvas

Making sure your canvas looks good on all devices:

```javascript
// Ensure canvas is always full window size
function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

window.addEventListener("resize", resizeCanvas);
```

## Shape Library

WebCanvas comes with a rich collection of shape utilities that make it easy to create and animate various graphics.

### Basic Shapes

Create fundamental shapes with ease:

#### Circle

```javascript
import Circle from './utils/Circle.js';

// Create a circle with position, radius and styling
const circle = new Circle(ctx, 300, 300, 40, {
  fillColor: "yellow",
  strokeColor: "orange",
  strokeWidth: 3,
  shadow: true,
  shadowColor: "rgba(255, 165, 0, 0.6)",
  shadowBlur: 10,
});

// Draw the circle
circle.draw();
```

#### Square

```javascript
import Square from './utils/Square.js';

const square = new Square(ctx, 150, 150, 100, {
  fillColor: "#8e44ad",
  rotation: Math.PI / 4,
  shadow: true
});

square.draw();
```

#### Triangle

```javascript
import Triangle from './utils/Triangle.js';

const triangle = new Triangle(ctx, 440, 150, 50, {
  fillColor: "orange",
  strokeColor: "brown",
  lineWidth: 3,
  rotation: Math.PI / 3,
  shadow: true
});

triangle.draw();
```

### Complex Shapes

Create more advanced shapes:

#### Polygon

```javascript
import Polygon from './utils/Polygon.js';

const polygon = new Polygon(ctx, 400, 300, 90, 5, { // x, y, radius, sides
  fillColor: "#3498db",
  strokeColor: "#3a4450",
  lineWidth: 2,
  rotation: Math.PI / 6,
  shadow: true
});

polygon.draw();
```

#### Custom Polygon

```javascript
import CustomPolygon from './utils/CustomPolygon.js';

const customPolygon = new CustomPolygon(ctx, [
  { x: 500, y: 100 },
  { x: 640, y: 120 },
  { x: 800, y: 200 },
  { x: 620, y: 180 }
], {
  fillColor: "lightgreen",
  strokeColor: "darkgreen",
  lineWidth: 2
});

customPolygon.draw();
```

#### Curved Polygon

```javascript
import CurvedPolygon from './utils/CurvedPolygon.js';

const curvedPolygon = new CurvedPolygon(ctx, [
  { x: 100, y: 150 },
  { x: 150, y: 100 },
  { x: 200, y: 150 },
  { x: 180, y: 200 },
  { x: 120, y: 200 }
], 20, { // points, curve radius, style options
  fillColor: "#3498db",
  strokeColor: "#2c3e50",
  lineWidth: 2,
  shadow: true
});

curvedPolygon.draw();
```

#### Bezier Curves

```javascript
import QuadraticBezierCurve from './utils/QuadraticBrezier.js';

const bezier = new QuadraticBezierCurve(ctx, 50, 250, 100, 50, 200, 450, 300, 250, {
  strokeColor: "blue",
  strokeWidth: 4,
  shadow: true,
  shadowColor: "rgba(0,0,255,0.3)",
  shadowBlur: 6
});

bezier.draw();
```

### Text and Images

Add text and images to your canvas:

#### Text

```javascript
import Text from './utils/Text.js';

const text = new Text(ctx, "Hello World!", 250, 100, {
  font: "24px Open Sans",
  color: "rgba(0, 255, 85, 0.88)",
  align: "center",
  shadow: true,
  shadowColor: "rgba(0, 255, 85, 0.88)",
  shadowBlur: 8,
});

text.draw();
```

#### 3D Text

```javascript
import Text3D from './utils/Text3D.js';

const text3D = new Text3D(ctx, "Hello, 3D World!", 100, 700, {
  font: "bold 50px Arial",
  textColor: "#FFD700",
  depthColor: "#B8860B",
  depth: 10,
  offsetX: 2,
  offsetY: 2
});

text3D.draw();
```

#### Images

```javascript
import Image from './utils/Image.js';

const image = new Image(ctx, "/vite.svg", 200, 500, 150, 180, {
  shadow: true
});

image.draw();
```

### Gradients and Effects

Add beautiful gradients and visual effects:

#### Linear Gradient

```javascript
import LinearGradientRect from './utils/GradientRectangle.js';

const linearGradient = new LinearGradientRect(ctx, 400, 500, 300, 150, [
  { offset: 0, color: "#3498db" },
  { offset: 1, color: "#8e44ad" }
], "diagonal", {
  shadow: false,
});

linearGradient.draw();
```

#### Radial Gradient

```javascript
import RadialGradientRectangle from './utils/RadialGradientRectangle.js';

const radialGradient = new RadialGradientRectangle(ctx, { shadow: true });
radialGradient.setRectOptions({
  x: 50,
  y: 50,
  width: 200,
  height: 150,
  colorStops: [
    { offset: 0, color: "yellow" },
    { offset: 1, color: "orange" }
  ]
});

radialGradient.draw();
```

#### Center Gradient

```javascript
import CenterGradientRect from './utils/CenterGradient.js';

const centerGradient = new CenterGradientRect(ctx, 760, 600, 300, 200, "#ffffff", "#0000ff", {
  shadow: true,
  shadowColor: "rgba(0,0,0,0.3)"
});

centerGradient.draw();
```

## Interactivity

WebCanvas makes it easy to add interactive elements to your canvas.

### Mouse Interactions

Track and respond to mouse events:

```javascript
import CustomMouse from './utils/CustomMouse.js';

const mouse = {
  x: undefined,
  y: undefined,
  lastMove: Date.now()
};

const mouseCursor = new CustomMouse(ctx, {
  size: 22,
  color: "green",
  circle: true,
  shadow: true
});

// Update mouse position
window.addEventListener("mousemove", ({ clientX, clientY }) => {
  mouse.x = clientX;
  mouse.y = clientY;
  mouse.lastMove = Date.now();
  mouseCursor.updatePosition(clientX, clientY);
});

// Handle mouse inactivity
setInterval(() => {
  if (Date.now() - mouse.lastMove > 1000) {
    mouse.x = undefined;
    mouse.y = undefined;
  }
}, 100);

// In animation loop
function draw() {
  // Draw custom mouse cursor
  mouseCursor.draw();
  
  // Other drawing code...
}
```

### Particle Systems

Create dynamic particle effects:

```javascript
import Particle from './utils/Particle.js';
import Color from './utils/Color.js';

const particles = [];

// Create particles
for (let i = 0; i < 100; i++) {
  var radians = Math.random() * 2 * Math.PI;
  particles.push(new Particle(ctx, 150, 150, 4, radians,
     (Math.random() * 100) + 100, (Math.random() * 100) + 100, {
    fillColor: Color.getRandomColorHexBetween(ctx, 
      "rgba(0, 2, 107, 0.14)", "rgba(0, 143, 209, 0.12)"),
    strokeColor: 'black',
    shadow: false
  }));
}

// In animation loop
function draw() {
  particles.forEach((particle) => {
    particle.draw();
    particle.animationCircular({
      velocity: 0.007,
      radius: particle.randomBetween(15, 20),
      center: {
        x: mouse.x || canvas.width / 2,
        y: mouse.y || canvas.height / 2
      }
    });
  });
  
  // Other drawing code...
}
```

### Physics

Add basic physics to your objects:

```javascript
import Circle from './utils/Circle.js';

const circles = [];

// Create circles with physics properties
for (let i = 0; i < 1000; i++) {
  const circle = new Circle(ctx, 
    Math.random() * window.innerWidth, 
    Math.random() * window.innerHeight, 
    1, {
      fillColor: '#00ff0d',
      strokeColor: '#00ff0d',
  });
  
  // Add velocity
  circle.vx = Math.random() / 4;
  circle.vy = Math.random() / 4;
  circles.push(circle);
}

// In animation loop
function draw() {
  circles.forEach((circle) => {
    circle.draw();
    circle.moveAndBounceInCanvas(canvas);
    
    // Collision detection with mouse
    circle.getColiderWithMouse(mouse.x, mouse.y, {
      pushForce: 2.7,
      sizeMouse: 30,
      decay: 0.959
    });
    
    // Dynamic sizing based on mouse proximity
    circle.updateSizeForMouse(mouse, {
      minSize: 1.5,
      maxSize: 8,
      speedGrow: 2,
      speedShrink: 2,
      prox: 120
    });
    
    // Optional: Apply gravity
    /*
    circle.applyGravity({
      gravity: 1.1,
      ground: innerHeight,
      bounce: 0.1,
      friction: 0.9,
      delta: 0.4,
      tolerance: 0.3
    });
    */
  });
  
  // Other drawing code...
}
```

## Advanced Examples

### Grid System

Create background grids for your canvas:

```javascript
import Grid from './utils/Grid.js';
import QuadrantGrid from './utils/Quadrants.js';

// Simple grid
const grid = new Grid(ctx, 100, { // cell size
  strokeColor: "#181",
  lineWidth: 0.4,
  shadow: true
});

// Quadrant grid (Cartesian coordinates)
const quadrants = new QuadrantGrid(ctx, {
  strokeColor: "gray",
  lineWidth: 2,
  showLabels: false
});

// In draw function
function draw() {
  grid.draw();
  quadrants.draw();
  
  // Other drawing code...
}
```

### Segmented Line

Create connected line segments:

```javascript
import SegmentedLine from './utils/SegmentLine.js';

const points = [
  { x2: 100, y2: 100, color: "red", lineWidth: 2 },
  { x2: 150, y2: 50, color: "blue", lineWidth: 3, shadow: true, shadowColor: "rgba(0, 0, 255, 0.5)", shadowBlur: 10 },
  { x2: 200, y2: 150, color: "green" }
];

const line = new SegmentedLine(ctx, 0, 0, points, true, "red", 5);

// In draw function
function draw() {
  line.draw();
  
  // Other drawing code...
}
```

## API Reference

For detailed documentation on each component, see the individual class files in the `/utils` directory.

Common properties that most shape classes accept:

- `fillColor`: Fill color (hex, rgb, rgba)
- `strokeColor`: Stroke/outline color
- `strokeWidth`/`lineWidth`: Width of the outline
- `rotation`: Rotation in radians
- `shadow`: Boolean to enable shadow
- `shadowColor`: Shadow color
- `shadowBlur`: Shadow blur amount
- `shadowOffsetX`: Shadow X offset
- `shadowOffsetY`: Shadow Y offset

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues if you have suggestions or find bugs.

## License

[MIT License](LICENSE)
