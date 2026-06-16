export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Esferas de fondo animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-float animate-pulse-glow absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(124, 58, 237, 0.15)" }}
        />
        <div
          className="animate-float-slow animate-pulse-glow absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "rgba(59, 130, 246, 0.1)",
            animationDelay: "2s",
          }}
        />
        <div
          className="animate-float-slower animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: "rgba(124, 58, 237, 0.08)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
