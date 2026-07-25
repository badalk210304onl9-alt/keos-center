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
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  authenticateUser,
  getStoredSession,
  type KeosSession,
} from "@/lib/access-control";

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentSession = getStoredSession();

    if (!currentSession) {
      return;
    }

    if (currentSession.role === "Founder") {
      router.replace("/founder");
      return;
    }

    router.replace("/employee");
  }, [router]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please enter your User ID and password.");
      return;
    }

    const user = authenticateUser(userId, password);

    if (!user) {
      setError("Invalid User ID or password.");
      return;
    }

    setIsSubmitting(true);

    const session: KeosSession = {
      userId: user.userId,
      name: user.name,
      role: user.role,
      department: user.department,
      allowedModules: user.allowedModules,
      loginTime: new Date().toISOString(),
    };

    const serializedSession = JSON.stringify(session);

    if (rememberMe) {
      localStorage.setItem("keos_session", serializedSession);
      sessionStorage.removeItem("keos_session");
    } else {
      sessionStorage.setItem("keos_session", serializedSession);
      localStorage.removeItem("keos_session");
    }

    window.setTimeout(() => {
      if (session.role === "Founder") {
        router.push("/founder");
      } else {
        router.push("/employee");
      }
    }, 500);
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-[#0f172a] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-3xl" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-xl font-black shadow-lg shadow-blue-950/40">
              K
            </div>

            <div>
              <h1 className="text-xl font-black tracking-[0.2em]">KEOS</h1>

              <p className="mt-1 text-xs text-slate-400">
                KRVE Enterprise Operating System
              </p>
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-200">
              <Sparkles size={15} />
              Enterprise Command Center
            </div>

            <h2 className="text-5xl font-black leading-[1.1] xl:text-6xl">
              Control your entire
              <span className="block text-blue-400">
                business operation.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300">
              Finance, human resources, sales, products, inventory, marketing,
              customer support, and business intelligence — all connected in
              one secure enterprise platform.
            </p>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <ShieldCheck className="text-blue-400" size={25} />

                <strong className="mt-4 block text-sm">
                  Secure Access
                </strong>

                <span className="mt-2 block text-xs leading-5 text-slate-400">
                  Department-based access control
                </span>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <BarChart3 className="text-red-400" size={25} />

                <strong className="mt-4 block text-sm">
                  Live Insights
                </strong>

                <span className="mt-2 block text-xs leading-5 text-slate-400">
                  Real-time operational overview
                </span>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <Building2 className="text-blue-400" size={25} />

                <strong className="mt-4 block text-sm">
                  One Platform
                </strong>

                <span className="mt-2 block text-xs leading-5 text-slate-400">
                  Every department in one system
                </span>
              </article>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-500">
            <span>© 2026 KRVE. All rights reserved.</span>

            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              All systems operational
            </span>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-9 flex items-center gap-3 lg:hidden">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 font-black text-white">
                K
              </div>

              <div>
                <p className="font-black tracking-[0.18em] text-slate-900">
                  KEOS
                </p>

                <p className="text-xs text-slate-500">
                  KRVE Enterprise Operating System
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-9">
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                  <LockKeyhole size={14} />
                  Authorized Personnel Only
                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-900">
                  Welcome to KEOS
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in using the credentials provided by your organization.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="userId"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    User ID
                  </label>

                  <div className="flex h-13 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <UserRound size={19} className="text-slate-400" />

                    <input
                      id="userId"
                      type="text"
                      value={userId}
                      onChange={(event) => setUserId(event.target.value)}
                      placeholder="Enter your Employee ID"
                      autoComplete="username"
                      disabled={isSubmitting}
                      className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="flex h-13 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <KeyRound size={19} className="text-slate-400" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="text-slate-400 transition hover:text-blue-600"
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
                </div>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="h-4 w-4 accent-blue-600"
                  />

                  Keep me signed in
                </label>

                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-600" />

                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" size={19} />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={19} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-7 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <p className="text-xs leading-5 text-slate-500">
                  Employees can access only the modules assigned to their
                  department.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Secure KRVE Enterprise Environment
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}