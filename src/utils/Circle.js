/**
 * Desenha um círculo (preenchido ou apenas contornado).
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Centro X do círculo.
 * @param {number} y - Centro Y do círculo.
 * @param {number} radius - Raio do círculo.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.fillColor] - Cor de preenchimento.
 * @param {string} [options.strokeColor] - Cor da borda.
 * @param {number} [options.lineWidth] - Largura da borda.
 * @param {boolean} [options.shadow] - Se deve aplicar sombra.
 * @param {boolean} [options.fill] - Se o círculo deve ser preenchido.
 */
export default class Circle {
  constructor(ctx, x, y, radius, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.fillColor = options.fillColor ?? "transparent";
    this.strokeColor = options.strokeColor ?? "black";
    this.strokeWidth = options.strokeWidth ?? 1;
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  /**
   * Atualiza propriedades do círculo.
   * @param {Object} properties 
   */
  update(properties = {}) {
    Object.assign(this, properties);
  }

  /**
   * Desenha o círculo na tela.
   */
  draw() {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    // Sombra
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

    // Preenchimento
    if (this.fillColor !== "transparent") {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    // Contorno
    if (this.strokeWidth > 0) {
      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.strokeColor;
      ctx.stroke();
    }

    ctx.closePath();
  }

  // Getters e Setters

  set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  set size(radius) {
    this.radius = radius;
  }

  get size() {
    return this.radius;
  }

  set colors({ fill, stroke }) {
    this.fillColor = fill;
    this.strokeColor = stroke;
  }

  get colors() {
    return {
      fill: this.fillColor,
      stroke: this.strokeColor
    };
  }

  set style(options = {}) {
    this.strokeWidth = options.strokeWidth ?? this.strokeWidth;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      strokeWidth: this.strokeWidth,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY
    };
  }
}