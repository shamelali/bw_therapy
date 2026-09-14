"use client";

import { Suspense, use, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { Button, Input, Label } from "@/components/ui/primitives";
import { SocialLoginButtons } from "@/components/auth/social-buttons";
import { useToast } from "@/components/ui/toast";
import { useDictionary, useLocalizedHref } from "@/lib/i18n/locale-context";

const ROLE_META = {
  customer: { icon: UserRound, accent: "text-teal-600 bg-teal-100" },
  provider: { icon: Briefcase, accent: "text-violet-600 bg-violet-100" },
  admin: { icon: ShieldCheck, accent: "text-slate-700 bg-slate-200" },
} as const;

const DEMO_CREDS: Record<"customer" | "provider" | "admin", { email: string; password: string }> = {
  customer: { email: "john@demo.com", password: "password123" },
  provider: { email: "sarah@demo.com", password: "password123" },
  admin: { email: "admin@demo.com", password: "password123" },
};

const ROLES = ["customer", "provider", "admin"] as const;
type Role = (typeof ROLES)[number];

function RoleLoginForm({ role }: { role: Role }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { push } = useToast();
  const dict = useDictionary();
  const buildHref = useLocalizedHref();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? dict.auth.genericLoginError);
      push(dict.auth.welcomeBackToast, "success");
      const returnTo = searchParams.get("returnTo");
      router.push(returnTo?.startsWith("/") ? returnTo : buildHref("/dashboard"));
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const meta = ROLE_META[role];
  const Icon = meta.icon;
  const roleLabel = dict.auth[`signInAs${role.charAt(0).toUpperCase()}${role.slice(1)}` as keyof typeof dict.auth];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-teal-50 to-white px-4 py-12">
      <div className="w-full max-w-md">
        <Link href={buildHref("/")} className="mb-8 flex items-center justify-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
            <Sparkles className="h-4.5 w-4.5" />
          </span>
          {dict.common.brand}
        </Link>

        <Link
          href={buildHref("/login")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.auth.backToRoles}
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.accent}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{roleLabel}</h1>
              <p className="text-sm text-slate-500">{dict.auth.loginSubtitle}</p>
            </div>
          </div>

          {role === "customer" && (
            <>
              <div className="mt-6">
                <SocialLoginButtons disabled={loading} returnTo={searchParams.get("returnTo")} />
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-500">{dict.auth.orDivider ?? "or"}</span>
                </div>
              </div>
            </>
          )}

          <form onSubmit={onSubmit} className={role === "customer" ? "space-y-4" : "mt-6 space-y-4"}>
            <div>
              <Label>{dict.auth.emailLabel}</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label>{dict.auth.passwordLabel}</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
            <Button type="submit" loading={loading} className="w-full">
              {dict.auth.signInButton}
            </Button>
          </form>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
            <p className="mb-2 font-semibold text-slate-600">{dict.auth.demoRoleHint}</p>
            <button
              onClick={() => {
                setEmail(DEMO_CREDS[role].email);
                setPassword(DEMO_CREDS[role].password);
              }}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700 hover:border-teal-300"
            >
              {role === "customer"
                ? dict.auth.demoCustomer
                : role === "provider"
                  ? dict.auth.demoProvider
                  : dict.auth.demoAdmin}
            </button>
          </div>

          {role !== "admin" && (
            <p className="mt-6 text-center text-sm text-slate-500">
              {dict.auth.noAccount}{" "}
              <Link
                href={buildHref(role === "provider" ? "/register?role=provider" : "/register")}
                className="font-medium text-teal-700 hover:underline"
              >
                {dict.auth.signUpLink}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoleLoginPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = use(params) as { role: string };
  if (!ROLES.includes(role as Role)) return notFound();
  return (
    <Suspense>
      <RoleLoginForm role={role as Role} />
    </Suspense>
  );
}