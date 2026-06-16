"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Bienvenido</h1>
        <p className="text-text-muted mt-1 text-sm">
          Inicia sesión en tu cuenta
        </p>
      </div>

      {/* Error general */}
      {state?.message && (
        <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center animate-fade-in">
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
            autoComplete="current-password"
          />
          {state?.errors?.password && (
            <p className="mt-1.5 text-xs text-danger">
              {state.errors.password[0]}
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
              Ingresando...
            </span>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>

      {/* Link a signup */}
      <p className="text-center text-sm text-text-muted mt-6 animate-fade-in-delay-3">
        ¿No tienes cuenta?{" "}
        <Link
          href="/signup"
          className="text-accent-light hover:text-accent transition-colors font-medium"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
