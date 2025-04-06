/**
 * Desenha uma imagem no canvas com opções de posição, tamanho e sombra.
 *
 * @param {CanvasRenderingContext2D} ctx - O contexto 2D do canvas onde a imagem será desenhada.
 * @param {string} src - O caminho ou URL da imagem a ser carregada.
 * @param {number} x - A posição X onde a imagem será desenhada.
 * @param {number} y - A posição Y onde a imagem será desenhada.
 * @param {number} width - A largura da imagem a ser desenhada.
 * @param {number} height - A altura da imagem a ser desenhada.
 * @param {Object} [options={}] - Opções adicionais para sombra.
 * @param {boolean} [options.shadow=false] - Define se a imagem terá sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"] - Cor da sombra.
 * @param {number} [options.shadowBlur=10] - Intensidade do desfoque da sombra.
 * @param {number} [options.shadowOffsetX=5] - Deslocamento horizontal da sombra.
 * @param {number} [options.shadowOffsetY=5] - Deslocamento vertical da sombra.
 */
export default class CanvasImage {
  constructor(ctx, src, x, y, width, height, options = {}) {
    this.ctx = ctx;
    this.src = src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 10;
    this.shadowOffsetX = options.shadowOffsetX ?? 5;
    this.shadowOffsetY = options.shadowOffsetY ?? 5;

    this.image = new Image();
    this.image.src = src;

    this.image.onload = () => {
      this.loaded = true;
      this.draw();
    };

    this.image.onerror = (err) => {
      console.error("Erro ao carregar imagem:", err);
    };

    this.loaded = false;
  }

  update(properties = {}) {
    Object.assign(this, properties);
  }

  draw() {
    if (!this.loaded) return;

    const ctx = this.ctx;

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

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  set style(options = {}) {
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
    };
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  setSource(src) {
    this.src = src;
    this.loaded = false;
    this.image.src = src;
  }
}