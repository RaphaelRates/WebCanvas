/**
 * Desenha um polígono baseado em uma lista de pontos.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {Array<{x: number, y: number}>} points - Lista de pontos (vértices).
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.fillColor=null] - Cor de preenchimento.
 * @param {string} [options.strokeColor="black"] - Cor da borda.
 * @param {number} [options.lineWidth=1] - Espessura da borda.
 * @param {boolean} [options.shadow=false] - Se aplica sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"]
 * @param {number} [options.shadowBlur=4]
 * @param {number} [options.shadowOffsetX=2]
 * @param {number} [options.shadowOffsetY=2]
 */
/**
 * Classe para desenhar um polígono baseado em uma lista de pontos.
 */
export default class CustomPolygon {
  constructor(ctx, points, options = {}) {
    this.ctx = ctx;
    this.points = points;

    this.fillColor = options.fillColor ?? null;
    this.strokeColor = options.strokeColor ?? "black";
    this.lineWidth = options.lineWidth ?? 1;

    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
  }

  update(properties = {}) {
    Object.assign(this, properties);
  }

  draw() {
    const ctx = this.ctx;
    const points = this.points;

    if (!points || points.length === 0) return;

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

    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }

  // Getters e setters para estilo e pontos

  set style(options = {}) {
    this.strokeColor = options.strokeColor ?? this.strokeColor;
    this.lineWidth = options.lineWidth ?? this.lineWidth;
    this.fillColor = options.fillColor ?? this.fillColor;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
    };
  }

  setVertices(points) {
    this.points = points;
  }
}
