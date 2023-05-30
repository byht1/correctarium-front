import React from 'react'
import { Title } from './FormOrder.styled'
import { Container } from 'src/components/global/styled'
import { FormContext } from 'src/components/global'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TOrderForm, schema } from './lib/schema'

// type FormProps = {}

export const FormOrder = () => {
  const methods = useForm<TOrderForm>({ resolver: zodResolver(schema) })

  const handlerSubmit = (data: any) => {
    console.log('🚀  data:', data)
  }

  return (
    <Container>
      <Title>Замовити переклад або редагування</Title>
      <h2>Замовити переклад або редагування</h2>

      <FormContext submit={handlerSubmit} methods={methods}>
        <div></div>
      </FormContext>
    </Container>
  )
}
