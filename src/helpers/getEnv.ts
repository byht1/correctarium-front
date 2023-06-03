type EnvValueNameToNumber =
  | 'SURCHARGE_PERCENTAGE'
  | 'UK_PRICE'
  | 'UK_MIN_PRICE'
  | 'UK_CHARACTERS_PER_HOUR'
  | 'RU_PRICE'
  | 'RU_MIN_PRICE'
  | 'RU_CHARACTERS_PER_HOUR'
  | 'EN_PRICE'
  | 'EN_MIN_PRICE'
  | 'EN_CHARACTERS_PER_HOUR'
  | 'DEFAULT_DEADLINE'
  | 'DEFAULT_DEADLINE_INVALID_MIMETYPE'
  | 'MIN_DEADLINE'
  | 'WORKING_HOURS_PER_DAY'
  | 'START_TIME_HOURS'
  | 'START_TIME_MINUTES'
  | 'FINISH_TIME_HOURS'
  | 'FINISH_TIME_MINUTES'

type EnvValueName = 'MIMETYPE'

export const getEnvNumber = (value: EnvValueNameToNumber, defaultValue: number) => {
  const envValue = import.meta.env['VITE_' + value]
  const toNumber = Number(envValue)
  return !Number.isNaN(toNumber) ? toNumber : defaultValue
}

export const getEnv = (value: EnvValueName, defaultValue?: number) => {
  const envValue = import.meta.env['VITE_' + value]
  return envValue ?? defaultValue
}
