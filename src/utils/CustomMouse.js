/**
 * Representa um mouse personalizado desenhado no canvas.
 * @class CustomMouse
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {Object} options - Opções visuais e funcionais do mouse.
 * @param {number} [options.size=10] - Tamanho do cursor.
 * @param {string} [options.color="black"] - Cor do cursor.
 * @param {boolean} [options.circle=true] - Define se é um círculo (true) ou cruz (false).
 * @param {boolean} [options.shadow=false] - Ativa sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.4)"]
 * @param {number} [options.shadowBlur=4]
 * @param {number} [options.shadowOffsetX=2]
 * @param {number} [options.shadowOffsetY=2]
 */
export default class CustomMouse {
    constructor(ctx, options = {}) {
      this.ctx = ctx;
  
      this.x = 0;
      this.y = 0;
  
      this.size = options.size ?? 10;
      this.color = options.color ?? "black";
      this.circle = options.circle ?? true;
  
      this.shadow = options.shadow ?? false;
      this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.4)";
      this.shadowBlur = options.shadowBlur ?? 4;
      this.shadowOffsetX = options.shadowOffsetX ?? 2;
      this.shadowOffsetY = options.shadowOffsetY ?? 2;
    }
  
    /**
     * Atualiza a posição do cursor.
     * @param {number} x - Posição X.
     * @param {number} y - Posição Y.
     */
    updatePosition(x, y) {
      this.x = x;
      this.y = y;
    }
  
    /**
     * Define novos estilos.
     * @param {Object} options - Novos estilos.
     */
    updateStyle(options = {}) {
      Object.assign(this, options);
    }
  
    /**
     * Desenha o cursor no canvas.
     */
    draw() {
      const ctx = this.ctx;
  
      ctx.save();
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
  
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
  
      if (this.circle) {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      } else {
        ctx.moveTo(this.x - this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x, this.y + this.size);
      }
  
      ctx.stroke();
      ctx.restore();
    }
  }
  