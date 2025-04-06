/**
 * Classe que desenha um retângulo com gradiente radial no canvas.
 */
export default class RadialGradientRectangle {
  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização 2D.
   * @param {Object} [options={}] - Opções visuais adicionais.
   * @param {boolean} [options.shadow=false] - Ativa ou desativa sombra.
   * @param {string} [options.shadowColor="#000"] - Cor da sombra.
   * @param {number} [options.shadowBlur=10] - Intensidade do desfoque da sombra.
   * @param {number} [options.shadowOffsetX=4] - Deslocamento horizontal da sombra.
   * @param {number} [options.shadowOffsetY=4] - Deslocamento vertical da sombra.
   */
  constructor(ctx, options = {}) {
    this.ctx = ctx;

    // Parâmetros do retângulo
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.colorStops = [
      { offset: 0, color: "white" },
      { offset: 1, color: "black" }
    ];

    // Opções de sombra
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "#000";
    this.shadowBlur = options.shadowBlur ?? 10;
    this.shadowOffsetX = options.shadowOffsetX ?? 4;
    this.shadowOffsetY = options.shadowOffsetY ?? 4;
  }

  /**
   * Atualiza as propriedades do retângulo.
   * @param {Object} options
   * @param {number} [options.x]
   * @param {number} [options.y]
   * @param {number} [options.width]
   * @param {number} [options.height]
   * @param {Array<{offset: number, color: string}>} [options.colorStops]
   */
  setRectOptions({ x, y, width, height, colorStops }) {
    if (x !== undefined) this.x = x;
    if (y !== undefined) this.y = y;
    if (width !== undefined) this.width = width;
    if (height !== undefined) this.height = height;
    if (colorStops !== undefined) this.colorStops = colorStops;
  }

  /**
   * Desenha o retângulo com gradiente radial.
   */
  draw() {
    const ctx = this.ctx;
    const { x, y, width, height, colorStops } = this;

    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const radius = Math.max(width, height) / 2;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    colorStops.forEach(({ offset, color }) => {
      gradient.addColorStop(offset, color);
    });

    if (this.shadow) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);

    // Limpa sombra para próximos desenhos
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  /**
   * Ativa ou desativa a sombra.
   * @param {boolean} enable
   */
  setShadow(enable = true) {
    this.shadow = enable;
  }

  /**
   * Define as opções de sombra.
   * @param {Object} options
   * @param {string} [options.color]
   * @param {number} [options.blur]
   * @param {number} [options.offsetX]
   * @param {number} [options.offsetY]
   */
  setShadowOptions({ color, blur, offsetX, offsetY }) {
    if (color !== undefined) this.shadowColor = color;
    if (blur !== undefined) this.shadowBlur = blur;
    if (offsetX !== undefined) this.shadowOffsetX = offsetX;
    if (offsetY !== undefined) this.shadowOffsetY = offsetY;
  }
}
