import './style.css'
import { Graphics } from './graphics.ts'


const graphics = new Graphics()
graphics.text(200, 340, 'H: 150px', {
  debug: true,
  position: 'center',
})

graphics.circle(200, 200, 'some another text')

graphics.arrow(400, 150, 500, 300)


