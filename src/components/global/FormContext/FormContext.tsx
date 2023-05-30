import { FC, ReactNode } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

type PropsFormContext = {
  methods: UseFormReturn<any, any>
  submit: (data: any) => void
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

  return (
    <FormProvider {...methods}>
      <form autoComplete={autoComplete} onSubmit={handleSubmit(submit)} noValidate>
        {children}
      </form>
    </FormProvider>
  )
}
