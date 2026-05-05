import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { nocoService } from "@/lib/nocodb";
import { useToast } from "@/hooks/use-toast";

interface Reseller {
  id: number;
  slug: string;
  business_name: string;
  whatsapp_number: string;
  contact_email: string;
  contact_phone: string | null;
  logo_url: string | null;
  color_primary: string;
  color_secondary: string;
  color_accent: string;
  price_single: number;
  price_2years: number;
  price_duo: number;
  price_relay: number;
  renewal_price: number;
  plan_id: number;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  plans?: { id: number; name: string };
}

const emptyForm = {
  slug: "",
  business_name: "",
  whatsapp_number: "",
  contact_email: "",
  contact_phone: "",
  color_primary: "#1a56db",
  color_secondary: "#7e22ce",
  color_accent: "#f59e0b",
  price_single: 139,
  price_2years: 199,
  price_duo: 179,
  price_relay: 99,
  renewal_price: 89,
  plan_id: 1,
  is_active: true,
  notes: "",
};

const ResellersPage = () => {
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchResellers = async () => {
    try {
      setLoading(true);
      const res = await nocoService.getResellers();
      setResellers((res as any).list ?? []);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResellers();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (r: Reseller) => {
    setEditingId(r.id);
    setForm({
      slug: r.slug,
      business_name: r.business_name,
      whatsapp_number: r.whatsapp_number,
      contact_email: r.contact_email,
      contact_phone: r.contact_phone ?? "",
      color_primary: r.color_primary,
      color_secondary: r.color_secondary,
      color_accent: r.color_accent,
      price_single: r.price_single,
      price_2years: r.price_2years,
      price_duo: r.price_duo,
      price_relay: r.price_relay,
      renewal_price: r.renewal_price,
      plan_id: r.plan_id,
      is_active: r.is_active,
      notes: r.notes ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: Record<string, unknown> = { ...form };
      if (!data.contact_phone) delete data.contact_phone;
      if (!data.notes) delete data.notes;

      if (editingId) {
        await nocoService.updateReseller(editingId, data);
        toast({ title: "Reseller actualizado" });
      } else {
        await nocoService.createReseller(data);
        toast({ title: "Reseller creado" });
      }
      setDialogOpen(false);
      fetchResellers();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await nocoService.deleteReseller(deleteId);
      toast({ title: "Reseller eliminado" });
      setDeleteId(null);
      fetchResellers();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const updateField = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resellers</h1>
        <Button size="sm" onClick={openNew}>
          <Plus className="w-4 h-4 mr-1" />
          Nuevo
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : resellers.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay resellers registrados. Crea el primero.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {resellers.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{r.business_name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={r.is_active ? "default" : "secondary"}>
                      {r.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                    {r.plans?.name && (
                      <Badge variant="outline">{r.plans.name}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Slug: {r.slug}</p>
                    <p>Email: {r.contact_email}</p>
                    <p>WhatsApp: {r.whatsapp_number}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => openEdit(r)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setDeleteId(r.id)}>
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
            <DialogTitle>{editingId ? "Editar Reseller" : "Nuevo Reseller"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre del negocio</Label>
                <Input value={form.business_name} onChange={(e) => updateField("business_name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.contact_email} onChange={(e) => updateField("contact_email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input value={form.whatsapp_number} onChange={(e) => updateField("whatsapp_number", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={form.contact_phone} onChange={(e) => updateField("contact_phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Plan ID</Label>
                <Input type="number" value={form.plan_id} onChange={(e) => updateField("plan_id", Number(e.target.value))} />
              </div>
            </div>

            <h4 className="text-sm font-medium pt-2">Colores</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Primario</Label>
                <Input type="color" value={form.color_primary} onChange={(e) => updateField("color_primary", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Secundario</Label>
                <Input type="color" value={form.color_secondary} onChange={(e) => updateField("color_secondary", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Acento</Label>
                <Input type="color" value={form.color_accent} onChange={(e) => updateField("color_accent", e.target.value)} />
              </div>
            </div>

            <h4 className="text-sm font-medium pt-2">Precios</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Single</Label>
                <Input type="number" value={form.price_single} onChange={(e) => updateField("price_single", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>2 Años</Label>
                <Input type="number" value={form.price_2years} onChange={(e) => updateField("price_2years", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Duo</Label>
                <Input type="number" value={form.price_duo} onChange={(e) => updateField("price_duo", Number(e.target.value))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Relay</Label>
                <Input type="number" value={form.price_relay} onChange={(e) => updateField("price_relay", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Renovación</Label>
                <Input type="number" value={form.renewal_price} onChange={(e) => updateField("renewal_price", Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notas</Label>
              <Input value={form.notes} onChange={(e) => updateField("notes", e.target.value)} />
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={form.is_active} onCheckedChange={(v) => updateField("is_active", v)} />
              <Label>Activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>
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
            <AlertDialogTitle>¿Eliminar reseller?</AlertDialogTitle>
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

export default ResellersPage;