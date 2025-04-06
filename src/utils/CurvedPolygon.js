/**
 * Desenha um polígono com cantos suavizados usando curvas cúbicas de Bézier.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {Array<{x: number, y: number}>} points - Lista de pontos (vértices).
 * @param {number} [radius=10] - Raio da curva dos cantos.
 * @param {Object} options - Estilos opcionais.
 */
export default class CurvedPolygon {
  constructor(ctx, points, radius = 10, options = {}) {
    this.ctx = ctx;
    this.points = points;
    this.radius = radius;

    this.fillColor = options.fillColor ?? null;
    this.strokeColor = options.strokeColor ?? "black";
    this.lineWidth = options.lineWidth ?? 1;

    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  update(properties = {}) {
    Object.assign(this, properties);
  }

  draw() {
    const ctx = this.ctx;
    const points = this.points;
    const radius = this.radius;

    if (!points || points.length < 3) return;

    const getDistance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const getAngle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

    ctx.beginPath();

    if (this.shadow) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
    } else {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const prev = points[(i - 1 + points.length) % points.length];
      const next = points[(i + 1) % points.length];

      const prevAngle = getAngle(current, prev);
      const nextAngle = getAngle(current, next);

      const prevDist = Math.min(getDistance(current, prev) / 2, radius);
      const nextDist = Math.min(getDistance(current, next) / 2, radius);

      const startX = current.x + Math.cos(prevAngle) * prevDist;
      const startY = current.y + Math.sin(prevAngle) * prevDist;
      const endX = current.x + Math.cos(nextAngle) * nextDist;
      const endY = current.y + Math.sin(nextAngle) * nextDist;

      const cp1X = current.x + Math.cos(prevAngle) * (prevDist / 2);
      const cp1Y = current.y + Math.sin(prevAngle) * (prevDist / 2);
      const cp2X = current.x + Math.cos(nextAngle) * (nextDist / 2);
      const cp2Y = current.y + Math.sin(nextAngle) * (nextDist / 2);

      if (i === 0) ctx.moveTo(startX, startY);
      else ctx.lineTo(startX, startY);

      ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
    }

    ctx.closePath();

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }

  // Getters e Setters

  set style(options = {}) {
    this.strokeColor = options.strokeColor ?? this.strokeColor;
    this.lineWidth = options.lineWidth ?? this.lineWidth;
    this.fillColor = options.fillColor ?? this.fillColor;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
    };
  }

  setVertices(points) {
    this.points = points;
  }

  setRadius(r) {
    this.radius = r;
  }
}