'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import {
  LoginFormSchema,
  SignupFormSchema,
  type LoginFormState,
  type SignupFormState,
} from '@/app/lib/definitions'

export async function login(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  // 1. Validar campos del formulario
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Intentar iniciar sesión con Supabase
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  })

  if (error) {
    return {
      message: 'Email o contraseña incorrectos.',
    }
  }

  // 3. Redirigir al dashboard
  redirect('/dashboard')
}

export async function signup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  // 1. Validar campos del formulario
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Crear cuenta con Supabase
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  })

  if (error) {
    return {
      message: error.message,
    }
  }

  // 3. Si no hay sesión, la confirmación por email está activada
  if (!data.session) {
    return {
      message:
        'Cuenta creada. Revisa tu email para confirmar tu cuenta antes de iniciar sesión.',
    }
  }

  // 4. Si hay sesión, redirigir al dashboard
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
