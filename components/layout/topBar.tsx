"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function TopBar() {
  const pathname = usePathname();

  // Función para decidir si un enlace está activo
  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "text-violet-400 font-semibold text-sm transition-colors"
      : "text-neutral-400 hover:text-white text-sm transition-colors";
  };

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border-subtle flex items-center justify-between px-8 z-10">
      {/* Título */}
      <div>
        <h1 className="text-md font-semibold text-white">
          {pathname === "/dashboard" ? "Panel de Control" : "Gestión"}
        </h1>
      </div>

      {/* Navegación */}
      <nav className="flex items-center gap-6">
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          Resumen
        </Link>
      </nav>

      {/* Botón de cerrar sesión */}
      <button
        onClick={() => logout()}
        className="text-neutral-400 hover:text-rose-400 text-sm transition-colors cursor-pointer"
        >
        Cerrar sesión
      </button>
    </header>
  );
}
