"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface TableProps {
  usuarios: Usuario[];
}

export default function Table({ usuarios: usuariosIniciales }: TableProps) {
  // Cargamos los usuarios iniciales
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const abrirGestion = (user: Usuario) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const eliminarUsuario = (id: string) => {
    // Filtramos la lista para remover al usuario del estado
    setUsuarios(usuarios.filter((u) => u.id !== id));
    setIsOpen(false);
  };

  return (
    <>
      {/* Contenedor de la Tabla */}
      <div className="w-full max-w-full overflow-hidden rounded-lg border border-white/5 bg-surface/40 backdrop-blur-xl shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-neutral-300">
            <thead className="bg-white/5 text-xs font-semibold uppercase tracking-wider text-text-muted border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-white">
                    {user.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => abrirGestion(user)}
                    >
                      Gestionar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* El Modal se renderiza afuera de la tabla */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Gestionar Usuario"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-text-muted">
              Estás gestionando la cuenta del usuario seleccionado.
            </p>
            
            <div className="bg-white/5 p-4 rounded-xl space-y-2 border border-white/5">
              <p className="text-sm">
                <span className="text-text-muted">Nombre:</span>{" "}
                <strong className="text-white">{selectedUser.nombre}</strong>
              </p>
              <p className="text-sm">
                <span className="text-text-muted">Email:</span>{" "}
                <strong className="text-white">{selectedUser.email}</strong>
              </p>
              <p className="text-sm">
                <span className="text-text-muted">Rol:</span>{" "}
                <strong className="text-white">{selectedUser.rol}</strong>
              </p>
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => eliminarUsuario(selectedUser.id)}
              >
                Borrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
