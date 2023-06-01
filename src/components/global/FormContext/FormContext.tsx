import { FC, KeyboardEvent, ReactNode } from 'react'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TOrderForm } from 'src/components/modules/FormOrder/lib/schema'

type PropsFormContext = {
  methods: UseFormReturn<any, any>
  submit: SubmitHandler<TOrderForm>
  children: ReactNode
  autoComplete?: 'on' | 'off'
}

export const FormContext: FC<PropsFormContext> = ({
  methods,
  submit,
  children,
  autoComplete = 'on',
}) => {
  const { handleSubmit } = methods

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <FormProvider {...methods}>
      <form
        onKeyDown={(e) => checkKeyDown(e)}
        autoComplete={autoComplete}
        onSubmit={handleSubmit(submit, (error) => {
          console.log('🚀  error:', error)
        })}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  )
}
