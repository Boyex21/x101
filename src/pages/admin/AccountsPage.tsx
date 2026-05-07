import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { nocoService } from "@/lib/nocodb";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: number;
  reseller_id: number;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  account_type: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
  resellers?: { id: number; business_name: string };
}

interface Reseller {
  id: number;
  business_name: string;
}

const ACCOUNT_TYPES = ["single", "duo", "2years", "relay"];
const STATUSES = ["active", "pending", "expired"];

const emptyForm = {
  reseller_id: "",
  client_name: "",
  client_email: "",
  client_phone: "",
  account_type: "single",
  status: "active",
  start_date: "",
  end_date: "",
  notes: "",
};

const statusColor: Record<string, string> = {
  active: "bg-green-500/15 text-green-700 border-green-500/30",
  pending: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  expired: "bg-red-500/15 text-red-700 border-red-500/30",
};

const AccountsPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [filterReseller, setFilterReseller] = useState<string>("all");
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (filterReseller && filterReseller !== "all") {
        params.where = `(reseller_id,eq,${filterReseller})`;
      }
      const [acRes, rRes] = await Promise.all([
        nocoService.getAccounts(params),
        nocoService.getResellers(),
      ]);
      setAccounts((acRes as any).list ?? []);
      setResellers(((rRes as any).list ?? []).map((r: any) => ({ id: r.id, business_name: r.business_name })));
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterReseller]);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (a: Account) => {
    setEditingId(a.id);
    setForm({
      reseller_id: String(a.reseller_id),
      client_name: a.client_name,
      client_email: a.client_email,
      client_phone: a.client_phone ?? "",
      account_type: a.account_type,
      status: a.status,
      start_date: a.start_date ?? "",
      end_date: a.end_date ?? "",
      notes: a.notes ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: Record<string, unknown> = {
        ...form,
        reseller_id: Number(form.reseller_id),
      };
      if (!data.client_phone) delete data.client_phone;
      if (!data.notes) delete data.notes;
      if (!data.start_date) delete data.start_date;
      if (!data.end_date) delete data.end_date;

      if (editingId) {
        await nocoService.updateAccount(editingId, data);
        toast({ title: "Cuenta actualizada" });
      } else {
        await nocoService.createAccount(data);
        toast({ title: "Cuenta creada" });
      }
      setDialogOpen(false);
      fetchData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await nocoService.deleteAccount(deleteId);
      toast({ title: "Cuenta eliminada" });
      setDeleteId(null);
      fetchData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const updateField = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resellerName = (id: number) =>
    resellers.find((r) => r.id === id)?.business_name ?? `#${id}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cuentas</h1>
        <Button size="sm" onClick={openNew}>
          <Plus className="w-4 h-4 mr-1" />
          Nueva
        </Button>
      </div>

      {/* Filter by reseller */}
      <div className="flex items-center gap-2">
        <Label className="text-sm whitespace-nowrap">Filtrar por reseller:</Label>
        <Select value={filterReseller} onValueChange={setFilterReseller}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {resellers.map((r) => (
              <SelectItem key={r.id} value={String(r.id)}>
                {r.business_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : accounts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay cuentas registradas. Crea la primera.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {accounts.map((a) => (
            <Card key={a.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{a.client_name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColor[a.status] ?? ""}>{a.status}</Badge>
                    <Badge variant="outline">{a.account_type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Reseller: {a.resellers?.business_name ?? resellerName(a.reseller_id)}</p>
                    <p>Email: {a.client_email}</p>
                    {a.start_date && <p>Inicio: {a.start_date} → {a.end_date ?? "—"}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => openEdit(a)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setDeleteId(a.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Cuenta" : "Nueva Cuenta"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Reseller</Label>
              <Select value={form.reseller_id} onValueChange={(v) => updateField("reseller_id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar reseller" />
                </SelectTrigger>
                <SelectContent>
                  {resellers.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.business_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre del cliente</Label>
                <Input value={form.client_name} onChange={(e) => updateField("client_name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.client_email} onChange={(e) => updateField("client_email", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={form.client_phone} onChange={(e) => updateField("client_phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tipo de cuenta</Label>
                <Select value={form.account_type} onValueChange={(v) => updateField("account_type", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => updateField("status", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fecha inicio</Label>
                <Input type="date" value={form.start_date} onChange={(e) => updateField("start_date", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha fin</Label>
                <Input type="date" value={form.end_date} onChange={(e) => updateField("end_date", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notas</Label>
              <Input value={form.notes} onChange={(e) => updateField("notes", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving || !form.reseller_id || !form.client_name}>
              {saving && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              {editingId ? "Guardar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cuenta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountsPage;