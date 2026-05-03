import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estadísticas de interacción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Conecta NocoDB para ver page views, form opens, WhatsApp clicks y más, filtrados por reseller, fecha y país.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;