export type ThemeMode = "light" | "dark";
export type LocaleCode = "tr" | "en";
export type CurrencyCode = "TRY" | "USD" | "EUR";
export type RoleKey =
  | "Admin"
  | "Muhasebe"
  | "Satis"
  | "Depo"
  | "Yonetici"
  | "Personel";
export type ModuleKey =
  | "dashboard"
  | "users"
  | "accounting"
  | "current"
  | "stock"
  | "sales"
  | "purchases"
  | "hr"
  | "crm"
  | "reports"
  | "system";

export interface Tenant {
  id: string;
  name: string;
  legalName: string;
  locale: LocaleCode;
  currency: CurrencyCode;
  plan: string;
  country: string;
  status: "Aktif" | "Pasif";
}

export interface RoleDefinition {
  key: RoleKey;
  label: string;
  description: string;
  modules: ModuleKey[];
}

export interface ModuleDefinition {
  key: ModuleKey;
  label: string;
  summary: string;
  permission: string;
}

export interface DashboardMetric {
  label: string;
  value: number;
  delta: number;
  tone: "emerald" | "amber" | "sky" | "rose";
}

export interface CashFlowPoint {
  label: string;
  inflow: number;
  outflow: number;
}

export interface JournalEntry {
  id: string;
  tenantId: string;
  date: string;
  documentNo: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  currency: CurrencyCode;
  costCenter: string;
  status: "Onaylandı" | "Taslak";
  createdBy: string;
}

export interface AccountRow {
  code: string;
  name: string;
  type: "Varlık" | "Borç" | "Gelir" | "Gider" | "Özkaynak";
  balance: number;
}

export interface CurrentAccount {
  id: string;
  tenantId: string;
  name: string;
  type: "Müşteri" | "Tedarikçi";
  riskLimit: number;
  openBalance: number;
  aging0_30: number;
  aging31_60: number;
  aging61_90: number;
  aging90Plus: number;
  status: "Aktif" | "İzlemede";
}

export interface StockItem {
  id: string;
  tenantId: string;
  sku: string;
  name: string;
  barcode: string;
  warehouse: string;
  stock: number;
  minStock: number;
  costing: "FIFO" | "LIFO";
  lotTracking: boolean;
  serialTracking: boolean;
  unit: string;
}

export interface SalesDocument {
  id: string;
  tenantId: string;
  type: "Teklif" | "Sipariş" | "Fatura";
  number: string;
  customer: string;
  amount: number;
  margin: number;
  status: "Hazırlanıyor" | "Açık" | "Tahsil Edildi";
  dueDate: string;
}

export interface PurchaseDocument {
  id: string;
  tenantId: string;
  type: "Talep" | "Teklif" | "Sipariş" | "İrsaliye";
  number: string;
  supplier: string;
  amount: number;
  status: "Beklemede" | "Onaylandı" | "Kısmi";
}

export interface EmployeeRecord {
  id: string;
  tenantId: string;
  name: string;
  title: string;
  department: string;
  salary: number;
  leaveBalance: number;
  overtimeHours: number;
  performance: number;
}

export interface LeadRecord {
  id: string;
  tenantId: string;
  name: string;
  company: string;
  source: string;
  stage: "Yeni" | "Nitelikli" | "Teklif" | "Kazandı";
  value: number;
  owner: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  actor: string;
  action: string;
  module: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  tenantId: string;
  title: string;
  message: string;
  level: "info" | "success" | "warning";
  timestamp: string;
}

export interface UserRecord {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: RoleKey;
  department: string;
  twoFactorEnabled: boolean;
  status: "Aktif" | "Askıda";
  lastLogin: string;
}

export const tenants: Tenant[] = [
  {
    id: "anatolia-holding",
    name: "Anatolia Holding",
    legalName: "Anatolia Holding A.S.",
    locale: "tr",
    currency: "TRY",
    plan: "Enterprise",
    country: "Turkey",
    status: "Aktif",
  },
  {
    id: "north-star",
    name: "North Star Trade",
    legalName: "North Star Trade LLC",
    locale: "en",
    currency: "USD",
    plan: "Global",
    country: "United Arab Emirates",
    status: "Aktif",
  },
];

export const roles: RoleDefinition[] = [
  {
    key: "Admin",
    label: "Admin",
    description: "Tam erişim ve sistem ayarları",
    modules: ["dashboard", "users", "accounting", "current", "stock", "sales", "purchases", "hr", "crm", "reports", "system"],
  },
  {
    key: "Muhasebe",
    label: "Muhasebe",
    description: "Finans, fiş, kasa ve banka akışları",
    modules: ["dashboard", "accounting", "current", "reports", "system"],
  },
  {
    key: "Satis",
    label: "Satış",
    description: "Teklif, sipariş, fatura ve CRM",
    modules: ["dashboard", "sales", "crm", "current", "reports"],
  },
  {
    key: "Depo",
    label: "Depo",
    description: "Stok, sevkiyat ve depo hareketleri",
    modules: ["dashboard", "stock", "purchases", "reports"],
  },
  {
    key: "Yonetici",
    label: "Yönetici",
    description: "Operasyon, rapor ve karar destek ekranları",
    modules: ["dashboard", "users", "accounting", "current", "stock", "sales", "purchases", "hr", "crm", "reports"],
  },
  {
    key: "Personel",
    label: "Personel",
    description: "Kişisel self-servis ve izin ekranları",
    modules: ["dashboard", "hr", "reports"],
  },
];

export const modules: ModuleDefinition[] = [
  { key: "dashboard", label: "Dashboard", summary: "Finans, KPI, nakit ve uyarılar", permission: "dashboard:read" },
  { key: "users", label: "Kullanıcılar", summary: "Rol, izin, audit ve 2FA", permission: "users:manage" },
  { key: "accounting", label: "Muhasebe", summary: "Çift taraflı kayıt ve raporlar", permission: "accounting:read" },
  { key: "current", label: "Cari", summary: "Müşteri, tedarikçi ve yaşlandırma", permission: "current:read" },
  { key: "stock", label: "Stok ve Depo", summary: "Ürün, barkod, seri, lot ve transfer", permission: "stock:read" },
  { key: "sales", label: "Satış", summary: "Teklif, sipariş, fatura ve POS", permission: "sales:read" },
  { key: "purchases", label: "Satın Alma", summary: "Talep, teklif, sipariş ve performans", permission: "purchases:read" },
  { key: "hr", label: "İnsan Kaynakları", summary: "Personel, bordro, izin ve performans", permission: "hr:read" },
  { key: "crm", label: "CRM", summary: "Lead, görev, takvim ve pipeline", permission: "crm:read" },
  { key: "reports", label: "Raporlama", summary: "Dinamik rapor, export ve filtreler", permission: "reports:read" },
  { key: "system", label: "Sistem", summary: "Mimari, API, Docker ve deployment", permission: "system:read" },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Aylık Ciro", value: 4860000, delta: 14.2, tone: "emerald" },
  { label: "Tahsil Edilebilir", value: 1185000, delta: -3.4, tone: "sky" },
  { label: "Bekleyen Kayıt", value: 46, delta: 8.1, tone: "amber" },
  { label: "Stok Uyarısı", value: 9, delta: 12.0, tone: "rose" },
];

export const cashFlow: CashFlowPoint[] = [
  { label: "Pzt", inflow: 620, outflow: 410 },
  { label: "Sal", inflow: 760, outflow: 530 },
  { label: "Car", inflow: 810, outflow: 450 },
  { label: "Per", inflow: 900, outflow: 670 },
  { label: "Cum", inflow: 1040, outflow: 640 },
  { label: "Cmt", inflow: 730, outflow: 390 },
  { label: "Paz", inflow: 540, outflow: 360 },
];

export const chartAccounts: AccountRow[] = [
  { code: "100", name: "Kasa", type: "Varlık", balance: 785000 },
  { code: "102", name: "Bankalar", type: "Varlık", balance: 1234000 },
  { code: "120", name: "Alıcılar", type: "Varlık", balance: 980000 },
  { code: "153", name: "Ticari Mallar", type: "Varlık", balance: 1465000 },
  { code: "320", name: "Satıcılar", type: "Borç", balance: 540000 },
  { code: "600", name: "Yurt İçi Satışlar", type: "Gelir", balance: 3580000 },
  { code: "620", name: "Satış İndirimleri", type: "Gider", balance: 115000 },
  { code: "770", name: "Genel Yönetim Giderleri", type: "Gider", balance: 620000 },
];

export const journalEntries: JournalEntry[] = [
  {
    id: "j-1001",
    tenantId: "anatolia-holding",
    date: "2026-05-21",
    documentNo: "FIS-2026-051",
    description: "Müşteri tahsilatı - Atlas Tekstil",
    debitAccount: "102 Bankalar",
    creditAccount: "120 Alıcılar",
    amount: 245000,
    currency: "TRY",
    costCenter: "Satış",
    status: "Onaylandı",
    createdBy: "Ayse Yilmaz",
  },
  {
    id: "j-1002",
    tenantId: "anatolia-holding",
    date: "2026-05-20",
    documentNo: "FIS-2026-050",
    description: "Kira ve aidat gideri",
    debitAccount: "770 Genel Yönetim Giderleri",
    creditAccount: "100 Kasa",
    amount: 78000,
    currency: "TRY",
    costCenter: "Merkez Ofis",
    status: "Onaylandı",
    createdBy: "Mehmet Kaya",
  },
  {
    id: "j-1003",
    tenantId: "north-star",
    date: "2026-05-21",
    documentNo: "JRN-44",
    description: "USD satış faturası kaydı",
    debitAccount: "120 Accounts Receivable",
    creditAccount: "600 Domestic Sales",
    amount: 182500,
    currency: "USD",
    costCenter: "Sales",
    status: "Taslak",
    createdBy: "Linda Carter",
  },
];

export const currentAccounts: CurrentAccount[] = [
  {
    id: "ca-1",
    tenantId: "anatolia-holding",
    name: "Atlas Tekstil",
    type: "Müşteri",
    riskLimit: 1200000,
    openBalance: 415000,
    aging0_30: 180000,
    aging31_60: 95000,
    aging61_90: 85000,
    aging90Plus: 55000,
    status: "Aktif",
  },
  {
    id: "ca-2",
    tenantId: "anatolia-holding",
    name: "Mavi Kimya",
    type: "Müşteri",
    riskLimit: 900000,
    openBalance: 280000,
    aging0_30: 122000,
    aging31_60: 68000,
    aging61_90: 42000,
    aging90Plus: 48000,
    status: "İzlemede",
  },
  {
    id: "ca-3",
    tenantId: "north-star",
    name: "Delta Supplies",
    type: "Tedarikçi",
    riskLimit: 500000,
    openBalance: 124000,
    aging0_30: 67000,
    aging31_60: 33000,
    aging61_90: 18000,
    aging90Plus: 6000,
    status: "Aktif",
  },
];

export const stockItems: StockItem[] = [
  {
    id: "st-1",
    tenantId: "anatolia-holding",
    sku: "TR-1001",
    name: "Sade Pamuklu T-shirt",
    barcode: "8690001001",
    warehouse: "Ana Depo",
    stock: 860,
    minStock: 300,
    costing: "FIFO",
    lotTracking: false,
    serialTracking: false,
    unit: "Adet",
  },
  {
    id: "st-2",
    tenantId: "anatolia-holding",
    sku: "TR-2005",
    name: "Endustriyel Sensör",
    barcode: "8690002005",
    warehouse: "Teknik Depo",
    stock: 38,
    minStock: 50,
    costing: "FIFO",
    lotTracking: true,
    serialTracking: true,
    unit: "Adet",
  },
  {
    id: "st-3",
    tenantId: "north-star",
    sku: "NS-3001",
    name: "Smart Terminal",
    barcode: "4820003001",
    warehouse: "Dubai Hub",
    stock: 120,
    minStock: 80,
    costing: "LIFO",
    lotTracking: true,
    serialTracking: true,
    unit: "Adet",
  },
];

export const salesDocuments: SalesDocument[] = [
  {
    id: "sa-1",
    tenantId: "anatolia-holding",
    type: "Teklif",
    number: "TEK-2026-118",
    customer: "Atlas Tekstil",
    amount: 540000,
    margin: 24,
    status: "Hazırlanıyor",
    dueDate: "2026-05-28",
  },
  {
    id: "sa-2",
    tenantId: "anatolia-holding",
    type: "Fatura",
    number: "FAT-2026-944",
    customer: "Mavi Kimya",
    amount: 320000,
    margin: 18,
    status: "Tahsil Edildi",
    dueDate: "2026-05-16",
  },
  {
    id: "sa-3",
    tenantId: "north-star",
    type: "Sipariş",
    number: "ORD-8840",
    customer: "Gulf Retail",
    amount: 285000,
    margin: 21,
    status: "Açık",
    dueDate: "2026-06-01",
  },
];

export const purchaseDocuments: PurchaseDocument[] = [
  {
    id: "pu-1",
    tenantId: "anatolia-holding",
    type: "Talep",
    number: "TAL-52",
    supplier: "Tekno Parça",
    amount: 142000,
    status: "Beklemede",
  },
  {
    id: "pu-2",
    tenantId: "anatolia-holding",
    type: "Sipariş",
    number: "SIP-149",
    supplier: "Asya Lojistik",
    amount: 220000,
    status: "Onaylandı",
  },
  {
    id: "pu-3",
    tenantId: "north-star",
    type: "İrsaliye",
    number: "IRS-882",
    supplier: "Dubai Materials",
    amount: 95000,
    status: "Kısmi",
  },
];

export const employees: EmployeeRecord[] = [
  {
    id: "hr-1",
    tenantId: "anatolia-holding",
    name: "Ayse Yilmaz",
    title: "Finans Müdürü",
    department: "Muhasebe",
    salary: 156000,
    leaveBalance: 12,
    overtimeHours: 6,
    performance: 92,
  },
  {
    id: "hr-2",
    tenantId: "anatolia-holding",
    name: "Mert Demir",
    title: "Depo Sorumlusu",
    department: "Lojistik",
    salary: 92000,
    leaveBalance: 8,
    overtimeHours: 12,
    performance: 84,
  },
  {
    id: "hr-3",
    tenantId: "north-star",
    name: "Linda Carter",
    title: "Sales Manager",
    department: "Sales",
    salary: 8800,
    leaveBalance: 9,
    overtimeHours: 4,
    performance: 88,
  },
];

export const leads: LeadRecord[] = [
  {
    id: "crm-1",
    tenantId: "anatolia-holding",
    name: "Serkan Aydin",
    company: "Aydin Otomasyon",
    source: "Web Form",
    stage: "Teklif",
    value: 420000,
    owner: "Can Kara",
  },
  {
    id: "crm-2",
    tenantId: "anatolia-holding",
    name: "Buse Toprak",
    company: "Toprak Lojistik",
    source: "Email",
    stage: "Nitelikli",
    value: 280000,
    owner: "Ece Tunc",
  },
  {
    id: "crm-3",
    tenantId: "north-star",
    name: "Mohammed Ali",
    company: "Gulf Retail",
    source: "Referral",
    stage: "Yeni",
    value: 610000,
    owner: "Linda Carter",
  },
];

export const auditLogs: AuditLog[] = [
  {
    id: "au-1",
    tenantId: "anatolia-holding",
    actor: "Ayse Yilmaz",
    action: "Yevmiye fişi onaylandı",
    module: "Muhasebe",
    timestamp: "2026-05-21T10:10:00Z",
  },
  {
    id: "au-2",
    tenantId: "anatolia-holding",
    actor: "Mert Demir",
    action: "Stok sayımı tamamlandı",
    module: "Stok",
    timestamp: "2026-05-21T09:30:00Z",
  },
  {
    id: "au-3",
    tenantId: "north-star",
    actor: "Linda Carter",
    action: "Yeni teklif oluşturuldu",
    module: "Satış",
    timestamp: "2026-05-21T08:45:00Z",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "nt-1",
    tenantId: "anatolia-holding",
    title: "Risk Limiti Uyarısı",
    message: "Atlas Tekstil için açık bakiye risk limitine yaklaştı.",
    level: "warning",
    timestamp: "2026-05-21T10:35:00Z",
  },
  {
    id: "nt-2",
    tenantId: "anatolia-holding",
    title: "E-Fatura Hazır",
    message: "3 adet e-fatura entegrasyon kuyruğunda bekliyor.",
    level: "info",
    timestamp: "2026-05-21T09:55:00Z",
  },
  {
    id: "nt-3",
    tenantId: "north-star",
    title: "Stok Başarıyla Güncellendi",
    message: "Ana Depo sayım sonucu senkronize edildi.",
    level: "success",
    timestamp: "2026-05-21T09:10:00Z",
  },
];

export const users: UserRecord[] = [
  {
    id: "usr-1",
    tenantId: "anatolia-holding",
    name: "Ayse Yilmaz",
    email: "ayse.yilmaz@anatolia.com",
    role: "Admin",
    department: "Finans",
    twoFactorEnabled: true,
    status: "Aktif",
    lastLogin: "2026-05-21T10:00:00Z",
  },
  {
    id: "usr-2",
    tenantId: "anatolia-holding",
    name: "Mert Demir",
    email: "mert.demir@anatolia.com",
    role: "Depo",
    department: "Lojistik",
    twoFactorEnabled: false,
    status: "Aktif",
    lastLogin: "2026-05-21T08:18:00Z",
  },
  {
    id: "usr-3",
    tenantId: "north-star",
    name: "Linda Carter",
    email: "linda.carter@northstar.com",
    role: "Satis",
    department: "Sales",
    twoFactorEnabled: true,
    status: "Aktif",
    lastLogin: "2026-05-21T09:40:00Z",
  },
];

export const permissionsByRole: Record<RoleKey, string[]> = {
  Admin: ["dashboard:read", "users:manage", "accounting:read", "current:read", "stock:read", "sales:read", "purchases:read", "hr:read", "crm:read", "reports:read", "system:read"],
  Muhasebe: ["dashboard:read", "accounting:read", "current:read", "reports:read", "system:read"],
  Satis: ["dashboard:read", "sales:read", "crm:read", "current:read", "reports:read"],
  Depo: ["dashboard:read", "stock:read", "purchases:read", "reports:read"],
  Yonetici: ["dashboard:read", "users:manage", "accounting:read", "current:read", "stock:read", "sales:read", "purchases:read", "hr:read", "crm:read", "reports:read"],
  Personel: ["dashboard:read", "hr:read", "reports:read"],
};

export const currencyRates: Record<CurrencyCode, number> = {
  TRY: 1,
  USD: 32.1,
  EUR: 34.9,
};

export const documentationSections = [
  {
    key: "architecture",
    title: "Sistem Mimarisi",
    items: [
      "Frontend: React + Vite + TailwindCSS ile tek sayfa admin paneli.",
      "Backend tasarımı: NestJS moduller, guard, interceptor, queue ve webhook katmanlari.",
      "Veri katmani: PostgreSQL normalizasyon, FK, soft delete ve migration odakli.",
      "Cache ve kuyruk: Redis tabanli cache, job ve background worker mimarisi.",
      "Yetkilendirme: JWT access token, refresh token, RBAC ve page-level guard.",
      "Multi-tenant: tenant scope zorunlu, her sorgu tenantId ile filtrelenir.",
    ],
  },
  {
    key: "schema",
    title: "Veritabani Semasi",
    items: [
      "tenants, users, roles, permissions, role_permissions, audit_logs",
      "chart_accounts, journal_entries, journal_entry_lines, ledgers, trial_balances",
      "current_accounts, current_transactions, aging_snapshots",
      "products, product_variants, warehouses, warehouse_stocks, stock_movements",
      "sales_quotes, sales_orders, sales_invoices, collections, commissions",
      "purchase_requests, purchase_quotes, purchase_orders, goods_receipts",
      "employees, payrolls, leave_requests, shifts, advances, evaluations",
      "leads, activities, tasks, calendars, email_threads, pipelines",
    ],
  },
  {
    key: "api",
    title: "API Endpointleri",
    items: [
      "REST: /api/v1/auth/login, /refresh, /logout, /me",
      "REST: /api/v1/accounting/journal-entries, /ledgers, /trial-balance, /balance-sheet",
      "REST: /api/v1/inventory/products, /stocks, /movements, /transfers",
      "REST: /api/v1/sales/quotes, /orders, /invoices, /collections",
      "GraphQL: query dashboardOverview, mutation createJournalEntry, subscription notificationAdded",
      "Webhook: /webhooks/e-invoice, /webhooks/payment, /webhooks/stock-alert",
    ],
  },
  {
    key: "frontend",
    title: "Frontend Sayfalari",
    items: [
      "Dashboard, Kullanici ve Yetki, Muhasebe, Cari, Stok, Satis, Satinalma, IK, CRM, Raporlama, Sistem",
      "Mobil uyumlu sol menü, ust navbar, bildirim merkezi, toast alanı ve data table desenleri",
      "Dil anahtarı, para birimi anahtarı, tenant secici ve tema degistirici",
    ],
  },
  {
    key: "devops",
    title: "Docker ve Deployment",
    items: [
      "Dockerfile: multi-stage build ile static frontend imaji",
      "Nginx: SPA fallback, cache headers ve security headers",
      "Deployment: reverse proxy, environment secrets, health check ve backup job",
    ],
  },
];

export const humanReadableDate = (iso: string, locale: LocaleCode) =>
  new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));

export const formatNumber = (value: number, locale: LocaleCode = "tr") =>
  new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);

export const formatCurrency = (value: number, currency: CurrencyCode, locale: LocaleCode = "tr") =>
  new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const convertCurrency = (value: number, from: CurrencyCode, to: CurrencyCode) => {
  const base = value * currencyRates[from];
  return base / currencyRates[to];
};

export const total = (values: number[]) => values.reduce((acc, item) => acc + item, 0);

export const sumField = <T extends Record<string, number>>(rows: T[], field: keyof T) =>
  rows.reduce((acc, row) => acc + Number(row[field] ?? 0), 0);

export const byTenant = <T extends { tenantId: string }>(rows: T[], tenantId: string) =>
  rows.filter((row) => row.tenantId === tenantId);

export const groupByStatus = <T extends { status: string }>(rows: T[]) =>
  rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = (acc[row.status] ?? 0) + 1;
    return acc;
  }, {});

export const makeSparkline = (values: number[], width = 180, height = 56) => {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 8) - 4;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
};
