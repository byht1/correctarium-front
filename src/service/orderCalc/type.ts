import { TOrderForm } from 'src/components/modules/FormOrder/lib/schema'

export interface IOrderCalcService {
  getOrderData: TGetOrderDataFn
}

export type TOrder = {
  price: number
  time: string
  deadline: number
  deadlineDate: string
}

export type TGetOrderDataFn = () => TOrder
export type TReadFileFn = (file: File | undefined) => Promise<number>

export type TCalculatePriceFn = (...args: DataCalcArguments) => number
export type TCalculateExecutionTimeMs = (...args: DataCalcArguments) => number
export type FormatMSToHoursAndMinutesFn = (totalTime: number) => string
export type TCalculateCompletionDateAndTimeFn = (millisecondsOfWork: number) => string
export type TGetExpansionFn = (file: File | undefined) => string
export type TGetLanguageParamsFn = (language: TOrderForm['language']) => TLanguageParamsResponse
export type TOrderCalcServiceData = Pick<TOrderForm, 'file' | 'text' | 'language' | 'service'> & {
  length: number
}

export type TLanguageParamsResponse = {
  language: string
  price: number
  minPrice: number
  deadline: number
}

type DataCalcArguments = [TLanguageParamsResponse, string, number]
