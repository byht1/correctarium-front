import { OrderCalculationData } from './OrderCalculationData'
import moment from 'moment'
import {
  FormatMSToHoursAndMinutesFn,
  IOrderCalcService,
  TCalculateCompletionDateAndTimeFn,
  TCalculateExecutionTimeMs,
  TCalculatePriceFn,
  TGetExpansionFn,
  TGetLanguageParamsFn,
  TGetOrderDataFn,
  TOrder,
  TOrderCalcServiceData,
  TReadFileFn,
} from './type'
import { MonthKey, months } from 'src/helpers'

export class OrderCalcService extends OrderCalculationData implements IOrderCalcService {
  private orderData: TOrder

  constructor({ language, file, length }: TOrderCalcServiceData) {
    super()
    const languageOrder = this.getLanguageParams(language)
    const fileType = this.getExpansion(file)

    const price = this.calculatePrice(languageOrder, fileType, length)
    const totalWorkingTime = this.calculateExecutionTimeMs(languageOrder, file, length)
    const totalWorkingTimeString = this.formatMSToHoursAndMinutes(totalWorkingTime)
    const deadlineDate = this.calculateCompletionDateAndTime(totalWorkingTime)

    this.orderData = {
      price,
      time: totalWorkingTimeString,
      deadline: totalWorkingTime,
      deadlineDate: deadlineDate,
    }
  }

  public static readFile: TReadFileFn = async (file) => {
    if (!file) return 0
    return new Promise<number>((resolve) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        resolve(content.length)
      }
      reader.readAsText(file)
    })
  }

  public getOrderData: TGetOrderDataFn = () => this.orderData

  private calculatePrice: TCalculatePriceFn = (language, fileType, countSymbol) => {
    const isSupportedFileFormat = this.MIMETYPE.find((expansion) => `.${expansion}` === fileType)
    const price = isSupportedFileFormat ? language.price : language.price * 1.2
    const cost = Number(countSymbol) * price

    if (cost < language.minPrice) return language.minPrice

    return Math.ceil(cost)
  }

  private calculateExecutionTimeMs: TCalculateExecutionTimeMs = (
    language,
    fileType,
    countSymbol
  ) => {
    const { HALF_AN_HOUR_MS, HOUR_MS } = this

    const deadline = countSymbol / language.deadline
    const isSupportedFileFormat = this.MIMETYPE.find((expansion) => `.${expansion}` === fileType)
    const minTime = isSupportedFileFormat ? HALF_AN_HOUR_MS : HOUR_MS

    return Math.ceil(minTime + deadline * HOUR_MS)
  }

  private formatMSToHoursAndMinutes: FormatMSToHoursAndMinutesFn = (totalWorkingTime) => {
    const { WORKING_HOURS_MS, WORKING_HOURS, HOUR_MS, MINUTE_MS } = this
    const day = Math.floor(totalWorkingTime / WORKING_HOURS_MS)
    const hour = Math.floor((totalWorkingTime % WORKING_HOURS_MS) / HOUR_MS)
    const minutes = Math.floor((totalWorkingTime % HOUR_MS) / MINUTE_MS)

    return `${day * WORKING_HOURS + hour} годин ${minutes} хвилин`
  }

  private calculateCompletionDateAndTime: TCalculateCompletionDateAndTimeFn = (workTimeMs) => {
    const {
      WORKING_HOURS,
      START_TIME_HOURS,
      START_TIME_MINUTES,
      FINISH_TIME_HOURS,
      FINISH_TIME_MINUTES,
      HOUR_MS,
    } = this

    const startOfWorkday = moment().set({
      hour: START_TIME_HOURS,
      minute: START_TIME_MINUTES,
      second: 0,
      millisecond: 0,
    })
    const endOfWorkday = moment().set({
      hour: FINISH_TIME_HOURS,
      minute: FINISH_TIME_MINUTES,
      second: 0,
      millisecond: 0,
    })

    // Чи розміщено замовлення у вихідний день?
    if (moment().isoWeekday() === 6) {
      startOfWorkday.add(2, 'days')
      endOfWorkday.add(2, 'days')
    } else if (moment().isoWeekday() === 7) {
      startOfWorkday.add(1, 'day')
      endOfWorkday.add(1, 'day')
    }

    // Розрахунок робочого часу, що залишився, з урахуванням вихідних
    const remainingWorkTimeMs = workTimeMs % (WORKING_HOURS * HOUR_MS)
    const additionalDays = Math.floor(workTimeMs / (WORKING_HOURS * HOUR_MS))

    // Додаю додаткові робочі дні на основі часу, що залишився
    let currentWorkTimeMs = remainingWorkTimeMs
    const currentDeadline = moment(startOfWorkday)
    while (currentWorkTimeMs > 0) {
      const isAfterWorkday = currentDeadline.isAfter(endOfWorkday)
      const isSaturday = currentDeadline.isoWeekday() === 6
      const isSunday = currentDeadline.isoWeekday() === 7

      if (isAfterWorkday || isSaturday || isSunday) {
        currentDeadline.add(1, 'day')
        continue
      }

      const remainingWorkdayTime = endOfWorkday.diff(currentDeadline)
      const allocatedWorkTimeMs = Math.min(currentWorkTimeMs, remainingWorkdayTime)

      currentDeadline.add(allocatedWorkTimeMs, 'milliseconds')
      currentWorkTimeMs -= allocatedWorkTimeMs
    }

    // Додаю додаткові робочі дні залежно від кількості додаткових днів
    currentDeadline.add(additionalDays, 'days')

    // Коригую термін, якщо він припадає на вихідні
    if (currentDeadline.isoWeekday() === 6) {
      currentDeadline.add(2, 'days')
    } else if (currentDeadline.isoWeekday() === 7) {
      currentDeadline.add(1, 'day')
    }

    // return currentDeadline.format('dddd HH:mm')
    const [day, month, time] = currentDeadline.format('D MMMM HH:mm').split(' ')
    return `${day} ${months[month as MonthKey]}, ${time}`
  }

  private getExpansion: TGetExpansionFn = (file) => {
    const [expansion = '.doc'] = file?.name?.split('.').reverse() || []
    console.log('🚀  OrderCalcService  expansion:', expansion)
    return expansion
  }

  private getLanguageParams: TGetLanguageParamsFn = (language) => {
    switch (language) {
      case 'Українська':
        return {
          language,
          price: this.UK_PRICE,
          minPrice: this.UK_MIN_PRICE,
          deadline: this.UK_CHARACTERS_PER_HOUR,
        }

      case 'Російська':
        return {
          language,
          price: this.RU_PRICE,
          minPrice: this.RU_MIN_PRICE,
          deadline: this.RU_CHARACTERS_PER_HOUR,
        }

      case 'Англійська':
        return {
          language,
          price: this.EN_PRICE,
          minPrice: this.EN_MIN_PRICE,
          deadline: this.EN_CHARACTERS_PER_HOUR,
        }
    }
  }
}
