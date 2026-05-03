import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cuentas</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cuentas por Reseller</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Conecta NocoDB para ver las cuentas de cada reseller con su estado, tipo y fechas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;