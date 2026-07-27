"use client";

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
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

const FOUNDER_USER_ID = "FOUNDER001";
const FOUNDER_PASSWORD = "KRVE@2026";

type LoginSession = {
  userId: string;
  name: string;
  role: string;
  department: string;
  isAuthenticated: boolean;
  loginTime: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedSession =
      localStorage.getItem("keos-auth-session") ||
      sessionStorage.getItem("keos-auth-session");

    if (!storedSession) return;

    try {
      const session = JSON.parse(storedSession) as LoginSession;

      if (session.isAuthenticated && session.role === "Founder") {
        router.replace("/founder");
      }
    } catch {
      localStorage.removeItem("keos-auth-session");
      sessionStorage.removeItem("keos-auth-session");
    }
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const normalizedUserId = userId.trim().toUpperCase();
    const normalizedPassword = password.trim();

    if (!normalizedUserId || !normalizedPassword) {
      setError("Please enter your User ID and password.");
      return;
    }

    setIsLoading(true);

    window.setTimeout(() => {
      if (
        normalizedUserId === FOUNDER_USER_ID &&
        normalizedPassword === FOUNDER_PASSWORD
      ) {
        const session: LoginSession = {
          userId: FOUNDER_USER_ID,
          name: "Badal Kumar",
          role: "Founder",
          department: "Founder Office",
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        };

        localStorage.removeItem("keos-auth-session");
        sessionStorage.removeItem("keos-auth-session");

        const storage = keepSignedIn
          ? localStorage
          : sessionStorage;

        storage.setItem(
          "keos-auth-session",
          JSON.stringify(session),
        );

        localStorage.setItem(
          "keos-user",
          JSON.stringify(session),
        );

        document.cookie =
          "keos-authenticated=true; path=/; max-age=86400; SameSite=Lax";

        router.replace("/founder");
        router.refresh();
        return;
      }

      setError("Invalid User ID or password.");
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-[#0d172c] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20 xl:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(76,29,149,0.30),transparent_38%)]" />

          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-xl font-black shadow-lg shadow-blue-950/30">
                K
              </div>

              <div>
                <p className="text-xl font-black tracking-[0.24em]">
                  KEOS
                </p>

                <p className="mt-1 text-xs text-blue-300">
                  KRVE Enterprise Operating System
                </p>
              </div>
            </div>

            <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-200">
              <Sparkles size={15} />
              Enterprise Command Center
            </div>

            <div className="mt-8 max-w-2xl">
              <h1 className="text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
                Control your entire
                <span className="block text-blue-400">
                  business operation.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 xl:text-lg">
                Finance, human resources, sales, products,
                inventory, marketing, customer support and
                business intelligence — all connected in one
                secure enterprise platform.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 xl:grid-cols-3">
            <FeatureCard
              icon={ShieldCheck}
              title="Secure Access"
              description="Role-based enterprise protection."
            />

            <FeatureCard
              icon={BarChart3}
              title="Live Insights"
              description="Real-time operational intelligence."
            />

            <FeatureCard
              icon={Building2}
              title="One Platform"
              description="All departments in one system."
            />
          </div>

          <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400">
            <span>© 2026 KRVE Enterprise</span>
            <span>Private & Confidential</span>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[448px]">
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-lg font-black text-white">
                K
              </div>

              <div>
                <p className="font-black tracking-[0.22em] text-slate-950">
                  KEOS
                </p>

                <p className="text-xs text-slate-500">
                  Enterprise Operating System
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:px-9 sm:py-9">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                <LockKeyhole size={15} />
                Authorized Personnel Only
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
                Welcome to KEOS
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Sign in using the credentials provided by your
                organization.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8"
                noValidate
              >
                <div>
                  <label
                    htmlFor="userId"
                    className="text-sm font-black text-slate-800"
                  >
                    User ID
                  </label>

                  <div className="relative mt-2">
                    <UserRound
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="userId"
                      name="userId"
                      type="text"
                      autoComplete="username"
                      value={userId}
                      onChange={(event) => {
                        setUserId(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your User ID"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="text-sm font-black text-slate-800"
                  >
                    Password
                  </label>

                  <div className="relative mt-2">
                    <KeyRound
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                <label className="mt-5 flex w-fit cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(event) =>
                      setKeepSignedIn(event.target.checked)
                    }
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />

                  <span className="text-sm font-medium text-slate-600">
                    Keep me signed in
                  </span>
                </label>

                {error && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={19} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-xs leading-5 text-slate-500">
                  Your access is protected and monitored under
                  KRVE enterprise security policies.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Need access? Contact the KRVE system administrator.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      <Icon size={22} className="text-blue-400" />

      <h3 className="mt-4 font-black text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}