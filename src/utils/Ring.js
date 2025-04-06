/**
 * Desenha um anel (círculo com um buraco central) no canvas.
 * @class Ring
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Posição X do centro.
 * @param {number} y - Posição Y do centro.
 * @param {number} outerRadius - Raio externo do anel.
 * @param {number} innerRadius - Raio interno do anel.
 * @param {Object} options - Estilos opcionais.
 * @param {string} [options.fillColor="black"] - Cor de preenchimento.
 * @param {string} [options.strokeColor=null] - Cor da borda.
 * @param {number} [options.lineWidth=1] - Espessura da borda.
 * @param {boolean} [options.shadow=false] - Se aplica sombra.
 * @param {string} [options.shadowColor="rgba(0,0,0,0.5)"]
 * @param {number} [options.shadowBlur=4]
 * @param {number} [options.shadowOffsetX=2]
 * @param {number} [options.shadowOffsetY=2]
 */
export default class Ring {
  constructor(ctx, x, y, outerRadius, innerRadius, options = {}) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;

    // Estilos
    this.fillColor = options.fillColor ?? "black";
    this.otherColor = this.fillColor;
    this.strokeColor = options.strokeColor ?? null;
    this.lineWidth = options.lineWidth ?? 1;
    this.shadow = options.shadow ?? false;
    this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
    this.shadowBlur = options.shadowBlur ?? 4;
    this.shadowOffsetX = options.shadowOffsetX ?? 2;
    this.shadowOffsetY = options.shadowOffsetY ?? 2;

    // Velocidade para animação
    this.vx = 1;
    this.vy = 0;
  }

  /**
   * Atualiza propriedades do anel.
   */
  update(properties = {}) {
    Object.assign(this, properties);
  }

  /**
   * Desenha o anel no canvas.
   */
  draw() {
    const ctx = this.ctx;

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

    ctx.arc(this.x, this.y, this.outerRadius, 0, Math.PI * 2, false);
    ctx.arc(this.x, this.y, this.innerRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    if (this.fillColor) {
      ctx.fillStyle = this.fillColor;
      ctx.fill("evenodd");
    }

    if (this.strokeColor) {
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.lineWidth;
      ctx.stroke();
    }
  }

  /**
   * Atualiza o tamanho do anel com base na posição do mouse.
   * @param {number} mouseX - Posição X do mouse.
   * @param {number} mouseY - Posição Y do mouse. 
   * @param {number} minSize - Tamanho mínimo do anel.
   * @param {number} maxSize - Tamanho máximo do anel.
   * @returns {void}
   * @description O anel se expande quando o mouse está próximo e se contrai quando o mouse está longe.
   * @example
   * const ring = new Ring(ctx, 100, 100, 50, 20);
   *  ring.updateSizeForMouse(mouseX, mouseY, 50, 100);
   *  ring.draw();
   */
  updateSizeForMouse(mouse, options = {}) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (!this._baseOuterRadius) {
      this._baseOuterRadius = this.outerRadius;
      this._baseInnerRadius = this.innerRadius;
    }

    const minSize = options.minSize ?? this.outerRadius;
    const maxSize = options.maxSize ?? minSize * 2;
    const proximityLimit = options.prox ?? 100;
    const growSpeed = options.speedGrow ?? 0.7;
    const shrinkSpeed = options.speedShrink ?? 0.3;

    if (distance < proximityLimit) {
      if (this.outerRadius < maxSize) {
        this.outerRadius += growSpeed;
        if (this.outerRadius > maxSize) this.outerRadius = maxSize;
      }
    } else {
      if (this.outerRadius > minSize) {
        this.outerRadius -= shrinkSpeed;
        if (this.outerRadius < minSize) this.outerRadius = minSize;
      }
    }
  }

  /**
  * @param {Object} config - Configurações para aplicar gravidade.
  * @param {number} config.gravity - Força da gravidade. Padrão: 0.5
  * @param {number} config.ground - Y do chão onde o objeto para. Padrão: altura da janela
  * @param {number} config.bounce - Multiplicador de quique. Padrão: 0.6
  * @param {number} config.friction - Reduz a energia a cada quique. Padrão: 0.98
  * @param {number} config.delta - Fator de tempo. Padrão: 1
  */
  applyGravity({
    gravity = 0.5,
    ground = innerHeight - this.outerRadius,
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

    if (distance < (this.outerRadius + this.innerRadius + options.sizeMouse)) {
      this.fillColor = "blue";
    } else {
      this.fillColor = this.otherColor;
    }

    if (distance < (this.outerRadius + this.innerRadius + options.sizeMouse + 10)) {
      this.vx = dx < 0 ? -options.pushForce : options.pushForce;
      this.vy = dy < 0 ? -options.pushForce : options.pushForce;
      console.log(this.vx, this.vy);
    }
    if(Math.abs(this.vy) > 0.1|| Math.abs(this.vx) > 0.1){
      this.vx *= options.decay;
      this.vy *= options.decay;
    }
  }

  /**
   * Move o anel e rebate nas bordas do canvas.
   */
  moveAndBounceInCanvas(canvas, velocityX = 1, velocityY = 1) {
    this.vx = this.vx ?? velocityX;
    this.vy = this.vy ?? velocityY;

    this.x += this.vx;
    this.y += this.vy;

    const maxX = canvas.width - this.outerRadius;
    const minX = this.outerRadius;
    const maxY = canvas.height - this.outerRadius;
    const minY = this.outerRadius;

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

  set size({ outer, inner }) {
    this.outerRadius = outer;
    this.innerRadius = inner;
  }

  get size() {
    return { outer: this.outerRadius, inner: this.innerRadius };
  }

  set style(options = {}) {
    this.fillColor = options.fillColor ?? this.fillColor;
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
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
      shadow: this.shadow,
      shadowColor: this.shadowColor,
      shadowBlur: this.shadowBlur,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY
    };
  }
}
