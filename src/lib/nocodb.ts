// NocoDB API Service — Connected to america_x101

const NOCODB_BASE_URL = "https://sesotecndb.sesotec.com.ec";
const NOCODB_API_TOKEN = "8uN5KZLCfCMSxnC9YYkcIFZ0v_pIE-AuqOeq30L_";

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

// Table paths for america_x101
// NocoDB v2 data API: /api/v2/meta/bases/{baseId} for meta
// Data rows: /api/v1/db/data/noco/{orgName}/{baseName}/{tableName}
const TABLES = {
  plans: "noco/america_x101/plans",
  resellers: "noco/america_x101/resellers",
  accounts: "noco/america_x101/reseller_accounts",
  analytics: "noco/america_x101/reseller_analytics",
  adminUsers: "noco/america_x101/admin_users",
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