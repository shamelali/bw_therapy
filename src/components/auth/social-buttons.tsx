"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apple, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useDictionary, useLocalizedHref, format } from "@/lib/i18n/locale-context";

type SocialProvider = "google" | "apple" | "facebook" | "instagram";

const googleIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.59-5.15 3.59-8.81Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.72-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.27a12 12 0 0 0 0 10.76l4.01-3.1Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.76c1.76 0 3.34.6 4.58 1.79l3.44-3.44A11.98 11.98 0 0 0 1.27 6.62l4.01 3.1C6.22 6.87 8.87 4.76 12 4.76Z"
    />
  </svg>
);

const facebookIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="#1877F2"
      d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z"
    />
  </svg>
);

const instagramIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="url(#instaGrad)"
      d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.62c-3.16 0-3.53.01-4.77.07-1.08.05-1.67.23-2.06.38-.52.2-.89.44-1.28.83-.39.39-.63.76-.83 1.28-.15.39-.33.98-.38 2.06-.06 1.24-.07 1.61-.07 4.76s.01 3.53.07 4.77c.05 1.08.23 1.67.38 2.06.2.52.44.89.83 1.28.39.39.76.63 1.28.83.39.15.98.33 2.06.38 1.24.06 1.61.07 4.77.07s3.53-.01 4.77-.07c1.08-.05 1.67-.23 2.06-.38.52-.2.89-.44 1.28-.83.39-.39.63-.76.83-1.28.15-.39.33-.98.38-2.06.06-1.24.07-1.61.07-4.77s-.01-3.53-.07-4.77c-.05-1.08-.23-1.67-.38-2.06-.2-.52-.44-.89-.83-1.28a3.44 3.44 0 0 0-1.28-.83c-.39-.15-.98-.33-2.06-.38-1.24-.06-1.61-.07-4.77-.07ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.62a3.38 3.38 0 1 0 0 6.76 3.38 3.38 0 0 0 0-6.76Zm5.2-.42a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0Z"
    />
  </svg>
);

const PROVIDER_DISPLAY_NAMES: Record<SocialProvider, string> = {
  google: "Google",
  apple: "Apple",
  facebook: "Facebook",
  instagram: "Instagram",
};

export function SocialLoginButtons({ disabled = false, returnTo }: { disabled?: boolean; returnTo?: string | null }) {
  const router = useRouter();
  const { push } = useToast();
  const dict = useDictionary();
  const buildHref = useLocalizedHref();
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);

  async function handleClick(provider: SocialProvider) {
    if (loadingProvider) return;
    setLoadingProvider(provider);
    try {
      const res = await fetch("/api/auth/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? dict.auth.genericLoginError);
      push(format(dict.auth.socialWelcomeToast, { provider: PROVIDER_DISPLAY_NAMES[provider] }), "success");
      router.push(returnTo?.startsWith("/") ? returnTo : buildHref("/dashboard"));
      router.refresh();
    } catch (err: any) {
      push(err.message, "error");
    } finally {
      setLoadingProvider(null);
    }
  }

  const busy = loadingProvider !== null;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleClick("google")}
        disabled={disabled || busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingProvider === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : googleIcon}
        {dict.auth.continueWithGoogle ?? "Continue with Google"}
      </button>

      <button
        type="button"
        onClick={() => handleClick("apple")}
        disabled={disabled || busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingProvider === "apple" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Apple className="h-4 w-4" />}
        {dict.auth.continueWithApple ?? "Continue with Apple"}
      </button>

      <button
        type="button"
        onClick={() => handleClick("facebook")}
        disabled={disabled || busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingProvider === "facebook" ? <Loader2 className="h-4 w-4 animate-spin" /> : facebookIcon}
        {dict.auth.continueWithFacebook ?? "Continue with Facebook"}
      </button>

      <button
        type="button"
        onClick={() => handleClick("instagram")}
        disabled={disabled || busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loadingProvider === "instagram" ? <Loader2 className="h-4 w-4 animate-spin" /> : instagramIcon}
        {dict.auth.continueWithInstagram ?? "Continue with Instagram"}
      </button>

      <p className="pt-1 text-center text-xs text-slate-400">{dict.auth.socialGuestHint}</p>
    </div>
  );
}