
interface TextOptions {
  position?: 'default' | 'center',
  debug?: boolean;
}

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

  circle(x: number, y: number, text: string): void;
  circle(x: number, y: number, radius: number): void;
  circle(x: number, y: number, textOrRadius: string | number) {
    const { s, ctx } = this
    const [_x, _y] = [s(x), s(y)]

    const withText = typeof textOrRadius === 'string'
    let r = 0
    if (withText) {
      const padding = s(10);
      r = ctx.measureText(textOrRadius).width / 2 + padding
    } else {
      r = textOrRadius
    }
    ctx.beginPath()
    ctx.arc(_x, _y, r, 0, 2 * Math.PI)
    ctx.stroke()

    if (withText) {
      this.text(x, y, textOrRadius, { position: 'center' })
    }
  }


  text(x: number, y: number, text: string, { position = 'default', debug = false }: TextOptions) {
    const { s, ctx } = this

    const textMetrics = ctx.measureText(text)
    const { width, actualBoundingBoxAscent: height } = textMetrics
    let [_x, _y] = [s(x), s(y)]
  
    if (position === 'center') {
      _x = _x - width / 2
      _y = _y + height / 2
    }

    ctx.fillText(text, _x, _y)

    if (debug) {
      const strokeWidth = s(2)
      ctx.fillStyle = 'green' // upper bound
      ctx.fillRect(_x, _y - height, width, strokeWidth)
      ctx.fillStyle = 'red' // bottom bound
      ctx.fillRect(_x, _y, width, strokeWidth)
      ctx.fillStyle = 'blue' // left bound
      ctx.fillRect(_x, _y - height, strokeWidth, height + strokeWidth)
      ctx.fillStyle = 'purple' // right bound
      ctx.fillRect(_x + width, _y - height, strokeWidth, height + strokeWidth)
      ctx.fillStyle = 'gray' // middle bound
      ctx.fillRect(_x + width / 2, _y - height, strokeWidth, height + strokeWidth)

      ctx.fillStyle = 'green' // drawing point
      ctx.fillRect(_x, _y, strokeWidth, strokeWidth)

      if (position === 'center') {
        ctx.fillStyle = 'pink' // initial x and y
        ctx.fillRect(s(x), s(y), strokeWidth, strokeWidth)
      }
    }
  }
}
