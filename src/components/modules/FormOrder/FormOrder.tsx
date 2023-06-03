import { ButtonSubmit, CostNumber, CostText, FormBox, GroupBox, Title } from './FormOrder.styled'
import { Container } from 'src/components/global/styled'
import { Box, FormContext } from 'src/components/global'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TOrderForm, schema } from './lib/schema'
import { Input, Selector, TextareaAndFile } from '../elementForm'
import { useEffect } from 'react'
import { OrderCalcService } from 'src/service/orderCalc/orderCalc.service'

const readFile = (file: File | undefined) => {
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

export const FormOrder = () => {
  const methods = useForm<TOrderForm>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })
  const { watch } = methods
  const paramsOrder = watch(['file', 'text', 'language', 'service'])

  useEffect(() => {
    const [file, text, language, service] = paramsOrder
    if (!language || !service) return
    let length = 0

    if (file?.length) {
      const currentFile = file[0]

      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        length = content.length
      }
      reader.readAsText(currentFile)
    }

    if (text) {
      length = text.length
    }

    console.log('🚀  length:', length)
    if (!length) return

    const orderCalcService = new OrderCalcService({ file, text, language, service, length })

    console.log('🚀  orderCalcService:', orderCalcService.getOrderData())
  }, [paramsOrder])

  const handlerSubmit: SubmitHandler<TOrderForm> = (data) => {
    console.log('🚀  data:', data)
  }

  return (
    <Container>
      <Box pt="80px" pb="120px">
        <Title>Замовити переклад або редагування</Title>

        <FormContext submit={handlerSubmit} methods={methods} autoComplete="off">
          <FormBox>
            <Box display="flex" flexDirection="column" gridGap="32px">
              <Selector inputName="service" name="Послуга" value={['Редагування', 'Переклад']} />
              <TextareaAndFile />
              <GroupBox>
                <Input inputName="email" type="email" name="Ваша електронна пошта" />
                <Input inputName="name" type="text" name="Ваше ім'я" />
                <Input inputName="comment" type="text" name="Коментар або покликання" />
                <Selector
                  inputName="language"
                  name="Мова"
                  value={['Українська', 'Російська', 'Англійська']}
                />
              </GroupBox>
            </Box>
            <div>
              <CostText>
                <CostNumber>0</CostNumber>
                <span>грн</span>
              </CostText>
              <ButtonSubmit type="submit">Зробити замовлення</ButtonSubmit>
            </div>
          </FormBox>
        </FormContext>
      </Box>
    </Container>
  )
}

// TextareaAndFile
