import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
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
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<TOrderForm>()
  const [show, setShow] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const currentValue = getValues(inputName)
  const currentSelectValue = watch(inputName)

  useEffect(() => {
    if (currentSelectValue) {
      trigger(inputName)
    }
  }, [currentSelectValue, inputName, trigger])

  const handlerValue = useCallback(
    (value: ValuesSelect) => {
      setValue(inputName, value)
      setShow(false)
    },
    [inputName, setValue]
  )

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setShow(false)
    }
  }, [])

  return (
    <Box position="relative" maxWidth="345px" ref={selectRef}>
      <Label onFocus={() => setShow(true)}>
        <CustomInput type="text" {...register(inputName)} placeholder={name} />
        <Text>{name}</Text>
        <ArrowButton
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className={show ? 'show' : ''}
        >
          <IoIosArrowDown />
        </ArrowButton>
      </Label>
      {errors[inputName]?.message && <ErrorText>{errors[inputName]?.message}</ErrorText>}
      {show && (
        <SelectList
          clickOutside={handleClickOutside}
          currentValue={currentValue}
          setShow={setShow}
          setValue={handlerValue}
          value={value}
        />
      )}
    </Box>
  )
}
