// NocoDB API Service
// Configure these after connecting your DB to NocoDB

const NOCODB_BASE_URL = import.meta.env.VITE_NOCODB_BASE_URL || "";
const NOCODB_API_TOKEN = import.meta.env.VITE_NOCODB_API_TOKEN || "";

const headers = () => ({
  "xc-token": NOCODB_API_TOKEN,
  "Content-Type": "application/json",
});

export interface NocoPaginated<T> {
  list: T[];
  pageInfo: { totalRows: number; page: number; pageSize: number };
}

async function nocoGet<T>(table: string, params?: Record<string, string>): Promise<NocoPaginated<T>> {
  const url = new URL(`${NOCODB_BASE_URL}/api/v1/db/data/noco/${table}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: headers() });
  if (!res.ok) throw new Error(`NocoDB error: ${res.status}`);
  return res.json();
}

async function nocoPost<T>(table: string, data: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${NOCODB_BASE_URL}/api/v1/db/data/noco/${table}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`NocoDB error: ${res.status}`);
  return res.json();
}

async function nocoPatch<T>(table: string, id: number, data: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${NOCODB_BASE_URL}/api/v1/db/data/noco/${table}/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`NocoDB error: ${res.status}`);
  return res.json();
}

async function nocoDelete(table: string, id: number): Promise<void> {
  const res = await fetch(`${NOCODB_BASE_URL}/api/v1/db/data/noco/${table}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error(`NocoDB error: ${res.status}`);
}

// Placeholder table paths — update after NocoDB setup
// Format: "PROJECT_NAME/TABLE_NAME"
const TABLES = {
  plans: "default/plans",
  resellers: "default/resellers",
  accounts: "default/reseller_accounts",
  analytics: "default/reseller_analytics",
  adminUsers: "default/admin_users",
};

export const nocoService = {
  // Plans
  getPlans: () => nocoGet(TABLES.plans),
  updatePlan: (id: number, data: Record<string, unknown>) => nocoPatch(TABLES.plans, id, data),

  // Resellers
  getResellers: (params?: Record<string, string>) => nocoGet(TABLES.resellers, params),
  getReseller: (id: number) => nocoGet(TABLES.resellers, { where: `(id,eq,${id})` }),
  createReseller: (data: Record<string, unknown>) => nocoPost(TABLES.resellers, data),
  updateReseller: (id: number, data: Record<string, unknown>) => nocoPatch(TABLES.resellers, id, data),
  deleteReseller: (id: number) => nocoDelete(TABLES.resellers, id),

  // Accounts
  getAccounts: (params?: Record<string, string>) => nocoGet(TABLES.accounts, params),
  createAccount: (data: Record<string, unknown>) => nocoPost(TABLES.accounts, data),
  updateAccount: (id: number, data: Record<string, unknown>) => nocoPatch(TABLES.accounts, id, data),

  // Analytics
  getAnalytics: (params?: Record<string, string>) => nocoGet(TABLES.analytics, params),
  trackEvent: (data: Record<string, unknown>) => nocoPost(TABLES.analytics, data),

  // Auth
  getAdminByEmail: (email: string) =>
    nocoGet(TABLES.adminUsers, { where: `(email,eq,${email})` }),
};