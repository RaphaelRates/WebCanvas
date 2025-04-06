
/**
 * Desenha texto no canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {string} text - Texto a ser exibido.
 * @param {number} x - Posição X.
 * @param {number} y - Posição Y.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.color] - Cor do texto.
 * @param {string} [options.font] - Fonte do texto (ex: '16px Arial').
 * @param {boolean} [options.shadow] - Se deve aplicar sombra.
 * @param {string} [options.shadowColor] - Cor da sombra.
 * @param {number} [options.shadowBlur] - Intensidade do blur.
 * @param {number} [options.shadowOffsetX] - Deslocamento horizontal da sombra.
 * @param {number} [options.shadowOffsetY] - Deslocamento vertical da sombra.
 */
export default class Text {
  constructor(ctx, text, x, y, options = {}) {
    this.ctx = ctx;
    this.text = text;
    this.x = x;
    this.y = y;

    // Opções de estilo
    this.font = options.font || "16px Arial";
    this.color = options.color || "black";
    this.align = options.align || "left";
    this.baseline = options.baseline || "alphabetic";

    // Sombra
    this.shadow = options.shadow || false;
    this.shadowColor = options.shadowColor || "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur || 4;
    this.shadowOffsetX = options.shadowOffsetX || 2;
    this.shadowOffsetY = options.shadowOffsetY || 2;
  }

  draw() {
    const ctx = this.ctx;

    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;

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

    ctx.fillText(this.text, this.x, this.y);
  }

  update(options = {}) {
    this.text = options.text ?? this.text;
    this.x = options.x ?? this.x;
    this.y = options.y ?? this.y;
    this.font = options.font ?? this.font;
    this.color = options.color ?? this.color;
    this.align = options.align ?? this.align;
    this.baseline = options.baseline ?? this.baseline;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  // Getters
  get position() {
    return { x: this.x, y: this.y };
  }

  get style() {
    return {
      font: this.font,
      color: this.color,
      align: this.align,
      baseline: this.baseline,
    };
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

  // Setters
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setText(text) {
    this.text = text;
  }

  setStyle(style = {}) {
    this.font = style.font ?? this.font;
    this.color = style.color ?? this.color;
    this.align = style.align ?? this.align;
    this.baseline = style.baseline ?? this.baseline;
  }

  setShadow(shadow = {}) {
    this.shadow = shadow.shadow ?? this.shadow;
    this.shadowColor = shadow.shadowColor ?? this.shadowColor;
    this.shadowBlur = shadow.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = shadow.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = shadow.shadowOffsetY ?? this.shadowOffsetY;
  }
}
