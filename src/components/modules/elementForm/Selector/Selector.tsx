import React, { FC, useState } from 'react'
import { TFieldsOrderForm, TOrderForm } from '../../FormOrder/lib/schema'
import { useFormContext } from 'react-hook-form'
import { IoIosArrowDown } from 'react-icons/io'
import { CustomInput, ErrorText, Label, Text } from '../ElementForm.styled'
import { Box } from 'src/components/global'
import { SelectList } from './SelectList'
import { ArrowButton } from './Selector.styled'

export type ValuesSelect = TOrderForm['language'] | TOrderForm['service']

type SelectorProps = {
  inputName: Extract<TFieldsOrderForm, 'language' | 'service'>
  name: string
  value: ValuesSelect[]
}

export const Selector: FC<SelectorProps> = ({ name, inputName, value }) => {
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<TOrderForm>()
  const [show, setShow] = useState(false)
  const currentValue = getValues(inputName)

  const handlerValue = (value: ValuesSelect) => {
    setValue(inputName, value)
    setShow(false)
  }

  return (
    <Box position="relative" maxWidth="345px" onBlur={() => setShow(false)}>
      <Label onFocus={() => setShow(true)}>
        <CustomInput type="text" {...register(inputName)} placeholder={name} />
        <Text>{name}</Text>
        <ArrowButton type="button" onClick={() => setShow(false)} className={show ? 'show' : ''}>
          <IoIosArrowDown />
        </ArrowButton>
        {errors[inputName]?.message && <ErrorText>{errors[inputName]?.message}</ErrorText>}
      </Label>
      {show && (
        <SelectList
          currentValue={currentValue}
          setShow={setShow}
          setValue={handlerValue}
          value={value}
        />
      )}
    </Box>
  )
}

// <List>
//   {value.map((el) => (
//     <Element key={el} $isCurrent={currentValue === el} onClick={() => handlerValue(el)}>
//       <span>{el}</span>
//     </Element>
//   ))}
// </List>
