import { ButtonSubmit, CostNumber, CostText, FormBox, GroupBox, Title } from './FormOrder.styled'
import { Container } from 'src/components/global/styled'
import { Box, FormContext } from 'src/components/global'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TOrderForm, schema } from './lib/schema'
import { Input, Selector, TextareaAndFile } from '../elementForm'

// IoIosArrowUp
// IoIosArrowDown

export const FormOrder = () => {
  const methods = useForm<TOrderForm>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

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
