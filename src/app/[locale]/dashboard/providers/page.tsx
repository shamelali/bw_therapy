import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { asc, providers } from "@/lib/db-compat";
import { AdminProvidersManager } from "@/components/dashboard/admin-providers-manager";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function AdminProvidersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const user = await getCurrentUser();
  if (!user) return null;
  if (user.role !== "admin") redirect(localizedPath(locale, "/dashboard"));

  let rows: any[] = [];
  try {
    rows = await db.select().from(providers).orderBy(asc(providers.businessName));
  } catch (err) {
    console.error("[admin:providers] database query failed:", err instanceof Error ? err.message : err);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{dict.adminProvidersPage.title}</h1>
        <p className="text-sm text-slate-500">{dict.adminProvidersPage.subtitle}</p>
      </div>
      <AdminProvidersManager initialProviders={rows} />
    </div>
  );
}
