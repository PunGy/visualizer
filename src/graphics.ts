
export class Graphics {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scale: number;
  fontSize = 16

  constructor() {

    const canvas = document.getElementById('world') as HTMLCanvasElement
    if (canvas === null || canvas?.tagName !== 'CANVAS') throw new Error('No canvas exist!')
    const parent = document.getElementById('app')
    if (parent == null) throw new Error('No app exists')
    const width = parent.offsetWidth
    const height = parent.offsetHeight

    const scale = window.devicePixelRatio;
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d')
    if (ctx === null) throw new Error('No context exist')
    // ctx.webkitImageSmoothingEnabled=true
    ctx.font = `${this.fontSize * scale}px Andale Mono`;
    ctx.lineWidth = 2 * scale;

    this.canvas = canvas
    this.ctx = ctx
    this.scale = scale

  }

  s = (px: number) => px * this.scale

  drawCircle(_x: number, _y: number, text: string) {
    const { s, ctx } = this
    const [x, y] = [s(_x), s(_y)]

    const textMetrics= ctx.measureText(text)
    // const textSize = text.length * this.fontSize
    const textSize = textMetrics.width

    {
      const r = textSize / 2
      const padding = s(10);
      ctx.beginPath()
      ctx.arc(x, y, r + padding, 0, 2 * Math.PI)
      ctx.stroke()
    }

    {
      const xm = x - textSize / 2

      ctx.fillText(text, xm, y + this.fontSize / 2)
      // ctx.fillStyle = 'red'
      // ctx.fillRect(x, y - this.fontSize * 1.5, 4, this.fontSize * 3)
      // ctx.fillStyle = 'green'
      // ctx.fillRect(x - textSize / 2, y - this.fontSize * 1.5, 4, this.fontSize * 3)
      // ctx.fillStyle = 'blue'
      // ctx.fillRect(x + textSize, y - this.fontSize * 1.5, 4, this.fontSize * 3)
    }
  }
}