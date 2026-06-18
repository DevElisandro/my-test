"use client";

import { useActionState, useState } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="glass-card rounded-lg p-8 relative overflow-hidden animate-fade-in shadow-2xl border border-white/10">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-delay-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Crear cuenta</h1>
        <p className="text-text-muted mt-1.5 text-sm">
          Regístrate para comenzar
        </p>
      </div>

      {/* Mensaje de Éxito y Error */}
      {state?.message && (
        <div
          className={`mb-5 p-3 rounded-xl text-sm text-center animate-fade-in flex items-center justify-center gap-2 ${
            state.message.startsWith("Cuenta creada")
              ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
              : "bg-danger/10 border border-danger/25 text-danger"
          }`}
        >
          {state.message.startsWith("Cuenta creada") && (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          <span>{state.message}</span>
        </div>
      )}

      {/* Formulario */}
      <form action={action} className="space-y-5">
        <div className="animate-fade-in-delay-2">
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2"
          >
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              @
            </span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              className="input-field w-full pl-10 pr-4 py-3 rounded-lg text-sm"
              autoComplete="email"
              required
            />
          </div>
          {state?.errors?.email && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-danger inline-block" />
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="animate-fade-in-delay-2">
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2"
          >
            Contraseña
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-field w-full pl-10 pr-10 py-3 rounded-lg text-sm"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {state?.errors?.password && (
            <div className="mt-1.5 text-xs text-danger space-y-1">
              {state.errors.password.map((error) => (
                <p key={error} className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-danger inline-block" />
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in-delay-3">
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2"
          >
            Confirmar contraseña
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-field w-full pl-10 pr-10 py-3 rounded-lg text-sm"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              {showConfirmPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {state?.errors?.confirmPassword && (
            <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-danger inline-block" />
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={pending}
          variant="primary"
          className="w-full"
        >
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creando cuenta...
            </span>
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </form>

      {/* Link al login */}
      <p className="text-center text-sm text-text-muted mt-8 animate-fade-in-delay-3">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-accent-light hover:text-accent transition-colors font-semibold"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
