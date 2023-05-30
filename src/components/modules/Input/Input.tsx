import React, { FC } from 'react'
import {} from './Input.styled'
import { useFormContext } from 'react-hook-form'
import { TFieldsOrderForm, TOrderForm } from '../FormOrder/lib/schema'

type InputProps = {
  type: 'text' | 'email'
  inputName: Exclude<TFieldsOrderForm, 'text' | 'file'>
  name: string
}

export const Input: FC<InputProps> = ({ inputName, type, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TOrderForm>()
  return (
    <label>
      <span>{name}</span>
      <input type={type} {...register(inputName)} placeholder={name} />
      {errors[inputName]?.message && <span>{errors[inputName]?.message}</span>}
    </label>
  )
}
