
/**
 * Desenha uma linha segmentada a partir de um ponto inicial até vários pontos finais.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x1 - Ponto inicial X.
 * @param {number} y1 - Ponto inicial Y.
 * @param {Array<Object>} array - Array de pontos com { x2, y2, color, lineWidth, cap, join, shadow, ... }.
 * @param {string} defaultColor - Cor padrão da linha.
 * @param {number} defaultWidth - Largura padrão da linha.
 * @param {boolean} shadow - Se deve aplicar sombra.
 */
export default class SegmentedLine {
  constructor(ctx, x1, y1, segments = [], {
    defaultColor = "black",
    defaultWidth = 1,
    shadow = false,
    defaultShadow = {
      color: "rgba(0, 0, 0, 0.5)",
      blur: 4,
      offsetX: 2,
      offsetY: 2
    }
  } = {}) {
    this.ctx = ctx;
    this.x1 = x1;
    this.y1 = y1;
    this.segments = segments;

    this.defaultColor = defaultColor;
    this.defaultWidth = defaultWidth;
    this.shadow = shadow;
    this.defaultShadow = defaultShadow;
  }

  update(properties = {}) {
    Object.assign(this, properties);
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);

    this.segments.forEach(point => {
      ctx.strokeStyle = point.color || this.defaultColor;
      ctx.lineWidth = point.lineWidth || this.defaultWidth;
      ctx.lineCap = point.cap || "round";
      ctx.lineJoin = point.join || "round";

      if (this.shadow || point.shadow) {
        ctx.shadowColor = point.shadowColor || this.defaultShadow.color;
        ctx.shadowBlur = point.shadowBlur || this.defaultShadow.blur;
        ctx.shadowOffsetX = point.shadowOffsetX || this.defaultShadow.offsetX;
        ctx.shadowOffsetY = point.shadowOffsetY || this.defaultShadow.offsetY;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      ctx.lineTo(point.x2, point.y2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(point.x2, point.y2);
    });

    ctx.closePath();
  }

  setSegments(segments) {
    this.segments = segments;
  }

  setStart(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  set style({ color, width, shadow, shadowConfig } = {}) {
    this.defaultColor = color ?? this.defaultColor;
    this.defaultWidth = width ?? this.defaultWidth;
    this.shadow = shadow ?? this.shadow;
    this.defaultShadow = shadowConfig ?? this.defaultShadow;
  }

  get style() {
    return {
      color: this.defaultColor,
      width: this.defaultWidth,
      shadow: this.shadow,
      shadowConfig: this.defaultShadow
    };
  }
}