import React, { FC, ReactNode } from 'react'
import { AfterBox, CustomInput, ErrorText, Label, Text } from '../ElementForm.styled'
import { useFormContext } from 'react-hook-form'
import { TFieldsOrderForm, TOrderForm } from '../../FormOrder/lib/schema'
type InputProps = {
  type: 'text' | 'email'
  inputName: Exclude<TFieldsOrderForm, 'text' | 'file'>
  name: string

  disabled?: boolean
  afterElement?: ReactNode
}

export const Input: FC<InputProps> = ({
  inputName,
  type,
  name,
  afterElement,
  disabled = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TOrderForm>()

  return (
    <Label>
      <CustomInput type={type} {...register(inputName)} placeholder={name} disabled={disabled} />
      {afterElement && <AfterBox>{afterElement}</AfterBox>}
      {errors[inputName]?.message && <ErrorText>{errors[inputName]?.message}</ErrorText>}
      <Text>{name}</Text>
    </Label>
  )
}
