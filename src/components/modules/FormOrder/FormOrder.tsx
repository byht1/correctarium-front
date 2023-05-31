import { Title } from './FormOrder.styled'
import { Container } from 'src/components/global/styled'
import { Box, FormContext } from 'src/components/global'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TOrderForm, schema } from './lib/schema'
import { Input, Selector, TextareaAndFile } from '../elementForm'

// IoIosArrowUp
// IoIosArrowDown

export const FormOrder = () => {
  const methods = useForm<TOrderForm>({ resolver: zodResolver(schema) })

  const handlerSubmit = (data: TOrderForm) => {
    console.log('🚀  data:', data)
  }

  return (
    <Container>
      <Title>Замовити переклад або редагування</Title>

      <FormContext submit={handlerSubmit} methods={methods} autoComplete="off">
        <Box display="flex" flexDirection="column" gridGap="15px">
          <Selector inputName="service" name="Послуга" value={['Редагування', 'Переклад']} />
          <TextareaAndFile />
          <Input inputName="email" type="email" name="Ваша електронна пошта" />
          <Input inputName="name" type="text" name="Ваше ім'я" />
          <Input inputName="comment" type="text" name="Коментар або покликання" />
          <Selector
            inputName="language"
            name="Мова"
            value={['Українська', 'Російська', 'Англійська']}
          />
          <button type="submit">ssssssss</button>
        </Box>
      </FormContext>
    </Container>
  )
}

// TextareaAndFile
