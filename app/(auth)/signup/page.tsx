"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-delay-1">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-purple-800 mb-4">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
        <p className="text-text-muted mt-1 text-sm">
          Regístrate para comenzar
        </p>
      </div>

      {/* Mensaje */}
      {state?.message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm text-center animate-fade-in ${
            state.message.startsWith("Cuenta creada")
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-danger/10 border border-danger/20 text-danger"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* Formulario */}
      <form action={action} className="space-y-5">
        <div className="animate-fade-in-delay-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-muted mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            className="input-field w-full px-4 py-3 rounded-xl text-sm"
            autoComplete="email"
          />
          {state?.errors?.email && (
            <p className="mt-1.5 text-xs text-danger">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="animate-fade-in-delay-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-muted mb-1.5"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="input-field w-full px-4 py-3 rounded-xl text-sm"
            autoComplete="new-password"
          />
          {state?.errors?.password && (
            <div className="mt-1.5 text-xs text-danger space-y-0.5">
              {state.errors.password.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in-delay-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-text-muted mb-1.5"
          >
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="input-field w-full px-4 py-3 rounded-xl text-sm"
            autoComplete="new-password"
          />
          {state?.errors?.confirmPassword && (
            <p className="mt-1.5 text-xs text-danger">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full py-3 rounded-xl text-sm animate-fade-in-delay-3"
        >
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creando cuenta...
            </span>
          ) : (
            "Crear cuenta"
          )}
        </button>
      </form>

      {/* Link a login */}
      <p className="text-center text-sm text-text-muted mt-6 animate-fade-in-delay-3">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-accent-light hover:text-accent transition-colors font-medium"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
