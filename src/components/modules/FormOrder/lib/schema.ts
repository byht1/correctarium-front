import { KeyToUnion } from 'src/type'
import * as z from 'zod'

const notNull = 'Поле не повинно бути порожнім'

const nonSpecialChars = (field: string) => {
  return z
    .string()
    .refine((value) => value !== '', {
      message: notNull,
    })
    .refine((value) => /^[^0-9!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]+$/.test(value), {
      message: `Поле ${field} не повинно містити числа або спеціальні символи`,
    })
}

export const schema = z
  .object({
    service: z.enum(['Редагування', 'Переклад'], {
      errorMap: () => ({ message: notNull }),
    }),
    email: z.string().email({ message: 'Некоректний email' }),
    name: nonSpecialChars("з ім'ям"),
    language: z.enum(['Українська', 'Російська', 'Англійська'], {
      errorMap: () => ({ message: notNull }),
    }),
    text: z.string().optional(),
    file: z.any().optional(),
    comment: z.string().optional(),
  })
  .refine((data) => data.text || data.file.length > 0, {
    message: 'Необхідно вказати «текст» або завантажити «файл».',
    path: ['text'],
  })

export type TOrderForm = z.TypeOf<typeof schema>
export type TFieldsOrderForm = KeyToUnion<TOrderForm>
