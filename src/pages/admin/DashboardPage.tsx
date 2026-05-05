import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart3, CreditCard } from "lucide-react";
import { nocoService } from "@/lib/nocodb";

const DashboardPage = () => {
  const [counts, setCounts] = useState({ resellers: 0, accounts: 0, analytics: 0, plans: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [r, a, an, p] = await Promise.all([
          nocoService.getResellers({ limit: "1" } as any),
          nocoService.getAccounts({ limit: "1" } as any),
          nocoService.getAnalytics({ limit: "1" } as any),
          nocoService.getPlans(),
        ]);
        setCounts({
          resellers: (r as any).pageInfo?.totalRows ?? 0,
          accounts: (a as any).pageInfo?.totalRows ?? 0,
          analytics: (an as any).pageInfo?.totalRows ?? 0,
          plans: (p as any).pageInfo?.totalRows ?? 0,
        });
      } catch { /* silent */ }
    })();
  }, []);

  const stats = [
    { label: "Resellers", value: counts.resellers, icon: Users, color: "text-blue-500" },
    { label: "Cuentas", value: counts.accounts, icon: FileText, color: "text-green-500" },
    { label: "Eventos", value: counts.analytics, icon: BarChart3, color: "text-purple-500" },
    { label: "Planes", value: counts.plans, icon: CreditCard, color: "text-amber-500" },
  ];

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
    </div>
  );
};

export default DashboardPage;