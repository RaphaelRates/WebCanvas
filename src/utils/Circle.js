/**
 * Desenha um círculo (preenchido ou apenas contornado).
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Centro X do círculo.
 * @param {number} y - Centro Y do círculo.
 * @param {number} radius - Raio do círculo.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.fillColor] - Cor de preenchimento.
 * @param {string} [options.strokeColor] - Cor da borda.
 * @param {number} [options.strokeWidth] - Largura da borda.
 * @param {boolean} [options.shadow] - Se deve aplicar sombra.
 * @param {string} [options.shadowColor] - Cor da sombra.
 * @param {number} [options.shadowBlur] - Desfoque da sombra.
 * @param {number} [options.shadowOffsetX] - Deslocamento X da sombra.
 * @param {number} [options.shadowOffsetY] - Deslocamento Y da sombra.
 */
export default class Circle {
  constructor(ctx, x, y, radius, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.fillColor = options.fillColor ?? "transparent";
    this.strokeColor = options.strokeColor ?? "none";
    this.strokeWidth = options.strokeWidth ?? 1;
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;
    
    // Inicializar velocidades
    this.vx = 0;
    this.vy = 0;
    
    // Salvar cor original para uso em colisões
    this.otherColor = this.fillColor;
  }

  /**
   * Atualiza propriedades do círculo.
   * @param {Object} properties 
   */
  update(properties = {}) {
    Object.assign(this, properties);
  }

  /**
   * Desenha o círculo na tela.
   */
  draw() {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    // Sombra
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

    if (this.fillColor !== "transparent") {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }

    if (this.strokeWidth > 0) {
      ctx.lineWidth = this.strokeWidth;
      ctx.strokeStyle = this.strokeColor;
      ctx.stroke();
    }

    ctx.closePath();
  }

  /**
   * Atualiza o tamanho do círculo com base na posição do mouse.
   * @param {Object} mouse - Objeto com as coordenadas x e y do mouse.
   * @param {Object} options - Opções para a atualização do tamanho.
   * @param {number} [options.minSize] - Tamanho mínimo do círculo.
   * @param {number} [options.maxSize] - Tamanho máximo do círculo.
   * @param {number} [options.prox] - Distância de proximidade para iniciar o crescimento.
   * @param {number} [options.speedGrow] - Velocidade de crescimento.
   * @param {number} [options.speedShrink] - Velocidade de encolhimento.
   */
  updateSizeForMouse(mouse, options = {}) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (!this._baseRadius) {
      this._baseRadius = this.radius;
    }

    const minSize = options.minSize ?? this.radius;
    const maxSize = options.maxSize ?? minSize * 2;
    const proximityLimit = options.prox ?? 100;
    const growSpeed = options.speedGrow ?? 0.7;
    const shrinkSpeed = options.speedShrink ?? 0.3;

    if (distance < proximityLimit) {
      if (this.radius < maxSize) {
        this.radius += growSpeed;
        if (this.radius > maxSize) this.radius = maxSize;
      }
    } else {
      if (this.radius > minSize) {
        this.radius -= shrinkSpeed;
        if (this.radius < minSize) this.radius = minSize;
      }
    }
  }

  /**
  * Aplica gravidade ao círculo.
  * @param {Object} config - Configurações para aplicar gravidade.
  * @param {number} [config.gravity] - Força da gravidade. Padrão: 0.5
  * @param {number} [config.ground] - Y do chão onde o objeto para. Padrão: altura da janela
  * @param {number} [config.bounce] - Multiplicador de quique. Padrão: 0.6
  * @param {number} [config.friction] - Reduz a energia a cada quique. Padrão: 0.98
  * @param {number} [config.delta] - Fator de tempo. Padrão: 1
  * @param {number} [config.tolerance] - Tolerância para parar o movimento. Padrão: 2
  */
  applyGravity({
    gravity = 0.5,
    ground = window.innerHeight - this.radius,
    bounce = 0.6,
    friction = 0.5,
    delta = 0.5,
    tolerance = 2,
  } = {}) {
    if (typeof this.vy !== "number") this.vy = 1;

    this.vy += gravity * delta;
    this.y += this.vy * delta;

    if (this.y >= ground) {
      this.y = ground;
      this.vy *= -bounce * friction;

      if (Math.abs(this.vy) < tolerance) {
        this.vy = 0;
      }
    }
  }

  /**
   * Detecta colisão com o mouse e aplica forças ao círculo.
   * @param {number} x - Posição X do mouse.
   * @param {number} y - Posição Y do mouse.
   * @param {Object} options - Opções para a colisão.
   * @param {number} [options.sizeMouse] - Raio de detecção do mouse.
   * @param {number} [options.pushForce] - Força aplicada ao círculo na colisão.
   * @param {number} [options.decay] - Fator de decaimento da velocidade.
   */
  getColiderWithMouse(x, y, options = {
    sizeMouse: 30,
    pushForce: 5,
    decay: 0.9
  }) {
    const mx = isNaN(x) ? 0 : x;
    const my = isNaN(y) ? 0 : y;
    const dx = this.x - mx;
    const dy = this.y - my;
    const distance = Math.hypot(dx, dy);

    if (distance < (this.radius + options.sizeMouse)) {
      // this.fillColor = "blue";
    } else {
      this.fillColor = this.otherColor;
    }

    if (distance < (this.radius + options.sizeMouse + 10)) {
      const angle = Math.atan2(dy, dx);
      this.vx = Math.cos(angle) * options.pushForce;
      this.vy = Math.sin(angle) * options.pushForce;
    }
    
    if (Math.abs(this.vy) > 0.1 || Math.abs(this.vx) > 0.1) {
      this.vx *= options.decay;
      this.vy *= options.decay;
    }
  }

  /**
   * Move o círculo e rebate nas bordas do canvas.
   * @param {HTMLCanvasElement} canvas - O elemento canvas.
   * @param {number} [velocityX=1] - Velocidade inicial X.
   * @param {number} [velocityY=1] - Velocidade inicial Y.
   */
  moveAndBounceInCanvas(canvas, velocityX = 1, velocityY = 1) {
    this.vx = this.vx ?? velocityX;
    this.vy = this.vy ?? velocityY;

    this.x += this.vx;
    this.y += this.vy;

    const maxX = canvas.width - this.radius;
    const minX = this.radius;
    const maxY = canvas.height - this.radius;
    const minY = this.radius;

    if (this.x > maxX || this.x < minX) {
      this.vx *= -1;
      this.x = Math.max(minX, Math.min(this.x, maxX));
    }

    if (this.y > maxY || this.y < minY) {
      this.vy *= -1;
      this.y = Math.max(minY, Math.min(this.y, maxY));
    }
  }

  // Getters e Setters

  set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  set size(radius) {
    this.radius = radius;
  }

  get size() {
    return this.radius;
  }

  set colors({ fill, stroke }) {
    this.fillColor = fill;
    this.strokeColor = stroke;
  }

  get colors() {
    return {
      fill: this.fillColor,
      stroke: this.strokeColor
    };
  }

  set style(options = {}) {
    this.strokeWidth = options.strokeWidth ?? this.strokeWidth;
    this.shadow = options.shadow ?? this.shadow;
    this.shadowColor = options.shadowColor ?? this.shadowColor;
    this.shadowBlur = options.shadowBlur ?? this.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX ?? this.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY ?? this.shadowOffsetY;
  }

  get style() {
    return {
      strokeWidth: this.strokeWidth,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY
    };
  }
}