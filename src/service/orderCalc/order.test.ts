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

  test('EN Order in the middle of the day', () => {
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

  test('UK Order in the middle of the day', () => {
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

  test('UK End order for', () => {
    const orderCalcService = new OrderCalcService({
      length: 1000 * 4,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    console.log('🚀  orderCalcService.getOrderData():', orderCalcService.getOrderData())
    expect(deadline).toBe(24989348)
    expect(price).toBe(396)
    expect(deadlineDate).toBe('15 травня, 15:30')
    expect(time).toBe('6 годин 56 хвилин')
  })
})
