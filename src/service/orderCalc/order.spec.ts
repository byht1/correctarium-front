import * as sinon from 'sinon'
import { OrderCalcService } from './orderCalc.service'

const setGlobalTime = (date = '2023-05-15T15:00:00') => {
  const desiredTime = new Date(date)
  return sinon.useFakeTimers(desiredTime.getTime())
}

describe('SERVICE Calc order', () => {
  let clock: sinon.SinonFakeTimers

  afterEach(() => {
    // Відновлюємо глобальні таймери після кожного тесту
    clock.restore()
  })

  it('EN Order in the middle of the day', () => {
    clock = setGlobalTime()
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
    clock = setGlobalTime()
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

  it('EN Next day order', () => {
    clock = setGlobalTime()
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

  it('UK Next day order', () => {
    clock = setGlobalTime()
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
    clock = setGlobalTime()
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
    clock = setGlobalTime()
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

  it('EN The order was placed after the end of the working day', () => {
    clock = setGlobalTime('2023-05-15T20:00:00')
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Англійська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(5762163)
    expect(price).toBe(120)
    expect(deadlineDate).toBe('16 травня, 11:36')
    expect(time).toBe('1 годин 36 хвилин')
  })

  it('UK The order was placed after the end of the working day', () => {
    clock = setGlobalTime('2023-05-15T20:00:00')
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(4140136)
    expect(price).toBe(50)
    expect(deadlineDate).toBe('16 травня, 11:09')
    expect(time).toBe('1 годин 9 хвилин')
  })

  it('EN The order was made on a weekend', () => {
    clock = setGlobalTime('2023-05-20T20:00:00')
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Англійська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(5762163)
    expect(price).toBe(120)
    expect(deadlineDate).toBe('22 травня, 11:36')
    expect(time).toBe('1 годин 36 хвилин')
  })

  it('UK The order was made on a weekend', () => {
    clock = setGlobalTime('2023-05-20T20:00:00')
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(4140136)
    expect(price).toBe(50)
    expect(deadlineDate).toBe('22 травня, 11:09')
    expect(time).toBe('1 годин 9 хвилин')
  })

  it('EN The order was placed before the beginning of the working day', () => {
    clock = setGlobalTime('2023-06-06T00:30:00')
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Англійська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(5762163)
    expect(price).toBe(120)
    expect(deadlineDate).toBe('6 червня, 11:36')
    expect(time).toBe('1 годин 36 хвилин')
  })

  it('UK The order was placed before the beginning of the working day', () => {
    clock = setGlobalTime('2023-06-06T00:30:00')
    const orderCalcService = new OrderCalcService({
      length: 200,
      language: 'Українська',
      service: 'Переклад',
    })

    const { deadline, price, deadlineDate, time } = orderCalcService.getOrderData()
    expect(deadline).toBe(4140136)
    expect(price).toBe(50)
    expect(deadlineDate).toBe('6 червня, 11:09')
    expect(time).toBe('1 годин 9 хвилин')
  })
})
