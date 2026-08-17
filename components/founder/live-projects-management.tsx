"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  IndianRupee,
  Loader2,
  RefreshCw,
  Search,
  Star,
  UserCheck,
  Users,
} from "lucide-react";

type Evaluation = {
  taskQuality: number;
  timeliness: number;
  initiative: number;
  teamwork: number;
  businessImpact: number;
  finalPresentation: number;
  totalScore: number;
  grade?: string | null;
  evaluatorName?: string | null;
  remarks?: string | null;
};

type Application = {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  yearSemester?: string | null;
  linkedinUrl?: string | null;
  departmentPreference: string;
  skills?: string | null;
  experience?: string | null;
  motivation?: string | null;
  weeklyAvailability?: string | null;
  resumeUrl?: string | null;
  status: string;
  projectCode?: string | null;
  assignedDepartment?: string | null;
  projectTitle?: string | null;
  projectRole?: string | null;
  projectObjective?: string | null;
  projectDescription?: string | null;
  projectScope?: string | null;
  expectedOutcomes?: string | null;
  keyDeliverables?: string | null;
  projectGuidelines?: string | null;
  projectResources?: string | null;
  reportingFrequency?: string | null;
  coordinatorName?: string | null;
  coordinatorEmail?: string | null;
  coordinatorPhone?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  referralCode?: string | null;
  notes?: string | null;
  taskCount: number;
  approvedTaskCount: number;
  salesOrders: number;
  salesRevenue: number;
  evaluation?: Evaluation | null;
  certificateId?: string | null;
  certificateIssueDate?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

type LiveTask = {
  id: string;
  applicationId: string;
  weekNumber: number;
  title: string;
  description?: string | null;
  priority: string;
  dueDate?: string | null;
  status: string;
  score?: number | null;
  reviewerComment?: string | null;
  submissionUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type SaleRecord = {
  id: string;
  applicationId: string;
  orderId?: string | null;
  referralCode?: string | null;
  leadCount: number;
  customerContacts: number;
  ordersCount: number;
  revenue: number;
  returnsCount: number;
  cancellationsCount: number;
  note?: string | null;
  recordedAt?: string | null;
};

type Statistics = {
  totalApplications: number;
  selected: number;
  activeStudents: number;
  completed: number;
  certificatesIssued: number;
  revenueGenerated: number;
};

type ApiPayload = {
  success?: boolean;
  message?: string;

  data?: {
    applications?: Application[];
    tasks?: LiveTask[];
    sales?: SaleRecord[];
    statistics?: Statistics;
  };
};

const emptyStats: Statistics = {
  totalApplications: 0,
  selected: 0,
  activeStudents: 0,
  completed: 0,
  certificatesIssued: 0,
  revenueGenerated: 0,
};

const departments = [
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Product & Fashion Research",
  "Technology & E-Commerce",
  "Customer Experience",
];

const statuses = [
  "applied",
  "shortlisted",
  "interview",
  "selected",
  "active",
  "completed",
  "waitlisted",
  "rejected",
];

function formatMoney(value: number) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    },
  ).format(value || 0);
}

function formatDate(
  value?: string | null,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

function statusTone(
  status: string,
) {
  const value =
    status
      .trim()
      .toLowerCase();

  if (
    value === "active" ||
    value === "selected" ||
    value === "completed"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    value === "rejected"
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (
    value === "shortlisted" ||
    value === "interview"
  ) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (
    value === "waitlisted"
  ) {
    return "border-purple-200 bg-purple-50 text-purple-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Users;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
            {label}
          </p>

          <p className="mt-2 break-words text-2xl font-black text-slate-950">
            {value}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <GraduationCap
        size={34}
        className="mx-auto text-slate-300"
      />

      <h3 className="mt-4 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function LiveProjectsManagement() {
  const [
    applications,
    setApplications,
  ] = useState<Application[]>([]);

  const [
    tasks,
    setTasks,
  ] = useState<LiveTask[]>([]);

  const [
    sales,
    setSales,
  ] = useState<SaleRecord[]>([]);

  const [
    statistics,
    setStatistics,
  ] =
    useState<Statistics>(
      emptyStats,
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    working,
    setWorking,
  ] =
    useState<string | null>(
      null,
    );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("all");

  const [
    department,
    setDepartment,
  ] = useState("all");

  const [
    tab,
    setTab,
  ] =
    useState<
      | "overview"
      | "applications"
      | "students"
      | "tasks"
      | "performance"
      | "sales"
      | "certificates"
    >("overview");

  const [
    selected,
    setSelected,
  ] =
    useState<Application | null>(
      null,
    );

  const [
    message,
    setMessage,
  ] = useState("");

  async function load() {
    setLoading(true);
    setMessage("");

    try {
      const params =
        new URLSearchParams();

      if (search.trim()) {
        params.set(
          "search",
          search.trim(),
        );
      }

      if (
        status !== "all"
      ) {
        params.set(
          "status",
          status,
        );
      }

      if (
        department !== "all"
      ) {
        params.set(
          "department",
          department,
        );
      }

      const response =
        await fetch(
          `/api/keos/live-projects?${params.toString()}`,
          {
            cache: "no-store",
          },
        );

      const payload =
        (await response.json()) as ApiPayload;

      if (
        !response.ok ||
        payload.success === false
      ) {
        throw new Error(
          payload.message ||
            "Could not load Live Projects.",
        );
      }

      setApplications(
        payload.data
          ?.applications ??
          [],
      );

      setTasks(
        payload.data
          ?.tasks ??
          [],
      );

      setSales(
        payload.data
          ?.sales ??
          [],
      );

      setStatistics(
        payload.data
          ?.statistics ??
          emptyStats,
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not load Live Projects.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(
    () => {
      void load();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      status,
      department,
    ],
  );

  async function mutate(
    applicationId: string,
    body: Record<
      string,
      unknown
    >,
  ) {
    setWorking(
      applicationId,
    );

    setMessage("");

    try {
      const response =
        await fetch(
          `/api/keos/live-projects/${encodeURIComponent(
            applicationId,
          )}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              body,
            ),
          },
        );

      const payload =
        (await response.json()) as {
          success?: boolean;
          message?: string;
        };

      if (
        !response.ok ||
        payload.success === false
      ) {
        throw new Error(
          payload.message ||
            "Live Project update failed.",
        );
      }

      await load();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Live Project update failed.",
      );
    } finally {
      setWorking(null);
    }
  }

  const activeStudents =
    useMemo(
      () =>
        applications.filter(
          (item) =>
            [
              "selected",
              "active",
              "completed",
            ].includes(
              item.status,
            ),
        ),
      [applications],
    );

  const topPerformers =
    useMemo(
      () =>
        [...activeStudents]
          .filter((item) =>
            Boolean(
              item.evaluation,
            ),
          )
          .sort(
            (a, b) =>
              Number(
                b.evaluation
                  ?.totalScore ??
                  0,
              ) -
              Number(
                a.evaluation
                  ?.totalScore ??
                  0,
              ),
          )
          .slice(0, 5),
      [activeStudents],
    );

  const tabs = [
    [
      "overview",
      "Overview",
    ],

    [
      "applications",
      "Applications",
    ],

    [
      "students",
      "Students",
    ],

    [
      "tasks",
      "Tasks",
    ],

    [
      "performance",
      "Performance",
    ],

    [
      "sales",
      "Sales",
    ],

    [
      "certificates",
      "Certificates",
    ],
  ] as const;
    return (
    <div className="min-h-full bg-slate-50">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-blue-800 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-blue-100">
              <GraduationCap
                size={20}
              />

              <span className="text-xs font-black uppercase tracking-[0.2em]">
                KRVE Live Business Project Program
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Live Projects Management
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Manage applications, student selection, project allocation,
              weekly tasks, performance evaluation, sales contribution and
              certificate issuance from one Founder workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
                Central API Connected
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
                D1 Live Project Database
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
                Certificate Verification Ready
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() =>
                void load()
              }
              disabled={
                loading
              }
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              {loading
                ? "Syncing..."
                : "Sync Live Data"}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          label="Applications"
          value={String(
            statistics.totalApplications,
          )}
          description="Total applicants"
          icon={Users}
        />

        <StatCard
          label="Selected"
          value={String(
            statistics.selected,
          )}
          description="Selected students"
          icon={UserCheck}
        />

        <StatCard
          label="Active"
          value={String(
            statistics.activeStudents,
          )}
          description="Current live projects"
          icon={BriefcaseBusiness}
        />

        <StatCard
          label="Completed"
          value={String(
            statistics.completed,
          )}
          description="Finished projects"
          icon={CheckCircle2}
        />

        <StatCard
          label="Certificates"
          value={String(
            statistics.certificatesIssued,
          )}
          description="Verified certificates"
          icon={Award}
        />

        <StatCard
          label="Revenue"
          value={formatMoney(
            statistics.revenueGenerated,
          )}
          description="Student-attributed sales"
          icon={IndianRupee}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
          <div className="overflow-x-auto">
            <div className="flex min-w-max items-center gap-2">
              {tabs.map(
                ([
                  key,
                  label,
                ]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() =>
                      setTab(
                        key,
                      )
                    }
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      tab ===
                      key
                        ? "bg-slate-950 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(240px,1.2fr)_minmax(170px,0.6fr)_minmax(220px,0.9fr)_auto]">
            <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
              <Search
                size={17}
                className="shrink-0 text-slate-400"
              />

              <input
                value={search}
                onChange={(
                  event,
                ) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                onKeyDown={(
                  event,
                ) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    void load();
                  }
                }}
                placeholder="Search applicant..."
                className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
              />
            </label>

            <select
              value={status}
              onChange={(
                event,
              ) =>
                setStatus(
                  event.target
                    .value,
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500"
            >
              <option value="all">
                All statuses
              </option>

              {statuses.map(
                (
                  item,
                ) => (
                  <option
                    key={
                      item
                    }
                    value={
                      item
                    }
                  >
                    {item
                      .replaceAll(
                        "_",
                        " ",
                      )
                      .replace(
                        /\b\w/g,
                        (
                          char,
                        ) =>
                          char.toUpperCase(),
                      )}
                  </option>
                ),
              )}
            </select>

            <select
              value={department}
              onChange={(
                event,
              ) =>
                setDepartment(
                  event.target
                    .value,
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500"
            >
              <option value="all">
                All departments
              </option>

              {departments.map(
                (
                  item,
                ) => (
                  <option
                    key={
                      item
                    }
                    value={
                      item
                    }
                  >
                    {item}
                  </option>
                ),
              )}
            </select>

            <button
              type="button"
              onClick={() =>
                void load()
              }
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-blue-700 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {message ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </div>
      ) : null}

      {loading ? (
        <div className="flex min-h-[360px] items-center justify-center">
          <div className="text-center">
            <Loader2
              size={34}
              className="mx-auto animate-spin text-blue-700"
            />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              Loading KRVE Live Projects...
            </p>
          </div>
        </div>
      ) : null}

      {!loading &&
      tab ===
        "overview" ? (
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BarChart3
                  size={20}
                  className="text-blue-700"
                />

                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Program Pipeline
                  </h2>

                  <p className="text-xs text-slate-500">
                    Current applicant and project status
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                LIVE
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "Applied",
                  applications.filter(
                    (
                      item,
                    ) =>
                      item.status ===
                      "applied",
                  ).length,
                ],

                [
                  "Shortlisted",
                  applications.filter(
                    (
                      item,
                    ) =>
                      item.status ===
                      "shortlisted",
                  ).length,
                ],

                [
                  "Interview",
                  applications.filter(
                    (
                      item,
                    ) =>
                      item.status ===
                      "interview",
                  ).length,
                ],

                [
                  "Active",
                  applications.filter(
                    (
                      item,
                    ) =>
                      item.status ===
                      "active",
                  ).length,
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={
                      String(
                        label,
                      )
                    }
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {label}
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-950">
                      {value}
                    </p>
                  </div>
                ),
              )}
            </div>

            {activeStudents.length >
            0 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-3 py-3">
                        Student
                      </th>

                      <th className="px-3 py-3">
                        Department
                      </th>

                      <th className="px-3 py-3">
                        Tasks
                      </th>

                      <th className="px-3 py-3">
                        Score
                      </th>

                      <th className="px-3 py-3">
                        Revenue
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {activeStudents
                      .slice(
                        0,
                        8,
                      )
                      .map(
                        (
                          item,
                        ) => (
                          <tr
                            key={
                              item.id
                            }
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td className="px-3 py-4">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelected(
                                    item,
                                  )
                                }
                                className="text-left"
                              >
                                <p className="font-bold text-slate-950">
                                  {item.fullName}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {item.projectCode ||
                                    item.applicationNumber}
                                </p>
                              </button>
                            </td>

                            <td className="px-3 py-4 text-slate-700">
                              {item.assignedDepartment ||
                                item.departmentPreference}
                            </td>

                            <td className="px-3 py-4 font-semibold text-slate-700">
                              {item.approvedTaskCount}
                              /
                              {item.taskCount}
                            </td>

                            <td className="px-3 py-4 font-black text-slate-950">
                              {item.evaluation
                                ?.totalScore ??
                                "—"}
                            </td>

                            <td className="px-3 py-4 font-black text-slate-950">
                              {formatMoney(
                                item.salesRevenue,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No active students yet"
                  description="Selected and activated students will appear here with their tasks, performance and sales contribution."
                />
              </div>
            )}
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Star
                size={20}
                className="text-amber-500"
              />

              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Top Performers
                </h2>

                <p className="text-xs text-slate-500">
                  Ranked by evaluation score
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {topPerformers.length >
              0 ? (
                topPerformers.map(
                  (
                    item,
                    index,
                  ) => (
                    <button
                      type="button"
                      key={
                        item.id
                      }
                      onClick={() =>
                        setSelected(
                          item,
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 text-left transition hover:bg-slate-100"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-950">
                          {index +
                            1}
                          .{" "}
                          {item.fullName}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {item.assignedDepartment ||
                            item.departmentPreference}
                        </p>

                        <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                          {item.evaluation
                            ?.grade ||
                            "Evaluated"}
                        </p>
                      </div>

                      <strong className="shrink-0 text-lg text-blue-700">
                        {item.evaluation
                          ?.totalScore ??
                          0}
                        /100
                      </strong>
                    </button>
                  ),
                )
              ) : (
                <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  Performance rankings will appear after students receive their
                  evaluation scores.
                </p>
              )}
            </div>
          </section>
        </div>
      ) : null}
            {!loading &&
      tab === "applications" ? (
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">
                      Applicant
                    </th>

                    <th className="px-5 py-4">
                      College / Course
                    </th>

                    <th className="px-5 py-4">
                      Preferred Function
                    </th>

                    <th className="px-5 py-4">
                      Availability
                    </th>

                    <th className="px-5 py-4">
                      Applied
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map(
                    (
                      item,
                    ) => (
                      <tr
                        key={item.id}
                        className="border-t border-slate-100 align-top"
                      >
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setSelected(
                                item,
                              )
                            }
                            className="max-w-[240px] text-left"
                          >
                            <p className="truncate font-black text-slate-950">
                              {item.fullName}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {item.email}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {item.phone}
                            </p>

                            <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-blue-700">
                              {item.applicationNumber}
                            </p>
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-[240px] font-semibold text-slate-900">
                            {item.college}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.course}
                          </p>

                          {item.yearSemester ? (
                            <p className="mt-1 text-xs text-slate-500">
                              {item.yearSemester}
                            </p>
                          ) : null}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex max-w-[220px] rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                            {item.departmentPreference}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-[180px] text-slate-600">
                            {item.weeklyAvailability ||
                              "Not specified"}
                          </p>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                          {formatDate(
                            item.createdAt,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${statusTone(
                              item.status,
                            )}`}
                          >
                            {item.status.replaceAll(
                              "_",
                              " ",
                            )}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex max-w-[330px] flex-wrap gap-2">
                            <button
                              type="button"
                              disabled={
                                working ===
                                item.id
                              }
                              onClick={() =>
                                void mutate(
                                  item.id,
                                  {
                                    action:
                                      "status",
                                    status:
                                      "shortlisted",
                                  },
                                )
                              }
                              className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
                            >
                              Shortlist
                            </button>

                            <button
                              type="button"
                              disabled={
                                working ===
                                item.id
                              }
                              onClick={() =>
                                void mutate(
                                  item.id,
                                  {
                                    action:
                                      "status",
                                    status:
                                      "interview",
                                  },
                                )
                              }
                              className="rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1.5 text-xs font-bold text-purple-700 transition hover:bg-purple-100 disabled:opacity-50"
                            >
                              Interview
                            </button>

                            <button
                              type="button"
                              disabled={
                                working ===
                                item.id
                              }
                              onClick={() =>
                                void mutate(
                                  item.id,
                                  {
                                    action:
                                      "status",
                                    status:
                                      "selected",
                                  },
                                )
                              }
                              className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                            >
                              Select
                            </button>

                            <button
                              type="button"
                              disabled={
                                working ===
                                item.id
                              }
                              onClick={() =>
                                void mutate(
                                  item.id,
                                  {
                                    action:
                                      "status",
                                    status:
                                      "waitlisted",
                                  },
                                )
                              }
                              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                            >
                              Waitlist
                            </button>

                            <button
                              type="button"
                              disabled={
                                working ===
                                item.id
                              }
                              onClick={() =>
                                void mutate(
                                  item.id,
                                  {
                                    action:
                                      "status",
                                    status:
                                      "rejected",
                                  },
                                )
                              }
                              className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              Reject
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setSelected(
                                  item,
                                )
                              }
                              className="rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
                            >
                              Open
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <EmptyState
                title="No Live Project applications"
                description="Applications submitted from the KRVE website will automatically appear here for review and selection."
              />
            </div>
          )}
        </section>
      ) : null}

      {!loading &&
      tab === "students" ? (
        <section className="mt-6">
          {activeStudents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {activeStudents.map(
                (
                  item,
                ) => (
                  <article
                    key={item.id}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                          {item.projectCode ||
                            item.applicationNumber}
                        </p>

                        <h3 className="mt-2 truncate text-lg font-black text-slate-950">
                          {item.fullName}
                        </h3>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {item.college}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-black uppercase ${statusTone(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-semibold text-slate-500">
                          Department
                        </span>

                        <span className="max-w-[190px] text-right text-xs font-black text-slate-900">
                          {item.assignedDepartment ||
                            item.departmentPreference}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-semibold text-slate-500">
                          Project
                        </span>

                        <span className="max-w-[190px] text-right text-xs font-black text-slate-900">
                          {item.projectTitle ||
                            "Not allocated"}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-semibold text-slate-500">
                          Coordinator
                        </span>

                        <span className="max-w-[190px] text-right text-xs font-black text-slate-900">
                          {item.coordinatorName ||
                            "Not assigned"}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-semibold text-slate-500">
                          Duration
                        </span>

                        <span className="text-right text-xs font-black text-slate-900">
                          {formatDate(
                            item.startDate,
                          )}
                          {" — "}
                          {formatDate(
                            item.endDate,
                          )}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-semibold text-slate-500">
                          Referral Code
                        </span>

                        <span className="max-w-[190px] break-all text-right font-mono text-xs font-black text-blue-700">
                          {item.referralCode ||
                            "Not generated"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl border border-slate-200 p-3 text-center">
                        <p className="text-lg font-black">
                          {item.approvedTaskCount}
                          /
                          {item.taskCount}
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Tasks
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-3 text-center">
                        <p className="text-lg font-black">
                          {item.evaluation
                            ?.totalScore ??
                            "—"}
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Score
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-3 text-center">
                        <p className="text-lg font-black">
                          {item.salesOrders}
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Orders
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          setSelected(
                            item,
                          )
                        }
                        className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                      >
                        Open Student
                      </button>

                      {item.status !==
                      "active" ? (
                        <button
                          type="button"
                          disabled={
                            working ===
                            item.id
                          }
                          onClick={() =>
                            void mutate(
                              item.id,
                              {
                                action:
                                  "allocate",

                                assignedDepartment:
                                  item.departmentPreference,

                                projectTitle: `${item.departmentPreference} Live Business Project`,
                              },
                            )
                          }
                          className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
                        >
                          Activate
                        </button>
                      ) : null}
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <EmptyState
              title="No selected students yet"
              description="Once applicants are selected, they will appear here for project allocation, tasks, evaluation and completion."
            />
          )}
        </section>
      ) : null}
            {!loading &&
      tab === "tasks" ? (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <ClipboardCheck
              size={20}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Weekly Task Tracker
              </h2>

              <p className="text-xs text-slate-500">
                Track weekly project work, due dates, progress and review scores.
              </p>
            </div>
          </div>

          {tasks.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-3 py-3">
                      Student
                    </th>

                    <th className="px-3 py-3">
                      Week
                    </th>

                    <th className="px-3 py-3">
                      Task
                    </th>

                    <th className="px-3 py-3">
                      Priority
                    </th>

                    <th className="px-3 py-3">
                      Due
                    </th>

                    <th className="px-3 py-3">
                      Status
                    </th>

                    <th className="px-3 py-3">
                      Score
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map(
                    (
                      task,
                    ) => {
                      const student =
                        applications.find(
                          (
                            item,
                          ) =>
                            item.id ===
                            task.applicationId,
                        );

                      return (
                        <tr
                          key={task.id}
                          className="border-b border-slate-100 last:border-b-0"
                        >
                          <td className="px-3 py-4">
                            <p className="font-bold text-slate-950">
                              {student?.fullName ||
                                "Student"}
                            </p>

                            <p className="text-xs text-slate-500">
                              {student?.projectCode ||
                                student?.applicationNumber ||
                                "—"}
                            </p>
                          </td>

                          <td className="px-3 py-4 whitespace-nowrap font-semibold">
                            Week{" "}
                            {task.weekNumber}
                          </td>

                          <td className="px-3 py-4">
                            <p className="font-semibold text-slate-900">
                              {task.title}
                            </p>

                            {task.description ? (
                              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                                {task.description}
                              </p>
                            ) : null}
                          </td>

                          <td className="px-3 py-4">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold capitalize text-slate-700">
                              {task.priority}
                            </span>
                          </td>

                          <td className="px-3 py-4 whitespace-nowrap text-slate-600">
                            {formatDate(
                              task.dueDate,
                            )}
                          </td>

                          <td className="px-3 py-4">
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold capitalize text-blue-700">
                              {task.status.replaceAll(
                                "_",
                                " ",
                              )}
                            </span>
                          </td>

                          <td className="px-3 py-4 font-black text-slate-950">
                            {task.score ??
                              "—"}
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState
                title="No tasks assigned yet"
                description="Open a selected student profile and assign weekly tasks. They will appear here automatically."
              />
            </div>
          )}
        </section>
      ) : null}

      {!loading &&
      tab === "performance" ? (
        <section className="mt-6">
          {activeStudents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {activeStudents.map(
                (
                  item,
                ) => (
                  <article
                    key={item.id}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-black text-slate-950">
                          {item.fullName}
                        </h3>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {item.assignedDepartment ||
                            item.departmentPreference}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-3xl font-black text-blue-700">
                          {item.evaluation
                            ?.totalScore ??
                            0}
                        </p>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          / 100
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Task Quality
                        </span>

                        <strong>
                          {item.evaluation
                            ?.taskQuality ??
                            0}
                          /25
                        </strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Timeliness
                        </span>

                        <strong>
                          {item.evaluation
                            ?.timeliness ??
                            0}
                          /15
                        </strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Initiative
                        </span>

                        <strong>
                          {item.evaluation
                            ?.initiative ??
                            0}
                          /15
                        </strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Teamwork
                        </span>

                        <strong>
                          {item.evaluation
                            ?.teamwork ??
                            0}
                          /10
                        </strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Business Impact
                        </span>

                        <strong>
                          {item.evaluation
                            ?.businessImpact ??
                            0}
                          /20
                        </strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Final Presentation
                        </span>

                        <strong>
                          {item.evaluation
                            ?.finalPresentation ??
                            0}
                          /15
                        </strong>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Grade
                        </p>

                        <p className="mt-1 font-black text-emerald-700">
                          {item.evaluation
                            ?.grade ||
                            "Not evaluated"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelected(
                            item,
                          )
                        }
                        className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
                      >
                        Evaluate
                      </button>
                    </div>
                  </article>
                ),
              )}
            </div>
          ) : (
            <EmptyState
              title="No students available for evaluation"
              description="Selected and activated students will appear here for the 100-point performance evaluation."
            />
          )}
        </section>
      ) : null}

      {!loading &&
      tab === "sales" ? (
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {activeStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">
                      Student
                    </th>

                    <th className="px-5 py-4">
                      Referral Code
                    </th>

                    <th className="px-5 py-4">
                      Orders
                    </th>

                    <th className="px-5 py-4">
                      Revenue
                    </th>

                    <th className="px-5 py-4">
                      Entries
                    </th>

                    <th className="px-5 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activeStudents.map(
                    (
                      item,
                    ) => {
                      const records =
                        sales.filter(
                          (
                            sale,
                          ) =>
                            sale.applicationId ===
                            item.id,
                        );

                      return (
                        <tr
                          key={item.id}
                          className="border-t border-slate-100"
                        >
                          <td className="px-5 py-4">
                            <p className="font-black text-slate-950">
                              {item.fullName}
                            </p>

                            <p className="text-xs text-slate-500">
                              {item.assignedDepartment ||
                                item.departmentPreference}
                            </p>
                          </td>

                          <td className="px-5 py-4 font-mono text-xs font-bold text-blue-700">
                            {item.referralCode ||
                              "—"}
                          </td>

                          <td className="px-5 py-4 font-black">
                            {item.salesOrders}
                          </td>

                          <td className="px-5 py-4 font-black text-emerald-700">
                            {formatMoney(
                              item.salesRevenue,
                            )}
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {records.length}
                          </td>

                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                setSelected(
                                  item,
                                )
                              }
                              className="whitespace-nowrap rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                              Record Sales
                            </button>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <EmptyState
                title="No sales attribution yet"
                description="Activate students and record their lead, order and revenue contribution from their individual profiles."
              />
            </div>
          )}
        </section>
      ) : null}

      {!loading &&
      tab === "certificates" ? (
        <section className="mt-6">
          {activeStudents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {activeStudents.map(
                (
                  item,
                ) => (
                  <article
                    key={item.id}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <Award
                      size={28}
                      className="text-amber-500"
                    />

                    <h3 className="mt-4 truncate text-lg font-black text-slate-950">
                      {item.fullName}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.projectTitle ||
                        `${item.assignedDepartment ||
                          item.departmentPreference} Live Business Project`}
                    </p>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <div className="flex justify-between gap-4 text-xs">
                        <span className="text-slate-500">
                          Department
                        </span>

                        <strong className="max-w-[190px] text-right">
                          {item.assignedDepartment ||
                            item.departmentPreference}
                        </strong>
                      </div>

                      <div className="mt-2 flex justify-between gap-4 text-xs">
                        <span className="text-slate-500">
                          Score
                        </span>

                        <strong>
                          {item.evaluation
                            ?.totalScore ??
                            "—"}
                        </strong>
                      </div>

                      <div className="mt-2 flex justify-between gap-4 text-xs">
                        <span className="text-slate-500">
                          Completion
                        </span>

                        <strong className="capitalize">
                          {item.status}
                        </strong>
                      </div>
                    </div>

                    {item.certificateId ? (
                      <>
                        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                            Verified Certificate ID
                          </p>

                          <p className="mt-2 break-all font-mono text-xs font-black text-emerald-800">
                            {item.certificateId}
                          </p>
                        </div>

                        <a
                          href={`https://krvefashionstudio.in/verify/${encodeURIComponent(
                            item.certificateId,
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-sm font-black text-blue-700"
                        >
                          Open Verification Page →
                        </a>
                      </>
                    ) : (
                      <button
                        type="button"
                        disabled={
                          working ===
                          item.id
                        }
                        onClick={() =>
                          void mutate(
                            item.id,
                            {
                              action:
                                "certificate",
                            },
                          )
                        }
                        className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
                      >
                        Issue Certificate ID
                      </button>
                    )}
                  </article>
                ),
              )}
            </div>
          ) : (
            <EmptyState
              title="No certificate candidates yet"
              description="Students who are selected or active will appear here. Issue certificates after project completion and evaluation."
            />
          )}
        </section>
      ) : null}
            {selected ? (
        <StudentDrawer
          item={selected}
          tasks={tasks.filter(
            (
              task,
            ) =>
              task.applicationId ===
              selected.id,
          )}
          sales={sales.filter(
            (
              sale,
            ) =>
              sale.applicationId ===
              selected.id,
          )}
          working={
            working ===
            selected.id
          }
          onClose={() =>
            setSelected(
              null,
            )
          }
          onMutate={(
            body,
          ) =>
            mutate(
              selected.id,
              body,
            )
          }
        />
      ) : null}
    </div>
  );
}

function StudentDrawer({
  item,
  tasks,
  sales,
  working,
  onClose,
  onMutate,
}: {
  item: Application;
  tasks: LiveTask[];
  sales: SaleRecord[];
  working: boolean;
  onClose: () => void;
  onMutate: (
    body: Record<
      string,
      unknown
    >,
  ) => Promise<void>;
}) {
  const [
    assignedDepartment,
    setAssignedDepartment,
  ] = useState(
    item.assignedDepartment ||
      item.departmentPreference,
  );

  const [
    projectTitle,
    setProjectTitle,
  ] = useState(
    item.projectTitle ||
      `${item.departmentPreference} Live Business Project`,
  );

  const [
    coordinator,
    setCoordinator,
  ] = useState(
    item.coordinatorName ||
      "",
  );

  const [
    startDate,
    setStartDate,
  ] = useState(
    item.startDate ||
      "",
  );

  const [
    endDate,
    setEndDate,
  ] = useState(
    item.endDate ||
      "",
  );

  const [
    projectRole,
    setProjectRole,
  ] = useState(
    item.projectRole ||
      "",
  );

  const [
    projectObjective,
    setProjectObjective,
  ] = useState(
    item.projectObjective ||
      "",
  );

  const [
    projectDescription,
    setProjectDescription,
  ] = useState(
    item.projectDescription ||
      "",
  );

  const [
    projectScope,
    setProjectScope,
  ] = useState(
    item.projectScope ||
      "",
  );

  const [
    expectedOutcomes,
    setExpectedOutcomes,
  ] = useState(
    item.expectedOutcomes ||
      "",
  );

  const [
    keyDeliverables,
    setKeyDeliverables,
  ] = useState(
    item.keyDeliverables ||
      "",
  );

  const [
    projectGuidelines,
    setProjectGuidelines,
  ] = useState(
    item.projectGuidelines ||
      "",
  );

  const [
    projectResources,
    setProjectResources,
  ] = useState(
    item.projectResources ||
      "",
  );

  const [
    reportingFrequency,
    setReportingFrequency,
  ] = useState(
    item.reportingFrequency ||
      "Weekly",
  );

  const [
    coordinatorEmail,
    setCoordinatorEmail,
  ] = useState(
    item.coordinatorEmail ||
      "",
  );

  const [
    coordinatorPhone,
    setCoordinatorPhone,
  ] = useState(
    item.coordinatorPhone ||
      "",
  );

  const [
    projectDetailsSaved,
    setProjectDetailsSaved,
  ] = useState(false);

  const [
    taskTitle,
    setTaskTitle,
  ] = useState("");

  const [
    taskDescription,
    setTaskDescription,
  ] = useState("");

  const [
    weekNumber,
    setWeekNumber,
  ] = useState("1");

  const [
    taskPriority,
    setTaskPriority,
  ] = useState(
    "medium",
  );

  const [
    taskDueDate,
    setTaskDueDate,
  ] = useState("");

  const [
    taskQuality,
    setTaskQuality,
  ] = useState(
    String(
      item.evaluation
        ?.taskQuality ??
        0,
    ),
  );

  const [
    timeliness,
    setTimeliness,
  ] = useState(
    String(
      item.evaluation
        ?.timeliness ??
        0,
    ),
  );

  const [
    initiative,
    setInitiative,
  ] = useState(
    String(
      item.evaluation
        ?.initiative ??
        0,
    ),
  );

  const [
    teamwork,
    setTeamwork,
  ] = useState(
    String(
      item.evaluation
        ?.teamwork ??
        0,
    ),
  );

  const [
    businessImpact,
    setBusinessImpact,
  ] = useState(
    String(
      item.evaluation
        ?.businessImpact ??
        0,
    ),
  );

  const [
    finalPresentation,
    setFinalPresentation,
  ] = useState(
    String(
      item.evaluation
        ?.finalPresentation ??
        0,
    ),
  );

  const [
    evaluationRemarks,
    setEvaluationRemarks,
  ] = useState(
    item.evaluation
      ?.remarks ||
      "",
  );

  const [
    leadCount,
    setLeadCount,
  ] = useState("0");

  const [
    customerContacts,
    setCustomerContacts,
  ] = useState("0");

  const [
    salesOrders,
    setSalesOrders,
  ] = useState("0");

  const [
    salesRevenue,
    setSalesRevenue,
  ] = useState("0");

  const [
    returnsCount,
    setReturnsCount,
  ] = useState("0");

  const [
    cancellationsCount,
    setCancellationsCount,
  ] = useState("0");

  const [
    salesNote,
    setSalesNote,
  ] = useState("");

  const totalScore =
    Math.min(
      25,
      Math.max(
        0,
        Number(
          taskQuality ||
            0,
        ),
      ),
    ) +
    Math.min(
      15,
      Math.max(
        0,
        Number(
          timeliness ||
            0,
        ),
      ),
    ) +
    Math.min(
      15,
      Math.max(
        0,
        Number(
          initiative ||
            0,
        ),
      ),
    ) +
    Math.min(
      10,
      Math.max(
        0,
        Number(
          teamwork ||
            0,
        ),
      ),
    ) +
    Math.min(
      20,
      Math.max(
        0,
        Number(
          businessImpact ||
            0,
        ),
      ),
    ) +
    Math.min(
      15,
      Math.max(
        0,
        Number(
          finalPresentation ||
            0,
        ),
      ),
    );

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/45 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Close student drawer"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <div className="absolute inset-y-0 right-0 flex w-full justify-end">
        <div className="relative z-10 h-full w-full max-w-3xl overflow-y-auto bg-white shadow-2xl">
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
                  {item.applicationNumber}
                </p>

                <h2 className="mt-1 truncate text-2xl font-black text-slate-950">
                  {item.fullName}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {item.college}
                  {" · "}
                  {item.course}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-7">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-950">
                    Application Profile
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Applicant information submitted from KRVE website
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${statusTone(
                    item.status,
                  )}`}
                >
                  {item.status.replaceAll(
                    "_",
                    " ",
                  )}
                </span>
              </div>

              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div className="min-w-0">
                  <dt className="text-xs font-semibold text-slate-500">
                    Email
                  </dt>

                  <dd className="mt-1 break-all font-bold text-slate-900">
                    {item.email}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Mobile
                  </dt>

                  <dd className="mt-1 font-bold text-slate-900">
                    {item.phone}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Preferred Department
                  </dt>

                  <dd className="mt-1 font-bold text-slate-900">
                    {item.departmentPreference}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Weekly Availability
                  </dt>

                  <dd className="mt-1 font-bold text-slate-900">
                    {item.weeklyAvailability ||
                      "Not specified"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Year / Semester
                  </dt>

                  <dd className="mt-1 font-bold text-slate-900">
                    {item.yearSemester ||
                      "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Applied On
                  </dt>

                  <dd className="mt-1 font-bold text-slate-900">
                    {formatDate(
                      item.createdAt,
                    )}
                  </dd>
                </div>
              </dl>

              {item.skills ? (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-slate-500">
                    Skills
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.skills}
                  </p>
                </div>
              ) : null}

              {item.experience ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Experience / Certifications
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.experience}
                  </p>
                </div>
              ) : null}

              {item.motivation ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Motivation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.motivation}
                  </p>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                {item.resumeUrl ? (
                  <a
                    href={item.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white"
                  >
                    Open Resume
                  </a>
                ) : null}

                {item.linkedinUrl ? (
                  <a
                    href={item.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <h3 className="font-black text-slate-950">
                  Selection Status
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Manage applicant movement through the selection pipeline
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  [
                    "shortlisted",
                    "Shortlist",
                  ],
                  [
                    "interview",
                    "Interview",
                  ],
                  [
                    "selected",
                    "Select",
                  ],
                  [
                    "waitlisted",
                    "Waitlist",
                  ],
                  [
                    "rejected",
                    "Reject",
                  ],
                ].map(
                  ([
                    nextStatus,
                    label,
                  ]) => (
                    <button
                      type="button"
                      key={nextStatus}
                      disabled={working}
                      onClick={() =>
                        void onMutate(
                          {
                            action:
                              "status",
                            status:
                              nextStatus,
                          },
                        )
                      }
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <h3 className="font-black text-slate-950">
                  Project Allocation
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Assign department, project title, coordinator and duration
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Department
                  </span>

                  <select
                    value={assignedDepartment}
                    onChange={(
                      event,
                    ) =>
                      setAssignedDepartment(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500"
                  >
                    {departments.map(
                      (
                        item,
                      ) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Coordinator
                  </span>

                  <input
                    value={coordinator}
                    onChange={(
                      event,
                    ) =>
                      setCoordinator(
                        event.target.value,
                      )
                    }
                    placeholder="Faculty / project coordinator"
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Project Title
                  </span>

                  <input
                    value={projectTitle}
                    onChange={(
                      event,
                    ) =>
                      setProjectTitle(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Start Date
                  </span>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(
                      event,
                    ) =>
                      setStartDate(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    End Date
                  </span>

                  <input
                    type="date"
                    value={endDate}
                    onChange={(
                      event,
                    ) =>
                      setEndDate(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>
              </div>

              <button
                type="button"
                disabled={working}
                onClick={() =>
                  void onMutate(
                    {
                      action:
                        "allocate",
                      assignedDepartment,
                      projectTitle,
                      coordinatorName:
                        coordinator,
                      startDate,
                      endDate,
                    },
                  )
                }
                className="mt-5 w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-50"
              >
                Save Allocation & Activate Student
              </button>

              {item.projectCode ||
              item.referralCode ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Project ID
                    </p>

                    <p className="mt-2 break-all font-mono text-xs font-black text-slate-950">
                      {item.projectCode ||
                        "Generated after activation"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Referral Code
                    </p>

                    <p className="mt-2 break-all font-mono text-xs font-black text-blue-700">
                      {item.referralCode ||
                        "Generated after activation"}
                    </p>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-white to-blue-50/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Student My Project
                  </div>

                  <h3 className="mt-3 text-lg font-black text-slate-950">
                    Manage Project Details
                  </h3>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                    Information saved here is stored in the Central API and is
                    shown to this student in the My Project section of the Live
                    Project Portal.
                  </p>
                </div>

                <div className="rounded-xl border border-blue-200 bg-white px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Project ID
                  </p>

                  <p className="mt-1 max-w-[220px] break-all font-mono text-xs font-black text-blue-800">
                    {item.projectCode ||
                      "Activate project first"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Project Identity
                  </p>

                  <h4 className="mt-1 font-black text-slate-950">
                    Basic Project Information
                  </h4>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Project Title
                    </span>

                    <input
                      value={projectTitle}
                      onChange={(event) => {
                        setProjectTitle(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      placeholder="Example: Finance Live Business Project"
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Department
                    </span>

                    <select
                      value={assignedDepartment}
                      onChange={(event) => {
                        setAssignedDepartment(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500"
                    >
                      {departments.map(
                        (
                          departmentName,
                        ) => (
                          <option
                            key={
                              departmentName
                            }
                            value={
                              departmentName
                            }
                          >
                            {
                              departmentName
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Student Project Role
                    </span>

                    <input
                      value={projectRole}
                      onChange={(event) => {
                        setProjectRole(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      placeholder="Example: Finance Research & Business Analysis Associate"
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Project Brief
                  </p>

                  <h4 className="mt-1 font-black text-slate-950">
                    Objective, Description & Scope
                  </h4>
                </div>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Project Objective
                  </span>

                  <textarea
                    value={projectObjective}
                    onChange={(event) => {
                      setProjectObjective(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={4}
                    placeholder="What should the student achieve through this Live Project?"
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Project Description
                  </span>

                  <textarea
                    value={projectDescription}
                    onChange={(event) => {
                      setProjectDescription(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={5}
                    placeholder="Explain the business problem, context and work expected from the student."
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Project Scope
                  </span>

                  <textarea
                    value={projectScope}
                    onChange={(event) => {
                      setProjectScope(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={4}
                    placeholder="Define the areas, activities and boundaries covered by this project."
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Expected Outcomes
                  </span>

                  <textarea
                    value={expectedOutcomes}
                    onChange={(event) => {
                      setExpectedOutcomes(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={4}
                    placeholder="Describe the expected business or learning outcomes."
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Execution
                  </p>

                  <h4 className="mt-1 font-black text-slate-950">
                    Deliverables, Guidelines & Resources
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    You can enter multiple points on separate lines. The Student
                    Portal can display each line as an individual project item.
                  </p>
                </div>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Deliverables
                  </span>

                  <textarea
                    value={keyDeliverables}
                    onChange={(event) => {
                      setKeyDeliverables(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={6}
                    placeholder={"Example:\nCompetitor analysis report\nWeekly progress tracker\nFinal recommendation deck"}
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Project Guidelines
                  </span>

                  <textarea
                    value={projectGuidelines}
                    onChange={(event) => {
                      setProjectGuidelines(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={6}
                    placeholder={"Example:\nUse reliable sources\nSubmit before deadline\nMaintain confidentiality\nUse professional file names"}
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Resources / Important Links
                  </span>

                  <textarea
                    value={projectResources}
                    onChange={(event) => {
                      setProjectResources(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    rows={5}
                    placeholder={"Paste documents, Google Drive links, dashboards, websites or reference resources here. Use one item per line."}
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Reporting Frequency
                  </span>

                  <select
                    value={reportingFrequency}
                    onChange={(event) => {
                      setReportingFrequency(
                        event.target.value,
                      );
                      setProjectDetailsSaved(
                        false,
                      );
                    }}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500"
                  >
                    <option value="Weekly">
                      Weekly
                    </option>

                    <option value="Twice Weekly">
                      Twice Weekly
                    </option>

                    <option value="Fortnightly">
                      Fortnightly
                    </option>

                    <option value="Monthly">
                      Monthly
                    </option>

                    <option value="Milestone Based">
                      Milestone Based
                    </option>

                    <option value="As Required">
                      As Required
                    </option>
                  </select>
                </label>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    Coordinator & Timeline
                  </p>

                  <h4 className="mt-1 font-black text-slate-950">
                    Contact and Project Duration
                  </h4>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Coordinator Name
                    </span>

                    <input
                      value={coordinator}
                      onChange={(event) => {
                        setCoordinator(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      placeholder="Faculty / KRVE project coordinator"
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Coordinator Email
                    </span>

                    <input
                      type="email"
                      value={coordinatorEmail}
                      onChange={(event) => {
                        setCoordinatorEmail(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      placeholder="coordinator@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Coordinator Phone
                    </span>

                    <input
                      type="tel"
                      value={coordinatorPhone}
                      onChange={(event) => {
                        setCoordinatorPhone(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      placeholder="+91"
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Reporting Frequency
                    </span>

                    <input
                      value={reportingFrequency}
                      readOnly
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Start Date
                    </span>

                    <input
                      type="date"
                      value={startDate}
                      onChange={(event) => {
                        setStartDate(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                      End Date
                    </span>

                    <input
                      type="date"
                      value={endDate}
                      onChange={(event) => {
                        setEndDate(
                          event.target.value,
                        );
                        setProjectDetailsSaved(
                          false,
                        );
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-300">
                      Publish to Student Portal
                    </p>

                    <h4 className="mt-1 font-black">
                      Save My Project Details
                    </h4>

                    <p className="mt-1 max-w-xl text-xs leading-5 text-slate-300">
                      After saving, the student can refresh the My Project page
                      to receive the latest project information.
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={
                      working ||
                      !projectTitle.trim() ||
                      !assignedDepartment.trim()
                    }
                    onClick={async () => {
                      await onMutate({
                        action:
                          "project_details",
                        projectTitle:
                          projectTitle.trim(),
                        assignedDepartment:
                          assignedDepartment.trim(),
                        projectRole:
                          projectRole.trim(),
                        projectObjective:
                          projectObjective.trim(),
                        projectDescription:
                          projectDescription.trim(),
                        projectScope:
                          projectScope.trim(),
                        expectedOutcomes:
                          expectedOutcomes.trim(),
                        keyDeliverables:
                          keyDeliverables.trim(),
                        projectGuidelines:
                          projectGuidelines.trim(),
                        projectResources:
                          projectResources.trim(),
                        reportingFrequency:
                          reportingFrequency.trim(),
                        coordinatorName:
                          coordinator.trim(),
                        coordinatorEmail:
                          coordinatorEmail.trim(),
                        coordinatorPhone:
                          coordinatorPhone.trim(),
                        startDate:
                          startDate.trim(),
                        endDate:
                          endDate.trim(),
                      });

                      setProjectDetailsSaved(
                        true,
                      );
                    }}
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {working ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2
                          size={17}
                        />

                        Save Project Details
                      </>
                    )}
                  </button>
                </div>

                {projectDetailsSaved ? (
                  <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-xs font-bold text-emerald-200">
                    Project details saved. Student can now refresh the My
                    Project page.
                  </div>
                ) : null}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <h3 className="font-black text-slate-950">
                  Weekly Tasks
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Assign and track week-wise Live Project work
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[110px_minmax(0,1fr)]">
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Week
                  </span>

                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={weekNumber}
                    onChange={(
                      event,
                    ) =>
                      setWeekNumber(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Task Title
                  </span>

                  <input
                    value={taskTitle}
                    onChange={(
                      event,
                    ) =>
                      setTaskTitle(
                        event.target.value,
                      )
                    }
                    placeholder="Example: Competitor analysis"
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>
              </div>

              <label className="mt-3 block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Task Description
                </span>

                <textarea
                  value={taskDescription}
                  onChange={(
                    event,
                  ) =>
                    setTaskDescription(
                      event.target.value,
                    )
                  }
                  rows={3}
                  placeholder="Detailed task instructions..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm"
                />
              </label>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Priority
                  </span>

                  <select
                    value={taskPriority}
                    onChange={(
                      event,
                    ) =>
                      setTaskPriority(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  >
                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>

                    <option value="critical">
                      Critical
                    </option>
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Due Date
                  </span>

                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(
                      event,
                    ) =>
                      setTaskDueDate(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>
              </div>

              <button
                type="button"
                disabled={
                  working ||
                  !taskTitle.trim()
                }
                onClick={async () => {
                  await onMutate(
                    {
                      action:
                        "task",
                      weekNumber:
                        Number(
                          weekNumber,
                        ),
                      title:
                        taskTitle,
                      description:
                        taskDescription,
                      priority:
                        taskPriority,
                      dueDate:
                        taskDueDate,
                    },
                  );

                  setTaskTitle("");
                  setTaskDescription("");
                  setTaskDueDate("");
                }}
                className="mt-4 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                Assign Weekly Task
              </button>

              <div className="mt-5 space-y-3">
                {tasks.length > 0 ? (
                  tasks.map(
                    (
                      task,
                    ) => (
                      <div
                        key={task.id}
                        className="rounded-2xl bg-slate-50 p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                              Week{" "}
                              {task.weekNumber}
                            </p>

                            <h4 className="mt-1 break-words font-black text-slate-950">
                              {task.title}
                            </h4>

                            {task.description ? (
                              <p className="mt-2 text-xs leading-5 text-slate-500">
                                {task.description}
                              </p>
                            ) : null}
                          </div>

                          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold capitalize text-slate-700">
                            {task.status.replaceAll(
                              "_",
                              " ",
                            )}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                          <span>
                            Priority:{" "}
                            <strong className="capitalize text-slate-800">
                              {task.priority}
                            </strong>
                          </span>

                          <span>
                            Due:{" "}
                            <strong className="text-slate-800">
                              {formatDate(
                                task.dueDate,
                              )}
                            </strong>
                          </span>

                          <span>
                            Score:{" "}
                            <strong className="text-slate-800">
                              {task.score ??
                                "—"}
                            </strong>
                          </span>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                    No weekly tasks assigned yet.
                  </p>
                )}
              </div>
            </section>
                        <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <h3 className="font-black text-slate-950">
                  Performance Evaluation
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  KRVE 100-point performance framework
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Task Quality / 25
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={taskQuality}
                    onChange={(event) =>
                      setTaskQuality(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Timeliness / 15
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={timeliness}
                    onChange={(event) =>
                      setTimeliness(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Initiative / 15
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={initiative}
                    onChange={(event) =>
                      setInitiative(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Teamwork / 10
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={teamwork}
                    onChange={(event) =>
                      setTeamwork(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Business Impact / 20
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={businessImpact}
                    onChange={(event) =>
                      setBusinessImpact(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Final Presentation / 15
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={finalPresentation}
                    onChange={(event) =>
                      setFinalPresentation(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Current Total
                    </p>

                    <p className="mt-1 text-xs text-blue-600">
                      Maximum possible score is 100
                    </p>
                  </div>

                  <p className="text-3xl font-black text-blue-800">
                    {totalScore}
                    <span className="text-base">
                      /100
                    </span>
                  </p>
                </div>
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Evaluation Remarks
                </span>

                <textarea
                  value={evaluationRemarks}
                  onChange={(event) =>
                    setEvaluationRemarks(
                      event.target.value,
                    )
                  }
                  rows={4}
                  placeholder="Performance remarks, strengths and improvement areas..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500"
                />
              </label>

              <button
                type="button"
                disabled={working}
                onClick={() =>
                  void onMutate({
                    action: "evaluation",
                    taskQuality:
                      Number(
                        taskQuality || 0,
                      ),
                    timeliness:
                      Number(
                        timeliness || 0,
                      ),
                    initiative:
                      Number(
                        initiative || 0,
                      ),
                    teamwork:
                      Number(
                        teamwork || 0,
                      ),
                    businessImpact:
                      Number(
                        businessImpact || 0,
                      ),
                    finalPresentation:
                      Number(
                        finalPresentation ||
                          0,
                      ),
                    evaluatorName:
                      "Founder Office",
                    remarks:
                      evaluationRemarks,
                  })
                }
                className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                Save Performance Evaluation
              </button>

              {item.evaluation ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                        Current Grade
                      </p>

                      <p className="mt-1 font-black text-emerald-900">
                        {item.evaluation.grade ||
                          "Evaluated"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-emerald-800">
                        {
                          item.evaluation
                            .totalScore
                        }
                      </p>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Score
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <h3 className="font-black text-slate-950">
                  Sales Contribution
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Record leads, customer outreach, orders and revenue contribution
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Leads Generated
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={leadCount}
                    onChange={(event) =>
                      setLeadCount(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Customers Contacted
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={customerContacts}
                    onChange={(event) =>
                      setCustomerContacts(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Orders
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={salesOrders}
                    onChange={(event) =>
                      setSalesOrders(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Revenue
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={salesRevenue}
                    onChange={(event) =>
                      setSalesRevenue(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Returns
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={returnsCount}
                    onChange={(event) =>
                      setReturnsCount(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Cancellations
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={cancellationsCount}
                    onChange={(event) =>
                      setCancellationsCount(
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sales Note
                </span>

                <textarea
                  value={salesNote}
                  onChange={(event) =>
                    setSalesNote(
                      event.target.value,
                    )
                  }
                  rows={3}
                  placeholder="Campaign, outreach or order details..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm"
                />
              </label>

              <button
                type="button"
                disabled={working}
                onClick={async () => {
                  await onMutate({
                    action: "sale",
                    referralCode:
                      item.referralCode,
                    leadCount:
                      Number(
                        leadCount || 0,
                      ),
                    customerContacts:
                      Number(
                        customerContacts ||
                          0,
                      ),
                    ordersCount:
                      Number(
                        salesOrders || 0,
                      ),
                    revenue:
                      Number(
                        salesRevenue || 0,
                      ),
                    returnsCount:
                      Number(
                        returnsCount || 0,
                      ),
                    cancellationsCount:
                      Number(
                        cancellationsCount ||
                          0,
                      ),
                    note: salesNote,
                  });

                  setLeadCount("0");
                  setCustomerContacts("0");
                  setSalesOrders("0");
                  setSalesRevenue("0");
                  setReturnsCount("0");
                  setCancellationsCount(
                    "0",
                  );
                  setSalesNote("");
                }}
                className="mt-4 w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-50 sm:w-auto"
              >
                Record Sales Contribution
              </button>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Total Orders
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-950">
                    {item.salesOrders}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Total Revenue
                  </p>

                  <p className="mt-2 break-words text-xl font-black text-emerald-700">
                    {formatMoney(
                      item.salesRevenue,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Entries
                  </p>

                  <p className="mt-2 text-2xl font-black text-slate-950">
                    {sales.length}
                  </p>
                </div>
              </div>

              {sales.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {sales
                    .slice(0, 5)
                    .map(
                      (
                        sale,
                      ) => (
                        <div
                          key={sale.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 text-xs"
                        >
                          <div>
                            <p className="font-bold text-slate-900">
                              {
                                sale.ordersCount
                              }{" "}
                              order(s) ·{" "}
                              {formatMoney(
                                sale.revenue,
                              )}
                            </p>

                            <p className="mt-1 text-slate-500">
                              {formatDate(
                                sale.recordedAt,
                              )}
                            </p>
                          </div>

                          <span className="break-all font-mono font-bold text-blue-700">
                            {sale.referralCode ||
                              item.referralCode ||
                              "—"}
                          </span>
                        </div>
                      ),
                    )}
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-start gap-3">
                <Award
                  size={26}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <div>
                  <h3 className="font-black">
                    Project Completion & Certificate
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Complete the Live Project and generate the verified KRVE
                    Certificate ID after final evaluation.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Project Status
                  </p>

                  <p className="mt-2 break-words font-black capitalize">
                    {item.status}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Evaluation
                  </p>

                  <p className="mt-2 font-black">
                    {item.evaluation
                      ?.totalScore ??
                      0}
                    /100
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Tasks
                  </p>

                  <p className="mt-2 font-black">
                    {item.approvedTaskCount}
                    /
                    {item.taskCount}
                  </p>
                </div>
              </div>

              {item.certificateId ? (
                <div className="mt-5">
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
                      Verified Certificate ID
                    </p>

                    <p className="mt-2 break-all font-mono text-sm font-black text-white">
                      {item.certificateId}
                    </p>

                    <p className="mt-2 text-xs text-slate-300">
                      Issued:{" "}
                      {formatDate(
                        item.certificateIssueDate,
                      )}
                    </p>
                  </div>

                  <a
                    href={`https://krvefashionstudio.in/verify/${encodeURIComponent(
                      item.certificateId,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-black text-amber-300"
                  >
                    Open Public Verification →
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={working}
                  onClick={() =>
                    void onMutate({
                      action:
                        "certificate",
                    })
                  }
                  className="mt-5 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Complete Project & Issue Certificate ID
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
