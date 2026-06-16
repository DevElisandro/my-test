import * as z from 'zod'

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor ingresa un email válido.' })
    .trim(),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    .trim(),
})

export const SignupFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Por favor ingresa un email válido.' })
      .trim(),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
      .regex(/[a-zA-Z]/, {
        message: 'Debe contener al menos una letra.',
      })
      .regex(/[0-9]/, {
        message: 'Debe contener al menos un número.',
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SignupFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined
