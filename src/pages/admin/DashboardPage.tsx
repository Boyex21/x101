import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart3, CreditCard } from "lucide-react";

const stats = [
  { label: "Resellers", value: "—", icon: Users, color: "text-blue-500" },
  { label: "Cuentas activas", value: "—", icon: FileText, color: "text-green-500" },
  { label: "Eventos hoy", value: "—", icon: BarChart3, color: "text-purple-500" },
  { label: "Planes activos", value: "3", icon: CreditCard, color: "text-amber-500" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Conecta NocoDB para ver datos en tiempo real. Las estadísticas se actualizarán automáticamente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;