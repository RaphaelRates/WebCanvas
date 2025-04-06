/**
 * Desenha os quatro quadrantes no canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.strokeColor="#000"] - Cor das linhas divisórias.
 * @param {number} [options.lineWidth=1] - Espessura das linhas.
 * @param {boolean} [options.showLabels=true] - Se deve mostrar rótulos dos quadrantes.
 * @param {string} [options.font="16px Arial"] - Fonte dos rótulos.
 * @param {string} [options.textColor="#000"] - Cor do texto.
 */
/**
 * Classe para desenhar os quatro quadrantes em um canvas.
 */
export default class QuadrantGrid {
  constructor(ctx, options = {}) {
    this.ctx = ctx;
    this.strokeColor = options.strokeColor ?? "#000";
    this.lineWidth = options.lineWidth ?? 1;
    this.showLabels = options.showLabels ?? true;
    this.font = options.font ?? "16px Arial";
    this.textColor = options.textColor ?? "#000";
  }

  draw() {
    const ctx = this.ctx;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const midX = width / 2;
    const midY = height / 2;

    ctx.beginPath();
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.lineWidth;

    // Linhas divisórias
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, height);
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    // Rótulos
    if (this.showLabels) {
      ctx.font = this.font;
      ctx.fillStyle = this.textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText("I", 3 * midX / 2, midY / 2);
      ctx.fillText("II", midX / 2, midY / 2);
      ctx.fillText("III", midX / 2, 3 * midY / 2);
      ctx.fillText("IV", 3 * midX / 2, 3 * midY / 2);
    }
  }

  setStrokeColor(color) {
    this.strokeColor = color;
  }

  setTextColor(color) {
    this.textColor = color;
  }

  toggleLabels(show = true) {
    this.showLabels = show;
  }

  setFont(font) {
    this.font = font;
  }

  setLineWidth(width) {
    this.lineWidth = width;
  }
}
