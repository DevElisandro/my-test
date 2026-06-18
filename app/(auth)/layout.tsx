export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Esferas de fondo animadas y malla */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Malla la use de un pattertn de uiverse */}
        <div className="absolute inset-0 bg-mesh-grid opacity-75" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
