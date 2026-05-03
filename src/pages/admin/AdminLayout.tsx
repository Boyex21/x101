import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LayoutDashboard, Users, CreditCard, BarChart3, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/resellers", icon: Users, label: "Resellers" },
  { path: "/admin/plans", icon: CreditCard, label: "Planes" },
  { path: "/admin/accounts", icon: FileText, label: "Cuentas" },
  { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

const AdminLayout = () => {
  const { isAuthenticated, user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r bg-card p-4 gap-1">
        <div className="mb-6">
          <h2 className="font-bold text-lg">X101 Admin</h2>
          <p className="text-xs text-muted-foreground">{user?.name}</p>
        </div>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
        <div className="mt-auto">
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around py-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition-colors",
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminLayout;