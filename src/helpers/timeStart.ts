import * as sinon from 'sinon'

export const timeStart = (date = '2023-05-15T15:00:00') => {
  const desiredTime = new Date(date)
  return sinon.useFakeTimers(desiredTime.getTime())
}
