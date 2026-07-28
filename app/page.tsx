"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const FOUNDER_USER_ID = "FOUNDER001";
const FOUNDER_PASSWORD = "Founder@123";

type LoginSession = {
  userId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isAuthenticated: boolean;
  loginTime: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("FOUNDER001");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const rememberedUserId = window.localStorage.getItem(
      "keos-remembered-user-id"
    );

    if (rememberedUserId) {
      setUserId(rememberedUserId);
      setRememberMe(true);
    }
  }, []);

  function saveFounderSession() {
    const session: LoginSession = {
      userId: FOUNDER_USER_ID,
      name: "Badal Kumar",
      email: "founder@krve.in",
      role: "founder",
      department: "Founder Office",
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };

    /*
     * Multiple keys are stored so this page remains compatible
     * with common KEOS session implementations.
     */
    window.localStorage.setItem("keos-session", JSON.stringify(session));
    window.localStorage.setItem("keos_session", JSON.stringify(session));
    window.localStorage.setItem("keosSession", JSON.stringify(session));

    if (rememberMe) {
      window.localStorage.setItem(
        "keos-remembered-user-id",
        FOUNDER_USER_ID
      );
    } else {
      window.localStorage.removeItem("keos-remembered-user-id");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedUserId = userId.trim().toUpperCase();

    if (!normalizedUserId) {
      setError("Please enter your User ID.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (
      normalizedUserId !== FOUNDER_USER_ID ||
      password !== FOUNDER_PASSWORD
    ) {
      setError("The User ID or password is incorrect.");
      return;
    }

    setSubmitting(true);
    saveFounderSession();

    window.setTimeout(() => {
      router.push("/founder");
    }, 550);
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left luxury brand panel */}
        <section className="relative hidden overflow-hidden bg-[#11110f] text-white lg:flex lg:flex-col">
          <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#c9a861]/10 blur-[130px]" />

          <div className="absolute -bottom-48 right-[-100px] h-[500px] w-[500px] rounded-full bg-[#c9a861]/10 blur-[150px]" />

          <div className="relative z-10 flex min-h-screen flex-col px-12 py-10 xl:px-16 xl:py-12">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c7a96b]/40 bg-[#c7a96b]/10">
                <span className="font-serif text-2xl font-semibold text-[#ddbf7e]">
                  K
                </span>
              </div>

              <div>
                <p className="font-serif text-2xl font-semibold tracking-[0.18em]">
                  KEOS
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.23em] text-zinc-500">
                  KRVE Enterprise Operating System
                </p>
              </div>
            </div>

            <div className="my-auto max-w-2xl py-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c7a96b]/30 bg-[#c7a96b]/10 px-4 py-2">
                <Sparkles size={15} className="text-[#ddbf7e]" />

                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ddbf7e]">
                  Founder Command Center
                </span>
              </div>

              <h1 className="mt-8 max-w-xl font-serif text-5xl font-semibold leading-[1.06] tracking-tight xl:text-6xl">
                Control your entire enterprise from one place.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 xl:text-lg">
                Finance, employees, products, inventory, customers, marketing
                and enterprise intelligence—connected through one secure
                operating system.
              </p>

              <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c7a96b]/10 text-[#d9bb79]">
                    <ShieldCheck size={19} />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    Secure Access
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Protected enterprise workspace
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c7a96b]/10 text-[#d9bb79]">
                    <BarChart3 size={19} />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    Live Intelligence
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Unified operational insights
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c7a96b]/10 text-[#d9bb79]">
                    <Building2 size={19} />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    Full Control
                  </p>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Every department connected
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.14em] text-zinc-600">
              <span>KRVE Enterprise</span>
              <span>Founder Access Portal</span>
            </div>
          </div>
        </section>

        {/* Login form */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
          <div className="absolute right-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#c7a96b]/10 blur-[100px]" />

          <div className="relative z-10 w-full max-w-[470px]">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171714] text-[#d8b976]">
                <span className="font-serif text-xl font-semibold">K</span>
              </div>

              <div>
                <p className="font-serif text-xl font-semibold tracking-[0.15em]">
                  KEOS
                </p>

                <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                  Enterprise Operating System
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-zinc-200 bg-white p-6 shadow-[0_24px_70px_rgba(24,24,20,0.10)] sm:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c7a96b]/30 bg-[#c7a96b]/10 px-3.5 py-2">
                <LockKeyhole size={14} className="text-[#937238]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#84652f]">
                  Authorized Personnel Only
                </span>
              </div>

              <h2 className="mt-7 font-serif text-4xl font-semibold tracking-tight text-[#171714]">
                Welcome to KEOS
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
                Sign in using the credentials provided by your organization.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <label className="block">
                  <span className="mb-2.5 block text-xs font-semibold text-zinc-800">
                    User ID
                  </span>

                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-[#faf9f6] px-4 transition focus-within:border-[#b49556] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                    <UserRound
                      size={18}
                      className="shrink-0 text-zinc-400"
                    />

                    <input
                      value={userId}
                      onChange={(event) => {
                        setUserId(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your User ID"
                      autoComplete="username"
                      className="h-14 w-full bg-transparent text-sm font-medium uppercase text-zinc-950 outline-none placeholder:normal-case placeholder:text-zinc-400"
                    />
                  </div>
                </label>

                <label className="mt-5 block">
                  <span className="mb-2.5 block text-xs font-semibold text-zinc-800">
                    Password
                  </span>

                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-[#faf9f6] px-4 transition focus-within:border-[#b49556] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#c7a96b]/10">
                    <KeyRound
                      size={18}
                      className="shrink-0 text-zinc-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-14 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </label>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      className="h-4 w-4 accent-[#a88542]"
                    />

                    <span className="text-xs text-zinc-600">
                      Keep me signed in
                    </span>
                  </label>

                  <span className="text-[11px] font-medium text-zinc-400">
                    Credentials issued by HR
                  </span>
                </div>

                {error && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5">
                    <LockKeyhole
                      size={17}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <p className="text-xs leading-5 text-red-700">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#171714] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(23,23,20,0.18)] transition hover:bg-[#2b2923] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-7 flex items-center justify-center gap-2 border-t border-zinc-100 pt-6">
                <CheckCircle2 size={14} className="text-emerald-600" />

                <p className="text-[11px] text-zinc-500">
                  Secure access protected by KEOS authentication
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-[11px] leading-5 text-zinc-500">
              KRVE Enterprise Operating System · Founder Command Center
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
