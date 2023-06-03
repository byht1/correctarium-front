import { getEnv, getEnvNumber } from 'src/helpers'

export class OrderCalculationData {
  public SECOND_MS = 1000
  public MINUTE_MS = 60_000
  public HOUR_MS = 3_600_000
  public HALF_AN_HOUR_MS = this.HOUR_MS / 2

  protected MIMETYPE: string[]
  protected SURCHARGE_PERCENTAGE: number

  protected UK_PRICE = getEnvNumber('UK_PRICE', 0.05)
  protected UK_MIN_PRICE = getEnvNumber('UK_MIN_PRICE', 50)
  protected UK_CHARACTERS_PER_HOUR = getEnvNumber('UK_CHARACTERS_PER_HOUR', 1333)

  protected RU_PRICE = getEnvNumber('RU_PRICE', 0.05)
  protected RU_MIN_PRICE = getEnvNumber('RU_MIN_PRICE', 50)
  protected RU_CHARACTERS_PER_HOUR = getEnvNumber('RU_CHARACTERS_PER_HOUR', 1333)

  protected EN_PRICE = getEnvNumber('EN_PRICE', 0.12)
  protected EN_MIN_PRICE = getEnvNumber('EN_MIN_PRICE', 120)
  protected EN_CHARACTERS_PER_HOUR = getEnvNumber('EN_CHARACTERS_PER_HOUR', 333)

  protected DEFAULT_DEADLINE = getEnvNumber('DEFAULT_DEADLINE', 30)
  protected DEFAULT_DEADLINE_INVALID_MIMETYPE = getEnvNumber(
    'DEFAULT_DEADLINE_INVALID_MIMETYPE',
    60
  )
  protected MIN_DEADLINE = getEnvNumber('MIN_DEADLINE', 60)

  protected WORKING_HOURS = getEnvNumber('WORKING_HOURS_PER_DAY', 9)
  protected WORKING_HOURS_MS = this.WORKING_HOURS * this.HOUR_MS

  protected START_TIME_HOURS = getEnvNumber('START_TIME_HOURS', 10)
  protected START_TIME_MINUTES = getEnvNumber('START_TIME_MINUTES', 0)

  protected FINISH_TIME_HOURS = getEnvNumber('FINISH_TIME_HOURS', 19)
  protected FINISH_TIME_MINUTES = getEnvNumber('FINISH_TIME_MINUTES', 0)

  constructor() {
    this.MIMETYPE = this.getMIMEType()
    this.SURCHARGE_PERCENTAGE = this.getSurchargePercentage()
  }

  private getMIMEType = () => {
    const value = getEnv('MIMETYPE')
    return value.split('|')
  }

  private getSurchargePercentage = () => {
    const value = getEnvNumber('SURCHARGE_PERCENTAGE', 20)
    return value / 100
  }
}
