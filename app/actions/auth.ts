'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { LoginFormSchema, SignupFormSchema, type LoginFormState, type SignupFormState } from '@/app/lib/definitions'

export async function login(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
  // Validamos los datos con Zod
  const data = Object.fromEntries(formData)
  const result = LoginFormSchema.safeParse(data)

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  // Iniciamos sesión con el cliente de Supabase
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(result.data)

  if (error) {
    return { message: 'Email o contraseña incorrectos.' }
  }

  redirect('/dashboard')
}

export async function signup(state: SignupFormState, formData: FormData): Promise<SignupFormState> {
  // Validamos los datos con Zod
  const data = Object.fromEntries(formData)
  const result = SignupFormSchema.safeParse(data)

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  // Se registra el usuario en Supabase
  const supabase = await createClient()
  const { data: userData, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return { message: error.message }
  }

  // Si no inicia sesión de forma automática, requiere confirmar correo
  if (!userData.session) {
    return { message: 'Cuenta creada. Revisa tu email para confirmar tu cuenta.' }
  }

  redirect('/dashboard')
}

export async function logout() {
  // Cerramos sesión y mandamos al login
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
