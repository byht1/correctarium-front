import React, { useEffect, useState } from 'react'
import { BoardWrapper, ButtonSubmit } from './BoardCost.styled'
import { useFormContext } from 'react-hook-form'
import { OrderCalcService } from 'src/service/orderCalc/orderCalc.service'
import { TOrder } from 'src/service/orderCalc/type'

export const BoardCost = () => {
  const [order, setOrder] = useState<TOrder | null>(null)
  const { watch } = useFormContext()
  const paramsOrder = watch(['file', 'text', 'language', 'service'])

  useEffect(() => {
    const start = async () => {
      const [file, text, language, service] = paramsOrder
      if (!language || !service) return setOrder(null)
      let length = await OrderCalcService.readFile(file[0])

      if (text) {
        length = text.split(' ').join('').length
      }

      if (!length) return

      const orderCalcService = new OrderCalcService({ file, text, language, service, length })
      const orderData = orderCalcService.getOrderData()
      if (orderData.price !== order?.price) {
        setOrder(orderData)
      }
    }

    start()
  }, [order, paramsOrder])

  return (
    <BoardWrapper>
      <p>
        <span>{order ? order.price.toLocaleString() : 0}</span>
        грн
      </p>
      {order && <p>Дедлайн: {order.deadlineDate}</p>}
      <ButtonSubmit type="submit">Зробити замовлення</ButtonSubmit>
    </BoardWrapper>
  )
}
