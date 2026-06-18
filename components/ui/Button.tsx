import React from "react";

// Definimos las propiedades específicas del botón
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

// Se crea el componente funcional
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props // Guarda todas las demás propiedades HTML nativas
}: ButtonProps) {
  
  // Clases base para el botón
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-[0.98]";

  // Clases para las variantes visuales
  const variants = {
    primary: "bg-accent hover:bg-accent-light text-white shadow-sm hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-white/5 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white hover:bg-white/10",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-sm",
  };

  // Clases para los tamaños
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
