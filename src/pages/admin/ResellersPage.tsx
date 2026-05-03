import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ResellersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resellers</h1>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Nuevo
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Resellers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Conecta NocoDB para gestionar resellers. Podrás crear, editar y asignar planes desde aquí.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResellersPage;