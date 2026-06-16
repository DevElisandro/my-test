import { createClient } from "@/app/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stats = [
    {
      label: "Proyectos",
      value: "12",
      change: "+2 este mes",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
    },
    {
      label: "Tareas",
      value: "48",
      change: "8 pendientes",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      label: "Equipo",
      value: "6",
      change: "2 en línea",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      label: "Reportes",
      value: "24",
      change: "+5 esta semana",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  const activities = [
    {
      action: "Nuevo proyecto creado",
      detail: "Landing Page Redesign",
      time: "Hace 2 horas",
    },
    {
      action: "Tarea completada",
      detail: "Configurar base de datos",
      time: "Hace 4 horas",
    },
    {
      action: "Miembro añadido",
      detail: "carlos@email.com se unió al equipo",
      time: "Hace 1 día",
    },
    {
      action: "Reporte generado",
      detail: "Reporte mensual de junio",
      time: "Hace 2 días",
    },
    {
      action: "Tarea completada",
      detail: "Diseñar mockups de la app",
      time: "Hace 3 días",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Hola, {user?.email?.split("@")[0]} 👋
        </h1>
        <p className="text-text-muted mt-1">
          Aquí tienes un resumen de tu actividad
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`stat-card rounded-xl p-5 animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent-light">
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-text-muted mt-0.5">{stat.label}</p>
            <p className="text-xs text-accent-light mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Actividad Reciente */}
      <div className="stat-card rounded-xl p-6 animate-fade-in-delay-3">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b border-border-subtle last:border-0 last:pb-0"
            >
              <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.action}
                </p>
                <p className="text-sm text-text-muted truncate">
                  {activity.detail}
                </p>
              </div>
              <span className="text-xs text-text-muted whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
