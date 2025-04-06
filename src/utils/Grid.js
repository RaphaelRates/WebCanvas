/**
 * Desenha uma grade (grid) cobrindo todo o canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} spacing - Espaçamento entre as linhas da grade.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.strokeColor="#ccc"] - Cor das linhas.
 * @param {number} [options.lineWidth=1] - Espessura das linhas.
 * @param {boolean} [options.shadow=false] - Se aplica sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.1)"]
 * @param {number} [options.shadowBlur=2]
 * @param {number} [options.shadowOffsetX=1]
 * @param {number} [options.shadowOffsetY=1]
 */
/**
 * Classe para desenhar uma grade (grid) cobrindo todo o canvas.
 */
export default class Grid {
  constructor(ctx, spacing, options = {}) {
    this.ctx = ctx;
    this.spacing = spacing;

    this.strokeColor = options.strokeColor ?? "#ccc";
    this.lineWidth = options.lineWidth ?? 1;

    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.1)";
    this.shadowBlur = options.shadowBlur ?? 2;
    this.shadowOffsetX = options.shadowOffsetX ?? 1;
    this.shadowOffsetY = options.shadowOffsetY ?? 1;
  }

  update(properties = {}) {
    Object.assign(this, properties);
  }

  draw() {
    const ctx = this.ctx;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.beginPath();

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

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;

    // Linhas verticais
    for (let x = 0; x <= width; x += this.spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    // Linhas horizontais
    for (let y = 0; y <= height; y += this.spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();
  }

  set style(options = {}) {
    this.strokeColor = options.strokeColor ?? this.strokeColor;
    this.lineWidth = options.lineWidth ?? this.lineWidth;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
    };
  }

  setSpacing(spacing) {
    this.spacing = spacing;
  }
}
