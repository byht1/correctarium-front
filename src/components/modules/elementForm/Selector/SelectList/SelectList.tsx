import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { List, Element } from './SelectList.styled'
import { ValuesSelect } from '../Selector'

type ListProps = {
  value: ValuesSelect[]
  currentValue: ValuesSelect

  setValue: (value: ValuesSelect) => void
  setShow: Dispatch<SetStateAction<boolean>>
  clickOutside: (e: MouseEvent) => void
}

export const SelectList: FC<ListProps> = ({
  setShow,
  setValue,
  clickOutside,
  value,
  currentValue,
}) => {
  const [currentFocusValue, setCurrentFocusValue] = useState(value.indexOf(currentValue))

  useEffect(() => {
    const typeEvents = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        return setShow(false)
      }

      if (e.code === 'Enter') {
        setShow(false)
        setValue(value[currentFocusValue])
        return
      }

      if (e.code === 'ArrowUp') {
        return setCurrentFocusValue((prev) => {
          if (prev === 0) return value.length - 1
          if (prev === -1) return 0
          const newValue = prev - 1
          if (newValue > value.length - 1) return 0

          return newValue
        })
      }

      if (e.code === 'ArrowDown') {
        return setCurrentFocusValue((prev) => {
          if (prev === -1) return 0
          const newValue = prev + 1
          if (newValue > value.length - 1) return 0
          if (newValue === 0) return value.length - 1

          return newValue
        })
      }
    }

    const handleBlur = (e: MouseEvent) => {
      clickOutside(e)
    }

    document.addEventListener('keydown', typeEvents)
    document.addEventListener('click', handleBlur)

    return () => {
      document.removeEventListener('keydown', typeEvents)
      document.removeEventListener('click', handleBlur)
    }
  }, [clickOutside, currentFocusValue, setShow, setValue, value])

  return (
    <List>
      {value.map((el, i) => (
        <Element
          key={el}
          $isCurrent={currentValue === el || currentFocusValue === i}
          onClick={() => {
            setValue(el)
          }}
        >
          <span>{el}</span>
        </Element>
      ))}
    </List>
  )
}
