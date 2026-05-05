import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { nocoService } from "@/lib/nocodb";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: number;
  name: string;
  monthly_price: number;
  installation_fee: number;
  description: string;
  features: string[];
  is_active: boolean;
  resellers: number;
}

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await nocoService.getPlans();
        setPlans((res as any).list ?? []);
      } catch (e: any) {
        toast({ title: "Error", description: e.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Planes</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <Badge variant={p.is_active ? "default" : "secondary"}>
                  {p.is_active ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold">
                {p.monthly_price > 0 ? `$${p.monthly_price}/mes` : "Sin costo"}
              </p>
              <p className="text-sm text-muted-foreground">
                {p.installation_fee > 0 ? `$${p.installation_fee} instalación` : "Sin costo de instalación"}
              </p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
              {p.features?.length > 0 && (
                <ul className="text-xs text-muted-foreground list-disc pl-4 pt-1">
                  {p.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-muted-foreground pt-1">
                {p.resellers} reseller{p.resellers !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;