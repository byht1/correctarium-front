import { OrderCalculationData } from './OrderCalculationData'
import moment from 'moment'
import 'moment/locale/uk'
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
} from './type'

moment.locale('uk')

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

  private calculateCompletionDateAndTime: TCalculateCompletionDateAndTimeFn = (workDuration) => {
    const {
      WORKING_HOURS,
      START_TIME_HOURS,
      START_TIME_MINUTES,
      FINISH_TIME_HOURS,
      FINISH_TIME_MINUTES,
    } = this

    const today = moment()
    let deadline = today
      .clone()
      .startOf('day')
      .add(START_TIME_HOURS, 'hours')
      .add(START_TIME_MINUTES, 'minutes')

    // Якщо замовлення отримане після закінчення робочого дня, почати виконання наступного робочого дня
    if (today.isAfter(deadline.clone().add(WORKING_HOURS, 'hours'))) {
      deadline.add(1, 'days')
    }

    // Додати час на виконання роботи
    deadline.add(workDuration, 'milliseconds')

    // Перевірити, чи потрібно збільшити дедлайн через вихідні дні
    while (deadline.isoWeekday() === 6 || deadline.isoWeekday() === 7) {
      deadline.add(1, 'days')
    }

    // Врахувати час закінчення робочого дня
    if (deadline.isAfter(deadline.clone().startOf('day').add(FINISH_TIME_HOURS, 'hours'))) {
      deadline = deadline
        .clone()
        .startOf('day')
        .add(FINISH_TIME_HOURS, 'hours')
        .add(FINISH_TIME_MINUTES, 'minutes')
    }
    moment.locale('uk')
    return deadline.format('D MMMM, HH:mm')
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
