/**
 * Desenha um anel retangular (retângulo com um buraco no centro).
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Posição X do canto superior esquerdo do retângulo externo.
 * @param {number} y - Posição Y do canto superior esquerdo do retângulo externo.
 * @param {number} width - Largura total do retângulo externo.
 * @param {number} height - Altura total do retângulo externo.
 * @param {number} thickness - Espessura da borda (interno será calculado com base nisso).
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.fillColor="black"] - Cor de preenchimento.
 * @param {string|null} [options.strokeColor=null] - Cor do contorno.
 * @param {number} [options.lineWidth=1] - Largura da linha do contorno.
 * @param {boolean} [options.shadow=false] - Ativa a sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"]
 * @param {number} [options.shadowBlur=4]
 * @param {number} [options.shadowOffsetX=2]
 * @param {number} [options.shadowOffsetY=2]
 */
export default class RectangleRing {
  constructor(ctx, x, y, width, height, thickness, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.thickness = thickness;

    // Estilo
    this.fillColor = options.fillColor ?? "black";
    this.strokeColor = options.strokeColor ?? null;
    this.lineWidth = options.lineWidth ?? 1;

    // Sombra
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  /** Atualiza propriedades dinamicamente */
  update(props = {}) {
    Object.assign(this, props);
  }

  /** Desenha o anel retangular */
  draw() {
    if (!this.ctx) return;
    if (this.thickness <= 0 || this.thickness * 2 >= this.width || this.thickness * 2 >= this.height) return;

    const ctx = this.ctx;
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

    // Caminho do anel retangular
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height); // Externo
    ctx.rect(
      this.x + this.thickness,
      this.y + this.thickness,
      this.width - 2 * this.thickness,
      this.height - 2 * this.thickness
    ); // Interno (anti-horário pela regra de preenchimento evenodd)

    // Preenchimento
    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill("evenodd");
    }

    // Contorno
    if (this.strokeColor) {
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

  get size() {
    return { width: this.width, height: this.height };
  }

  set size({ width, height }) {
    this.width = width;
    this.height = height;
  }

  get border() {
    return this.thickness;
  }

  set border(value) {
    this.thickness = value;
  }

  get style() {
    return {
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
    };
  }

  set style({ fillColor, strokeColor, lineWidth }) {
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
