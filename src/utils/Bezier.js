
/**
 * Desenha uma curva de Bézier cúbica.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x1 - Ponto inicial X.
 * @param {number} y1 - Ponto inicial Y.
 * @param {number} cp1x - Primeiro ponto de controle X.
 * @param {number} cp1y - Primeiro ponto de controle Y.
 * @param {number} cp2x - Segundo ponto de controle X.
 * @param {number} cp2y - Segundo ponto de controle Y.
 * @param {number} x2 - Ponto final X.
 * @param {number} y2 - Ponto final Y.
 * @param {Object} options - Estilos opcionais.
 */
export default class Bezier {
  constructor(ctx, start, cp1, cp2, end, options = {}) {
    this.ctx = ctx;

    // Pontos
    this.x1 = start.x;
    this.y1 = start.y;
    this.cp1x = cp1.x;
    this.cp1y = cp1.y;
    this.cp2x = cp2.x;
    this.cp2y = cp2.y;
    this.x2 = end.x;
    this.y2 = end.y;

    // Estilos com valores padrão
    this.strokeColor = options.strokeColor ?? "black";
    this.strokeWidth = options.strokeWidth ?? 1;
    this.lineCap = options.lineCap ?? "round";
    this.lineJoin = options.lineJoin ?? "round";
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0, 0, 0, 0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  /**
   * Atualiza propriedades da curva.
   */
  update(properties = {}) {
    Object.assign(this, properties);
  }

  /**
   * Desenha a curva de Bézier no canvas.
   */
  draw() {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);

    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;

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

    ctx.bezierCurveTo(
      this.cp1x, this.cp1y,
      this.cp2x, this.cp2y,
      this.x2, this.y2
    );

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.stroke();
    ctx.closePath();
  }

  // Getters e Setters

  get start() {
    return { x: this.x1, y: this.y1 };
  }

  set start({ x, y }) {
    this.x1 = x;
    this.y1 = y;
  }

  get controlPoints() {
    return {
      cp1: { x: this.cp1x, y: this.cp1y },
      cp2: { x: this.cp2x, y: this.cp2y }
    };
  }

  set controlPoints({ cp1, cp2 }) {
    this.cp1x = cp1.x;
    this.cp1y = cp1.y;
    this.cp2x = cp2.x;
    this.cp2y = cp2.y;
  }

  get end() {
    return { x: this.x2, y: this.y2 };
  }

  set end({ x, y }) {
    this.x2 = x;
    this.y2 = y;
  }

  get style() {
    return {
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY
    };
  }

  set style(options = {}) {
    this.strokeColor = options.strokeColor ?? this.strokeColor;
    this.strokeWidth = options.strokeWidth ?? this.strokeWidth;
    this.lineCap = options.lineCap ?? this.lineCap;
    this.lineJoin = options.lineJoin ?? this.lineJoin;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }
}