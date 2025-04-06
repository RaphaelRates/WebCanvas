/**
 * Cria um gradiente radial partindo do centro com controle mais claro no meio.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Coordenada X do retângulo.
 * @param {number} y - Coordenada Y do retângulo.
 * @param {number} width - Largura do retângulo.
 * @param {number} height - Altura do retângulo.
 * @param {string} innerColor - Cor do centro.
 * @param {string} outerColor - Cor das bordas.
 * @param {Object} [options] - Opções como sombra.
 */
export default class CenterGradientRect {
  constructor(ctx, x, y, width, height, innerColor, outerColor, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.innerColor = innerColor;
    this.outerColor = outerColor;

    this.shadow = options.shadow ?? false;
    this.shadowOffsetX = options.shadowOffsetX ?? 0;
    this.shadowOffsetY = options.shadowOffsetY ?? 0;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.0)";
    this.shadowBlur = options.shadowBlur ?? 0;
  }

  /**
   * Atualiza as propriedades do gradiente.
   * @param {Object} properties 
   */
  update(properties = {}) {
    Object.assign(this, properties);
  }

  /**
   * Desenha o retângulo com gradiente.
   */
  draw() {
    const ctx = this.ctx;
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const radius = Math.max(this.width, this.height) / 2;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, this.innerColor);
    gradient.addColorStop(1, this.outerColor);

    if (this.shadow) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Reset sombra
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Getters e Setters

  set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  set size({ width, height }) {
    this.width = width;
    this.height = height;
  }

  get size() {
    return { width: this.width, height: this.height };
  }

  set colors({ inner, outer }) {
    this.innerColor = inner;
    this.outerColor = outer;
  }

  get colors() {
    return {
      inner: this.innerColor,
      outer: this.outerColor
    };
  }

  set style(options = {}) {
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY
    };
  }
}