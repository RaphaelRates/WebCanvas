
/**
 * Desenha um polígono regular no canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Coordenada X do centro.
 * @param {number} y - Coordenada Y do centro.
 * @param {number} radius - Raio (distância do centro até os vértices).
 * @param {number} sides - Número de lados do polígono (mínimo 3).
 * @param {Object} options - Estilos opcionais.
 * @param {number} [options.rotation=0] - Rotação do polígono em radianos.
 * @param {string} [options.fillColor=null] - Cor de preenchimento. Use `null` para não preencher.
 * @param {string} [options.strokeColor="black"] - Cor da borda.
 * @param {number} [options.lineWidth=1] - Espessura da borda.
 * @param {boolean} [options.shadow=false] - Se deve aplicar sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"] - Cor da sombra.
 * @param {number} [options.shadowBlur=4] - Intensidade do blur.
 * @param {number} [options.shadowOffsetX=2] - Deslocamento horizontal da sombra.
 * @param {number} [options.shadowOffsetY=2] - Deslocamento vertical da sombra.
 */
/**
 * Classe para desenhar polígonos regulares com suporte a rotação, sombra e estilos.
 */
export default class RegularPolygon {
  constructor(ctx, x, y, radius, sides, options = {}) {
    if (sides < 3) throw new Error("O polígono precisa de pelo menos 3 lados.");

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;

    this.rotation = options.rotation ?? 0;
    this.fillColor = options.fillColor ?? null;
    this.strokeColor = options.strokeColor ?? "black";
    this.lineWidth = options.lineWidth ?? 1;

    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0, 0, 0, 0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();

    // Configura sombra
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

    // Desenha os lados
    for (let i = 0; i <= this.sides; i++) {
      const angle = (i * 2 * Math.PI / this.sides) + this.rotation;
      const px = this.x + this.radius * Math.cos(angle);
      const py = this.y + this.radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    // Preenchimento
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    // Borda
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();

    ctx.closePath();
  }

  setSides(sides) {
    if (sides < 3) return;
    this.sides = sides;
  }

  setRotation(rotation) {
    this.rotation = rotation;
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
  }

  setShadow(options = {}) {
    this.shadow = options.shadow ?? true;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setRadius(radius) {
    this.radius = radius;
  }
}
