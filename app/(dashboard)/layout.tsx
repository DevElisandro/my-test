import Link from "next/link";
import { logout } from "@/app/actions/auth";
import TopBar from "@/components/layout/topBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">


      {/* Main content */}
      <main className="flex-1 min-w-0 min-h-screen pt-16">
        <TopBar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
