import * as sinon from 'sinon'
import { OrderCalcService } from './orderCalc.service'

describe('SERVICE Calc order', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    const desiredTime = new Date('2023-05-15T15:00:00') // Понеділок
    clock = sinon.useFakeTimers(desiredTime.getTime())
  })

  afterEach(() => {
    // Відновлюємо глобальні таймери після кожного тесту
    clock.restore()
  })

  it('EN Order in the middle of the day', () => {
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Англійська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(5762163)
    expect(price).toBe(120)
    expect(deadlineDate).toBe('15 травня, 16:36')
    expect(time).toBe('1 годин 36 хвилин')
  })

  it('UK Order in the middle of the day', () => {
    const orderCalcService = new OrderCalcService({
      length: 2000,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(9001351)
    expect(price).toBe(100)
    expect(deadlineDate).toBe('15 травня, 17:30')
    expect(time).toBe('2 годин 30 хвилин')
  })

  it('EN End order for', () => {
    const orderCalcService = new OrderCalcService({
      length: 3333,
      language: 'Англійська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(39632433)
    expect(price).toBe(400)
    expect(deadlineDate).toBe('16 травня, 17:00')
    expect(time).toBe('11 годин 0 хвилин')
  })

  it('UK End order for', () => {
    const orderCalcService = new OrderCalcService({
      length: 11111,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(33607202)
    expect(price).toBe(556)
    expect(deadlineDate).toBe('16 травня, 15:20')
    expect(time).toBe('9 годин 20 хвилин')
  })

  it('EN Order at the end of the week', () => {
    const orderCalcService = new OrderCalcService({
      length: 33214,
      language: 'Англійська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(362670271)
    expect(price).toBe(3986)
    expect(deadlineDate).toBe('26 травня, 16:44')
    expect(time).toBe('100 годин 44 хвилин')
  })

  it('UK Order at the end of the week', () => {
    const orderCalcService = new OrderCalcService({
      length: 111110,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(303672019)
    expect(price).toBe(5556)
    expect(deadlineDate).toBe('24 травня, 18:21')
    expect(time).toBe('84 годин 21 хвилин')
  })
})
