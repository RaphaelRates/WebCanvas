export default class Particle {

    /**
     * Cria uma nova partícula.
     * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
     * @param {number} x - Posição X inicial.
     * @param {number} y - Posição Y inicial.
     * @param {number} innerRadius - Raio da partícula.
     * @param {number} radians - Ângulo inicial em radianos.
     * @param {object} options - Estilos opcionais da partícula.
     */
    constructor(ctx, x, y,
        innerRadius, radians, distanceFromCenterX,
        distanceFromCenterY, options = {}) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.innerRadius = innerRadius;
        this.radians = radians;
        this.distanceFromCenterX = distanceFromCenterX;
        this.distanceFromCenterY = distanceFromCenterY;

        // Estilos
        this.fillColor = options.fillColor ?? "black";
        this.shadow = options.shadow ?? false;
        this.shadowColor = options.shadowColor ?? "rgba(0,0,0,0.5)";
        this.shadowBlur = options.shadowBlur ?? 4;
        this.shadowOffsetX = options.shadowOffsetX ?? 2;
        this.shadowOffsetY = options.shadowOffsetY ?? 2;

        this.vx = 1;
        this.vy = 0;
    }

    /**
     * Atualiza as propriedades da partícula dinamicamente.
     * @param {object} properties - Objeto com propriedades para atualizar.
     */
    update(properties = {}) {
        Object.assign(this, properties);
    }

    /**
     * Desenha a partícula no canvas.
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
        ctx.arc(this.x, this.y, this.innerRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor;
            ctx.fill("evenodd");
        }
    }

    /**
 * Faz a partícula se mover em círculo ao redor de um ponto.
 * @param {object} options - Configurações do movimento.
 * @param {number} [options.velocity=0.01] - Velocidade angular.
 * @param {number} [options.radius=20] - Raio fixo da órbita.
 * @param {object} [options.center={x: 300, y: 400}] - Centro da órbita.
 * @param {number} [options.center.x=300] - Posição X do centro.
 * @param {number} [options.center.y=400] - Posição Y do centro.
 */
    animationCircular(options = {}) {
        const {
            velocity = 0.01,
            center = { x: 300, y: 400 }
        } = options;

        if (this.radians === undefined) this.radians = 0;

        this.radians += velocity;

        this.x = center.x + Math.cos(this.radians) * this.distanceFromCenterX;
        this.y = center.y + Math.sin(this.radians) * this.distanceFromCenterY;
    }


    /**
 * Retorna um número aleatório entre min e max (inclusive min e max).
 * @param {number} min - Valor mínimo.
 * @param {number} max - Valor máximo.
 * @returns {number} - Número aleatório entre min e max.
 */
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Define a posição da partícula.
     * @param {object} position - Posição { x, y }.
     */
    set position({ x, y }) {
        this.x = x;
        this.y = y;
    }

    /**
     * Retorna a posição atual da partícula.
     * @returns {object} - Objeto com x e y.
     */
    get position() {
        return { x: this.x, y: this.y };
    }

    /**
     * Define os tamanhos interno e externo da partícula.
     * @param {object} size - Objeto com outer e inner radius.
     */
    set size({ outer, inner }) {
        this.outerRadius = outer;
        this.innerRadius = inner;
    }

    /**
     * Retorna os tamanhos da partícula.
     * @returns {object} - Objeto com outer e inner radius.
     */
    get size() {
        return { outer: this.outerRadius, inner: this.innerRadius };
    }

    /**
     * Define o estilo da partícula.
     * @param {object} options - Objeto com configurações visuais.
     */
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

    /**
     * Retorna o estilo atual da partícula.
     * @returns {object} - Objeto com estilos visuais da partícula.
     */
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
