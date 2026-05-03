import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  { name: "Plan 25", monthly: "$25/mes", install: "$90 instalación", badge: "Básico" },
  { name: "Plan 40", monthly: "$40/mes", install: "$90 instalación", badge: "Avanzado" },
  { name: "Socio América", monthly: "Sin costo", install: "Sin costo", badge: "Especial" },
];

const PlansPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Planes</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <Badge variant="secondary">{p.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold">{p.monthly}</p>
              <p className="text-sm text-muted-foreground">{p.install}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;