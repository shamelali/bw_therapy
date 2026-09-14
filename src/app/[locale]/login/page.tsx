"use client";

import Link from "next/link";
import { Sparkles, UserRound, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";
import { useDictionary, useLocalizedHref } from "@/lib/i18n/locale-context";

const ROLE_CARDS = [
  { role: "customer", icon: UserRound, labelKey: "signInAsCustomer", descKey: "customerRoleDesc", accent: "text-teal-600 bg-teal-100" },
  { role: "provider", icon: Briefcase, labelKey: "signInAsProvider", descKey: "providerRoleDesc", accent: "text-violet-600 bg-violet-100" },
  { role: "admin", icon: ShieldCheck, labelKey: "signInAsAdmin", descKey: "adminRoleDesc", accent: "text-slate-700 bg-slate-200" },
] as const;

export default function LoginPage() {
  const dict = useDictionary();
  const buildHref = useLocalizedHref();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-teal-50 to-white px-4 py-12">
      <div className="w-full max-w-md">
        <Link href={buildHref("/")} className="mb-8 flex items-center justify-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
            <Sparkles className="h-4.5 w-4.5" />
          </span>
          {dict.common.brand}
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">{dict.auth.loginRoleTitle}</h1>
          <p className="mt-1 text-sm text-slate-500">{dict.auth.loginRoleSubtitle}</p>

          <div className="mt-6 space-y-3">
            {ROLE_CARDS.map(({ role, icon: Icon, labelKey, descKey, accent }) => (
              <Link
                key={role}
                href={buildHref(`/login/${role}`)}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-teal-300 hover:bg-teal-50/50"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accent}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900">{dict.auth[labelKey]}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{dict.auth[descKey]}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-600" />
              </Link>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            {dict.auth.noAccount}{" "}
            <Link href={buildHref("/register")} className="font-medium text-teal-700 hover:underline">
              {dict.auth.signUpLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}