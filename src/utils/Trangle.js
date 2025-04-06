/**
 * Desenha um triângulo equilátero no canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Coordenada X do centro.
 * @param {number} y - Coordenada Y do centro.
 * @param {number} size - Tamanho (raio do círculo circunscrito).
 * @param {Object} options - Estilos e opções de desenho.
 * @param {number} [options.rotation=0] - Rotação do triângulo em radianos.
 * @param {string} [options.fillColor=null] - Cor de preenchimento. Use `null` para não preencher.
 * @param {string} [options.strokeColor="black"] - Cor da borda.
 * @param {number} [options.lineWidth=1] - Espessura da borda.
 * @param {boolean} [options.shadow=false] - Se deve aplicar sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"] - Cor da sombra.
 * @param {number} [options.shadowBlur=4] - Intensidade do blur.
 * @param {number} [options.shadowOffsetX=2] - Deslocamento horizontal da sombra.
 * @param {number} [options.shadowOffsetY=2] - Deslocamento vertical da sombra.
 */
export default class Triangle {
  constructor(ctx, x, y, size, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;

    const {
      rotation = 0,
      fillColor = null,
      strokeColor = "black",
      lineWidth = 1,
      shadow = false,
      shadowColor = "rgba(0, 0, 0, 0.5)",
      shadowBlur = 4,
      shadowOffsetX = 2,
      shadowOffsetY = 2
    } = options;

    this.rotation = rotation;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.lineWidth = lineWidth;
    this.shadow = shadow;
    this.shadowColor = shadowColor;
    this.shadowBlur = shadowBlur;
    this.shadowOffsetX = shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY;
  }

  update(options = {}) {
    Object.assign(this, options);
  }

  applyShadow() {
    if (this.shadow) {
      this.ctx.shadowColor = this.shadowColor;
      this.ctx.shadowBlur = this.shadowBlur;
      this.ctx.shadowOffsetX = this.shadowOffsetX;
      this.ctx.shadowOffsetY = this.shadowOffsetY;
    } else {
      this.ctx.shadowColor = "transparent";
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    this.applyShadow();

    for (let i = 0; i <= 3; i++) {
      const angle = (i * 2 * Math.PI / 3) + this.rotation;
      const px = this.x + this.size * Math.cos(angle);
      const py = this.y + this.size * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();
  }

  // Getters
  get position() {
    return { x: this.x, y: this.y };
  }

  get sizeValue() {
    return this.size;
  }

  // Setters
  set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  set sizeValue(value) {
    this.size = value;
  }
}
