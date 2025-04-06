/**
 * Classe utilitária para manipulação de cores.
 * Suporta conversões, interpolação entre cores, geração de cores aleatórias
 * e comparação de similaridade.
 */
export default class Color {
    /**
     * Retorna uma cor hexadecimal aleatória entre duas cores (hex, rgb, rgba, hsl).
     * 
     * @param {CanvasRenderingContext2D} ctx - Contexto canvas para conversão.
     * @param {string} color1 - Primeira cor.
     * @param {string} color2 - Segunda cor.
     * @returns {string} - Cor aleatória intermediária em formato hexadecimal.
     */
    getRandomColorHexBetween(ctx, color1, color2) {
      const parseColor = (color) => {
        ctx.fillStyle = color;
        ctx.fillStyle = ctx.fillStyle;
        const rgba = ctx.fillStyle
          .replace(/^rgba?\(|\s+|\)$/g, '')
          .split(',')
          .map(Number);
        if (rgba.length === 3) rgba.push(1);
        return rgba;
      };
  
      const toHex = (value) => Math.round(value).toString(16).padStart(2, '0');
  
      const c1 = parseColor(color1);
      const c2 = parseColor(color2);
  
      const r = c1[0] + (c2[0] - c1[0]) * Math.random();
      const g = c1[1] + (c2[1] - c1[1]) * Math.random();
      const b = c1[2] + (c2[2] - c1[2]) * Math.random();
  
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
  
    /**
     * Converte uma cor para o formato hexadecimal.
     * 
     * @param {CanvasRenderingContext2D} ctx - Contexto canvas.
     * @param {string} color - Cor de entrada (hex, rgb, hsl, etc).
     * @returns {string} - Cor em hexadecimal.
     */
    toHex(ctx, color) {
      ctx.fillStyle = color;
      const computed = ctx.fillStyle;
      ctx.fillStyle = computed;
      const [r, g, b] = ctx.fillStyle
        .replace(/^rgba?\(|\s+|\)$/g, '')
        .split(',')
        .map(Number);
      return `#${[r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
    }
  
    /**
     * Gera uma cor hexadecimal aleatória.
     * 
     * @returns {string} - Cor aleatória em hexadecimal.
     */
    randomHex() {
      return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    }
  
    /**
     * Compara duas cores e retorna a distância euclidiana entre elas.
     * 
     * @param {CanvasRenderingContext2D} ctx - Contexto canvas.
     * @param {string} color1 - Cor 1.
     * @param {string} color2 - Cor 2.
     * @returns {number} - Distância entre as cores (0 = iguais).
     */
    colorDistance(ctx, color1, color2) {
      const parse = (color) => {
        ctx.fillStyle = color;
        return ctx.fillStyle
          .replace(/^rgba?\(|\s+|\)$/g, '')
          .split(',')
          .map(Number)
          .slice(0, 3);
      };
  
      const [r1, g1, b1] = parse(color1);
      const [r2, g2, b2] = parse(color2);
  
      return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
    }
  
    /**
     * Verifica se uma cor é escura.
     * 
     * @param {CanvasRenderingContext2D} ctx - Contexto canvas.
     * @param {string} color - Cor para verificar.
     * @returns {boolean} - true se for escura.
     */
    isDark(ctx, color) {
      const [r, g, b] = this.colorToRGB(ctx, color);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
  
    /**
     * Converte uma cor para RGB em array.
     * 
     * @param {CanvasRenderingContext2D} ctx - Contexto canvas.
     * @param {string} color - Cor de entrada.
     * @returns {[number, number, number]} - RGB.
     */
    colorToRGB(ctx, color) {
      ctx.fillStyle = color;
      return ctx.fillStyle
        .replace(/^rgba?\(|\s+|\)$/g, '')
        .split(',')
        .map(Number)
        .slice(0, 3);
    }
  }
  