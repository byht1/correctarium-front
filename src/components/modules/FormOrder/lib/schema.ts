import { KeyToUnion } from 'src/type'
import * as z from 'zod'

const nonSpecialChars = (field: string) => {
  const message = `Поле ${field} не повинно містити числа або спеціальні символи`
  return z.string().regex(/^[^0-9!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]+$/, { message })
}

export const schema = z
  .object({
    service: z.enum(['Редагування', 'Переклад']),
    email: z.string().email(),
    name: nonSpecialChars("з ім'ям"),
    language: z.enum(['Українська', 'Російська', 'Англійська']),
    text: z.string().optional(),
    file: z.string().optional(),
    comment: z.string().optional(),
  })
  .refine((data) => data.text || data.file, {
    message: 'Необхідно вказати «текст» або завантажити «файл».',
  })

export type TOrderForm = z.TypeOf<typeof schema>
export type TFieldsOrderForm = KeyToUnion<TOrderForm>
