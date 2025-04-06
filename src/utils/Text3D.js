/**
 * Desenha um texto com efeito 3D simulando profundidade, com opção de sombra.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {string} text - Texto a ser exibido.
 * @param {number} x - Posição X do texto.
 * @param {number} y - Posição Y do texto.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.font="bold 40px sans-serif"] - Fonte usada.
 * @param {string} [options.textColor="#ffffff"] - Cor do texto frontal.
 * @param {string} [options.depthColor="#000000"] - Cor da profundidade (3D).
 * @param {number} [options.depth=5] - Profundidade (quantas camadas).
 * @param {number} [options.offsetX=1] - Deslocamento X por camada.
 * @param {number} [options.offsetY=1] - Deslocamento Y por camada.
 * @param {boolean} [options.shadow=false] - Se deve aplicar sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"]
 * @param {number} [options.shadowBlur=4]
 * @param {number} [options.shadowOffsetX=2]
 * @param {number} [options.shadowOffsetY=2]
 */
export default class Text3DDepth {
  constructor(ctx, text, x, y, options = {}) {
    this.ctx = ctx;
    this.text = text;
    this.x = x;
    this.y = y;

    // Estilo do texto
    this.font = options.font || "bold 40px sans-serif";
    this.textColor = options.textColor || "#ffffff";
    this.depthColor = options.depthColor || "#000000";

    // Efeito 3D
    this.depth = options.depth ?? 5;
    this.offsetX = options.offsetX ?? 1;
    this.offsetY = options.offsetY ?? 1;

    // Sombra
    this.shadow = options.shadow || false;
    this.shadowColor = options.shadowColor || "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur || 4;
    this.shadowOffsetX = options.shadowOffsetX || 2;
    this.shadowOffsetY = options.shadowOffsetY || 2;
  }

  draw() {
    const ctx = this.ctx;

    ctx.save();
    ctx.font = this.font;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    // Camadas de profundidade
    ctx.shadowColor = "transparent";
    for (let i = this.depth; i > 0; i--) {
      ctx.fillStyle = this.depthColor;
      ctx.fillText(
        this.text,
        this.x + i * this.offsetX,
        this.y + i * this.offsetY
      );
    }

    // Sombra do texto frontal
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

    // Texto principal
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.text, this.x, this.y);

    ctx.restore();
  }

  update(options = {}) {
    this.text = options.text ?? this.text;
    this.x = options.x ?? this.x;
    this.y = options.y ?? this.y;
    this.font = options.font ?? this.font;
    this.textColor = options.textColor ?? this.textColor;
    this.depthColor = options.depthColor ?? this.depthColor;
    this.depth = options.depth ?? this.depth;
    this.offsetX = options.offsetX ?? this.offsetX;
    this.offsetY = options.offsetY ?? this.offsetY;
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
      textColor: this.textColor,
      depthColor: this.depthColor,
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

  get depthStyle() {
    return {
      depth: this.depth,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
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
    this.textColor = style.textColor ?? this.textColor;
    this.depthColor = style.depthColor ?? this.depthColor;
  }

  setShadow(shadow = {}) {
    this.shadow = shadow.shadow ?? this.shadow;
    this.shadowColor = shadow.shadowColor ?? this.shadowColor;
    this.shadowBlur = shadow.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = shadow.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = shadow.shadowOffsetY ?? this.shadowOffsetY;
  }

  setDepth(depthOptions = {}) {
    this.depth = depthOptions.depth ?? this.depth;
    this.offsetX = depthOptions.offsetX ?? this.offsetX;
    this.offsetY = depthOptions.offsetY ?? this.offsetY;
  }
}
