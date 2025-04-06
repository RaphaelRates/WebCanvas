/**
 * Cria um retângulo com gradiente linear no canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto de renderização 2D.
 * @param {number} x - Posição X do retângulo.
 * @param {number} y - Posição Y do retângulo.
 * @param {number} width - Largura do retângulo.
 * @param {number} height - Altura do retângulo.
 * @param {Array} colorStops - Array de objetos com `offset` (0 a 1) e `color` (string).
 * @param {string} direction - Direção do gradiente: 'horizontal', 'vertical' ou 'diagonal'.
 * @param {Object} [options] - Opções visuais adicionais.
 * @param {boolean} [options.shadow=false] - Se deve aplicar sombra.
 * @param {string} [options.shadowColor="#000"] - Cor da sombra.
 * @param {number} [options.shadowBlur=10] - Intensidade do desfoque da sombra.
 * @param {number} [options.shadowOffsetX=4] - Deslocamento X da sombra.
 * @param {number} [options.shadowOffsetY=4] - Deslocamento Y da sombra.
 */
/**
 * Classe para desenhar um retângulo com gradiente linear no canvas.
 */
export default class GradientRectangle {
  constructor(ctx, x, y, width, height, colorStops = [], direction = "horizontal", options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colorStops = colorStops;
    this.direction = direction;

    this.shadow = options.shadow || false;
    this.shadowColor = options.shadowColor || "#000";
    this.shadowBlur = options.shadowBlur ?? 10;
    this.shadowOffsetX = options.shadowOffsetX ?? 4;
    this.shadowOffsetY = options.shadowOffsetY ?? 4;
  }

  draw() {
    const ctx = this.ctx;

    // Define pontos do gradiente
    let x0 = this.x, y0 = this.y, x1 = this.x + this.width, y1 = this.y;
    if (this.direction === "vertical") {
      x1 = this.x;
      y1 = this.y + this.height;
    } else if (this.direction === "diagonal") {
      x1 = this.x + this.width;
      y1 = this.y + this.height;
    }

    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    this.colorStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));

    if (this.shadow) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Limpa sombra
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  setColorStops(colorStops) {
    this.colorStops = colorStops;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  setShadow({ shadow = true, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY } = {}) {
    this.shadow = shadow;
    this.shadowColor = shadowColor ?? this.shadowColor;
    this.shadowBlur = shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY ?? this.shadowOffsetY;
  }
}
