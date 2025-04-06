/**
 * Desenha um quadrado no canvas, centralizado em (x, y).
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Coordenada X do centro.
 * @param {number} y - Coordenada Y do centro.
 * @param {number} size - Tamanho do lado do quadrado.
 * @param {Object} options - Estilos opcionais.
 * @param {number} [options.rotation=0] - Rotação em radianos.
 * @param {string|null} [options.fillColor=null] - Cor de preenchimento.
 * @param {string|null} [options.strokeColor="black"] - Cor da borda.
 * @param {number} [options.lineWidth=1] - Espessura da borda.
 * @param {boolean} [options.shadow=false] - Se aplica sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"]
 * @param {number} [options.shadowBlur=4]
 * @param {number} [options.shadowOffsetX=2]
 * @param {number} [options.shadowOffsetY=2]
 */
export default class Square {
  constructor(ctx, x, y, size, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;

    // Estilo
    this.rotation = options.rotation ?? 0;
    this.fillColor = options.fillColor ?? null;
    this.strokeColor = options.strokeColor ?? "black";
    this.lineWidth = options.lineWidth ?? 1;

    // Sombra
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  /** Atualiza valores do quadrado dinamicamente */
  update(props = {}) {
    Object.assign(this, props);
  }

  /** Desenha o quadrado no canvas */
  draw() {
    if (!this.ctx || this.size <= 0) return;

    const ctx = this.ctx;
    const half = this.size / 2;
    const points = [];

    for (let i = 0; i < 4; i++) {
      const angle = this.rotation + (Math.PI / 2) * i;
      points.push({
        x: this.x + half * Math.cos(angle),
        y: this.y + half * Math.sin(angle),
      });
    }

    ctx.save();

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

    // Desenho
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < 4; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    if (this.strokeColor && this.lineWidth > 0) {
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.lineWidth;
      ctx.stroke();
    }

    ctx.restore();
  }

  /** GETTERS E SETTERS **/

  get position() {
    return { x: this.x, y: this.y };
  }

  set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get dimensions() {
    return { size: this.size };
  }

  set dimensions({ size }) {
    this.size = size;
  }

  get style() {
    return {
      rotation: this.rotation,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
    };
  }

  set style({ rotation, fillColor, strokeColor, lineWidth }) {
    if (rotation !== undefined) this.rotation = rotation;
    if (fillColor !== undefined) this.fillColor = fillColor;
    if (strokeColor !== undefined) this.strokeColor = strokeColor;
    if (lineWidth !== undefined) this.lineWidth = lineWidth;
  }

  get shadowStyle() {
    return {
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
    };
  }

  set shadowStyle({
    shadow,
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
  }) {
    if (shadow !== undefined) this.shadow = shadow;
    if (shadowColor !== undefined) this.shadowColor = shadowColor;
    if (shadowBlur !== undefined) this.shadowBlur = shadowBlur;
    if (shadowOffsetX !== undefined) this.shadowOffsetX = shadowOffsetX;
    if (shadowOffsetY !== undefined) this.shadowOffsetY = shadowOffsetY;
  }
}
