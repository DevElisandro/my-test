import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Evitamos errores de servidor verificando que el componente ya se cargó
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Si no está abierto, no se muestra nada
  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      
      <div className="absolute inset-0" onClick={onClose} />

      {/* Tarjeta del modal */}
      <div className="relative w-full max-w-md bg-surface border border-white/5 p-6 shadow-2xl z-10">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className=" hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="text-neutral-300 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
