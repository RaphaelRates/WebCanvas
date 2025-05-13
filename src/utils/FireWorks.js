/**
 * Desenha uma linha de onda curva (senoidal) com várias opções de configuração.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas.
 * @param {number} x - Posição inicial X.
 * @param {number} y - Posição inicial Y (linha base da onda).
 * @param {number} length - Comprimento da onda.
 * @param {Object} config - Configurações visuais.
 */
export default class WaveLine {
    constructor(ctx, x, y, length = 300, {
      frequency = 0.02,       // Espaçamento de ciclos
      magnitude = 20,         // Altura da onda (pico)
      altitude = 0,           // Deslocamento vertical
      color = 'black',        // Cor da linha
      width = 2,              // Espessura da linha
      shadow = false,         // Ativa sombra?
      shadowConfig = {
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 4,
        offsetX: 2,
        offsetY: 2
      },
      resolution = 1,         // Passo em pixels
      phase = 0               // Deslocamento horizontal (ideal para animação)
    } = {}) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.length = length;
  
      this.frequency = frequency;
      this.magnitude = magnitude;
      this.altitude = altitude;
  
      this.color = color;
      this.width = width;
  
      this.shadow = shadow;
      this.shadowConfig = shadowConfig;
  
      this.resolution = resolution;
      this.phase = phase;
    }
  
    update(properties = {}) {
      Object.assign(this, properties);
    }
  
    draw() {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.strokeStyle = this.color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
  
      if (this.shadow) {
        ctx.shadowColor = this.shadowConfig.color;
        ctx.shadowBlur = this.shadowConfig.blur;
        ctx.shadowOffsetX = this.shadowConfig.offsetX;
        ctx.shadowOffsetY = this.shadowConfig.offsetY;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
  
      ctx.moveTo(this.x, this.y);
  
      for (let i = 0; i <= this.length; i += this.resolution) {
        const dx = this.x + i;
        const dy = this.y + Math.sin(i * this.frequency + this.phase) * this.magnitude + this.altitude;
        ctx.lineTo(dx, dy);
      }
  
      ctx.stroke();
      ctx.closePath();
    }

    update(deltaTime, config = {}) {
        const t = Date.now() * 0.001;
      
        if (this.autoAnimate.frequency) {git 
          this.frequency = this.baseFrequency + this.freqVar * Math.sin(t * this.freqSpeed);
        }
      
        if (this.autoAnimate.amplitude) {
          this.amplitude = this.baseAmplitude + this.ampVar * Math.sin(t * this.ampSpeed);
        }
      
        if (this.autoAnimate.phase) {
          this.phase += this.phaseSpeed * deltaTime;
        }
      
        if (config.frequency !== undefined) {
          this.frequency += config.frequency;
          this.baseFrequency += config.frequency;
        }
      
        if (config.amplitude !== undefined) {
          this.amplitude += config.amplitude;
          this.baseAmplitude += config.amplitude;
        }
      
        if (config.phase !== undefined) {
          this.phase += config.phase;
        }
      
        if (config.speed !== undefined) {
          this.speed += config.speed;
        }
      }
  
    set style({ color, width, shadow, shadowConfig } = {}) {
      this.color = color ?? this.color;
      this.width = width ?? this.width;
      this.shadow = shadow ?? this.shadow;
      this.shadowConfig = shadowConfig ?? this.shadowConfig;
    }
  
    get style() {
      return {
        color: this.color,
        width: this.width,
        shadow: this.shadow,
        shadowConfig: this.shadowConfig
      };
    }
  }
  