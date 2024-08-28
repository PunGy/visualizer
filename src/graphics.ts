
interface TextOptions {
  position?: 'default' | 'center';
  debug?: boolean;
}

export interface TextData {
  metrics: TextMetrics;
  fontSize: number;
  x: number;
  y: number;
  position: NonNullable<TextOptions['position']>;
}

export interface CircleData {
  x: number;
  y: number;
  radius: number;
}
export interface CircleWithTextData extends CircleData {
  textData: TextData;
}

interface LineOptions {
  width?: number;
}

interface ArrowOptions {
  beginStyle?: 'target' | 'none';
  endStyle?: 'target' | 'none';
  width?: number;
}

export class Graphics {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  scale: number
  fontSize = 16

  constructor() {
    const canvas = document.getElementById('world') as HTMLCanvasElement
    if (canvas === null || canvas?.tagName !== 'CANVAS') throw new Error('No canvas exist!')
    const parent = document.getElementById('app')
    if (parent == null) throw new Error('No app exists')
    const width = parent.offsetWidth
    const height = parent.offsetHeight

    const scale = window.devicePixelRatio
    canvas.width = Math.floor(width * scale)
    canvas.height = Math.floor(height * scale)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (ctx === null) throw new Error('No context exist')
    // ctx.webkitImageSmoothingEnabled=true
    ctx.font = `${this.fontSize * scale}px Andale Mono`
    ctx.lineWidth = 2 * scale

    this.canvas = canvas
    this.ctx = ctx
    this.scale = scale

  }

  s = (px: number) => px * this.scale

  circle(x: number, y: number, text: string): CircleWithTextData;
  circle(x: number, y: number, radius: number): CircleData;
  circle(x: number, y: number, textOrRadius: string | number): CircleData | CircleWithTextData {
    const { s, ctx } = this
    const [_x, _y] = [s(x), s(y)]

    const withText = typeof textOrRadius === 'string'
    let r = 0
    if (withText) {
      const padding = s(10)
      r = ctx.measureText(textOrRadius).width / 2 + padding
    } else {
      r = textOrRadius
    }
    ctx.save()
    ctx.beginPath()
    ctx.arc(_x, _y, r, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()

    const data: CircleData = {
      x,
      y,
      radius: r,
    }
    if (withText) {
      (data as CircleWithTextData).textData = this.text(x, y, textOrRadius, { position: 'center' })
    }
    return data
  }


  text(x: number, y: number, text: string, { position = 'default', debug = false }: TextOptions = {}): TextData {
    const { s, ctx } = this

    const textMetrics = ctx.measureText(text)
    const { width, actualBoundingBoxAscent: height } = textMetrics
    let [anchorX, anchorY] = [x, y]

    if (position === 'center') {
      anchorX -= width / 2
      anchorY += height / 2
    }
    const [_x, _y] = [s(anchorX), s(anchorY)]

    ctx.save()
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
    ctx.restore()

    return {
      x: anchorX,
      y: anchorY,
      metrics: textMetrics,
      position,
      fontSize: this.fontSize,
    }
  }

  line(x1: number, y1: number, x2: number, y2: number, { width = 2 }: LineOptions = {}) {
    const { ctx, s } = this
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(s(x1), s(y1))
    ctx.lineTo(s(x2), s(y2))
    ctx.lineWidth = s(width)
    ctx.stroke()
  }

  arrow(x1: number, y1: number, x2: number, y2: number, { beginStyle = 'none', endStyle = 'target', width = 2 }: ArrowOptions = {}) {
    const { ctx, s } = this
    const [_x1, _y1, _x2, _y2] = [s(x1), s(y1), s(x2), s(y2)]

    // Line
    ctx.save()
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = s(width)
    ctx.beginPath()

    ctx.arc(_x1, _y1, s(3), 0, Math.PI * 2)
    ctx.fill()
    ctx.moveTo(_x1, _y1)
    ctx.lineTo(_x2, _y2)
    ctx.stroke()

    const length = Math.min(vectorDistance(_x1, _y1, _x2, _y2) / 6, 30)
    if (endStyle === 'target') {
      const dx = _x2 - _x1
      const dy = _y2 - _y1
      const angle = Math.atan2(dy, dx)

      ctx.beginPath()
      ctx.moveTo(_x2, _y2)
      ctx.lineTo(_x2 - length * Math.cos(angle - Math.PI / 6), _y2 - length * Math.sin(angle - Math.PI / 6))
      ctx.moveTo(_x2, _y2)
      ctx.lineTo(_x2 - length * Math.cos(angle + Math.PI / 6), _y2 - length * Math.sin(angle + Math.PI / 6))
      ctx.stroke()
    }

    ctx.restore()
  }
}

function vectorDistance (x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
