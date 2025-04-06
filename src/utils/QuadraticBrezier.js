
/**
 * Desenha uma curva de Bézier quadrática.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x1 - Ponto inicial X.
 * @param {number} y1 - Ponto inicial Y.
 * @param {number} cp1x - Ponto de controle X.
 * @param {number} cp1y - Ponto de controle Y.
 * @param {number} x2 - Ponto final X.
 * @param {number} y2 - Ponto final Y.
 * @param {Object} options - Estilos opcionais.
 */
/**
 * Classe para desenhar uma curva de Bézier quadrática em um canvas.
 */
export default class QuadraticBezierCurve {
  constructor(ctx, {
    strokeColor = "black",
    strokeWidth = 1,
    lineCap = "round",
    lineJoin = "round",
    shadow = false,
    shadowColor = "rgba(0, 0, 0, 0.5)",
    shadowBlur = 4,
    shadowOffsetX = 2,
    shadowOffsetY = 2
  } = {}) {
    this.ctx = ctx;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.lineCap = lineCap;
    this.lineJoin = lineJoin;
    this.shadow = shadow;
    this.shadowColor = shadowColor;
    this.shadowBlur = shadowBlur;
    this.shadowOffsetX = shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY;
  }

  draw(x1, y1, cp1x, cp1y, x2, y2) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;

    // Configura sombra
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

    ctx.quadraticCurveTo(cp1x, cp1y, x2, y2);
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.stroke();
    ctx.closePath();
  }

  setShadow(enable = true) {
    this.shadow = enable;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
  }

  setLineWidth(width) {
    this.strokeWidth = width;
  }

  setLineStyle({ cap, join }) {
    this.lineCap = cap ?? this.lineCap;
    this.lineJoin = join ?? this.lineJoin;
  }

  setShadowOptions({ color, blur, offsetX, offsetY }) {
    this.shadowColor = color ?? this.shadowColor;
    this.shadowBlur = blur ?? this.shadowBlur;
    this.shadowOffsetX = offsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = offsetY ?? this.shadowOffsetY;
  }
}
