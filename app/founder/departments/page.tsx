"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Edit3,
  Eye,
  FileBarChart,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type DepartmentStatus = "Active" | "Inactive" | "Under Review";

type Department = {
  id: number;
  name: string;
  code: string;
  head: string;
  headInitials: string;
  employees: number;
  openPositions: number;
  annualBudget: number;
  budgetUsed: number;
  performance: number;
  location: string;
  email: string;
  status: DepartmentStatus;
};

const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Founder Office",
    code: "FND",
    head: "Badal Kumar",
    headInitials: "BK",
    employees: 6,
    openPositions: 1,
    annualBudget: 4800000,
    budgetUsed: 61,
    performance: 97,
    location: "Executive Office",
    email: "founder@krve.in",
    status: "Active",
  },
  {
    id: 2,
    name: "Finance",
    code: "FIN",
    head: "Aarav Sharma",
    headInitials: "AS",
    employees: 14,
    openPositions: 2,
    annualBudget: 7200000,
    budgetUsed: 68,
    performance: 94,
    location: "Corporate Office",
    email: "finance@krve.in",
    status: "Active",
  },
  {
    id: 3,
    name: "Human Resources",
    code: "HR",
    head: "Meera Singh",
    headInitials: "MS",
    employees: 11,
    openPositions: 3,
    annualBudget: 5600000,
    budgetUsed: 52,
    performance: 91,
    location: "Corporate Office",
    email: "hr@krve.in",
    status: "Active",
  },
  {
    id: 4,
    name: "Marketing",
    code: "MKT",
    head: "Riya Kapoor",
    headInitials: "RK",
    employees: 19,
    openPositions: 2,
    annualBudget: 9600000,
    budgetUsed: 74,
    performance: 89,
    location: "Creative Studio",
    email: "marketing@krve.in",
    status: "Active",
  },
  {
    id: 5,
    name: "Technology",
    code: "TECH",
    head: "Arjun Verma",
    headInitials: "AV",
    employees: 22,
    openPositions: 2,
    annualBudget: 12800000,
    budgetUsed: 64,
    performance: 95,
    location: "Technology Centre",
    email: "technology@krve.in",
    status: "Active",
  },
  {
    id: 6,
    name: "Customer Support",
    code: "CS",
    head: "Ananya Gupta",
    headInitials: "AG",
    employees: 16,
    openPositions: 2,
    annualBudget: 6800000,
    budgetUsed: 58,
    performance: 87,
    location: "Support Centre",
    email: "support@krve.in",
    status: "Active",
  },
  {
    id: 7,
    name: "Procurement",
    code: "PROC",
    head: "Vikram Mehta",
    headInitials: "VM",
    employees: 9,
    openPositions: 1,
    annualBudget: 4900000,
    budgetUsed: 47,
    performance: 90,
    location: "Operations Office",
    email: "procurement@krve.in",
    status: "Active",
  },
  {
    id: 8,
    name: "Inventory",
    code: "INV",
    head: "Karan Malhotra",
    headInitials: "KM",
    employees: 8,
    openPositions: 0,
    annualBudget: 4500000,
    budgetUsed: 55,
    performance: 88,
    location: "Warehouse Office",
    email: "inventory@krve.in",
    status: "Active",
  },
  {
    id: 9,
    name: "Warehouse",
    code: "WH",
    head: "Sahil Khan",
    headInitials: "SK",
    employees: 10,
    openPositions: 1,
    annualBudget: 5200000,
    budgetUsed: 62,
    performance: 86,
    location: "Distribution Centre",
    email: "warehouse@krve.in",
    status: "Active",
  },
  {
    id: 10,
    name: "Legal & Compliance",
    code: "LEGAL",
    head: "Naina Roy",
    headInitials: "NR",
    employees: 5,
    openPositions: 0,
    annualBudget: 3600000,
    budgetUsed: 44,
    performance: 93,
    location: "Corporate Office",
    email: "legal@krve.in",
    status: "Active",
  },
  {
    id: 11,
    name: "Administration",
    code: "ADMIN",
    head: "Dev Patel",
    headInitials: "DP",
    employees: 5,
    openPositions: 0,
    annualBudget: 3400000,
    budgetUsed: 51,
    performance: 85,
    location: "Corporate Office",
    email: "admin@krve.in",
    status: "Active",
  },
  {
    id: 12,
    name: "Risk Management",
    code: "RISK",
    head: "Ishita Rao",
    headInitials: "IR",
    employees: 3,
    openPositions: 0,
    annualBudget: 2800000,
    budgetUsed: 39,
    performance: 92,
    location: "Corporate Office",
    email: "risk@krve.in",
    status: "Under Review",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function DepartmentsPage() {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [editingDepartment, setEditingDepartment] =
    useState<Department | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignHeadModal, setShowAssignHeadModal] = useState(false);
  const [actionMenu, setActionMenu] = useState<number | null>(null);

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const searchMatches =
        department.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        department.code
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        department.head
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const statusMatches =
        statusFilter === "All" || department.status === statusFilter;

      return searchMatches && statusMatches;
    });
  }, [departments, searchQuery, statusFilter]);

  const totalEmployees = departments.reduce(
    (total, department) => total + department.employees,
    0,
  );

  const totalOpenPositions = departments.reduce(
    (total, department) => total + department.openPositions,
    0,
  );

  const averagePerformance = Math.round(
    departments.reduce(
      (total, department) => total + department.performance,
      0,
    ) / departments.length,
  );

  const averageBudgetUsed = Math.round(
    departments.reduce(
      (total, department) => total + department.budgetUsed,
      0,
    ) / departments.length,
  );

  const handleDeleteDepartment = (departmentId: number) => {
    setDepartments((current) =>
      current.filter((department) => department.id !== departmentId),
    );
    setActionMenu(null);
  };

  const handleSaveDepartment = (department: Department) => {
    setDepartments((current) => {
      const exists = current.some((item) => item.id === department.id);

      if (exists) {
        return current.map((item) =>
          item.id === department.id ? department : item,
        );
      }

      return [...current, department];
    });

    setShowCreateModal(false);
    setEditingDepartment(null);
  };

  const handleAssignHead = (
    departmentId: number,
    headName: string,
  ) => {
    const initials = headName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setDepartments((current) =>
      current.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              head: headName,
              headInitials: initials,
            }
          : department,
      ),
    );

    setShowAssignHeadModal(false);
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 xl:p-8">
      <section className="overflow-hidden rounded-[26px] bg-gradient-to-r from-[#111827] via-[#32117c] to-[#1d4ed8] px-6 py-8 text-white shadow-[0_18px_45px_rgba(30,41,59,0.18)] sm:px-9 sm:py-9">
        <div className="flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                <Building2 size={23} />
              </div>

              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-200">
                Organisation Administration
              </p>
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
              Departments
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Define departments, leadership, reporting structures,
              responsibilities and operating ownership across the KRVE
              enterprise.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
            <button
              type="button"
              onClick={() => {
                setEditingDepartment(null);
                setShowCreateModal(true);
              }}
              className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <Sparkles size={18} />
              Create Department
            </button>

            <button
              type="button"
              onClick={() => setShowAssignHeadModal(true)}
              className="flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <ArrowRight size={18} />
              Assign Head
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Departments"
          value={departments.length.toString()}
          subtitle="All active departments"
          icon={Building2}
          iconClassName="bg-violet-50 text-violet-600"
        />

        <MetricCard
          title="Department Heads"
          value={departments.length.toString()}
          subtitle="Fully assigned"
          icon={UserCheck}
          iconClassName="bg-blue-50 text-blue-600"
        />

        <MetricCard
          title="Employees Mapped"
          value={totalEmployees.toString()}
          subtitle="100% organisational mapping"
          icon={Users}
          iconClassName="bg-emerald-50 text-emerald-600"
        />

        <MetricCard
          title="Open Positions"
          value={totalOpenPositions.toString()}
          subtitle="Across active departments"
          icon={BriefcaseBusiness}
          iconClassName="bg-orange-50 text-orange-600"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_0.85fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Organisation Overview
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Department Performance
              </h2>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <FileBarChart size={17} />
              Full Report
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <OverviewStat
              label="Average Performance"
              value={`${averagePerformance}%`}
              icon={TrendingUp}
            />

            <OverviewStat
              label="Budget Utilisation"
              value={`${averageBudgetUsed}%`}
              icon={CircleDollarSign}
            />

            <OverviewStat
              label="Operating Health"
              value="Excellent"
              icon={ShieldCheck}
            />
          </div>

          <div className="mt-7 space-y-5">
            {departments.slice(0, 5).map((department) => (
              <div key={department.id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {department.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {department.employees} employees
                    </p>
                  </div>

                  <span className="text-sm font-black text-slate-900">
                    {department.performance}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                    style={{
                      width: `${department.performance}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[24px] bg-[#111827] p-6 text-white shadow-sm">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-600">
            <Sparkles size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-black">
            KRVE AI Organisation Insight
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            All departments are operational. Technology and Finance show
            the strongest performance. Customer Support should prioritise
            hiring to reduce future workload pressure.
          </p>

          <div className="mt-6 space-y-3">
            <InsightRow
              label="Strongest department"
              value="Founder Office"
            />

            <InsightRow
              label="Hiring priority"
              value="Human Resources"
            />

            <InsightRow
              label="Highest budget use"
              value="Marketing"
            />

            <InsightRow
              label="Structure health"
              value="96%"
            />
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            <BarChart3 size={17} />
            Generate AI Analysis
          </button>
        </article>
      </section>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                Department Directory
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                All Departments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage department ownership, employees, budgets and
                performance.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-[250px]">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search departments..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-11 min-w-[165px] appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-violet-500"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Under Review</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Department",
                  "Department Head",
                  "Employees",
                  "Budget",
                  "Performance",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.13em] text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredDepartments.map((department) => (
                <tr
                  key={department.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
                        <Building2 size={19} />
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDepartment(department)
                          }
                          className="font-black text-slate-950 transition hover:text-violet-600"
                        >
                          {department.name}
                        </button>

                        <p className="mt-1 text-xs text-slate-500">
                          Code: {department.code}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                        {department.headInitials}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {department.head}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Department Head
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-black text-slate-950">
                      {department.employees}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {department.openPositions} open positions
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-black text-slate-950">
                      {formatCurrency(department.annualBudget)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-violet-600"
                          style={{
                            width: `${department.budgetUsed}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-bold text-slate-500">
                        {department.budgetUsed}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <TrendingUp
                        size={16}
                        className="text-emerald-600"
                      />

                      <span className="text-sm font-black text-slate-950">
                        {department.performance}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={department.status} />
                  </td>

                  <td className="relative px-6 py-5">
                    <button
                      type="button"
                      onClick={() =>
                        setActionMenu(
                          actionMenu === department.id
                            ? null
                            : department.id,
                        )
                      }
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {actionMenu === department.id && (
                      <div className="absolute right-6 top-14 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                        <ActionButton
                          label="View Details"
                          icon={Eye}
                          onClick={() => {
                            setSelectedDepartment(department);
                            setActionMenu(null);
                          }}
                        />

                        <ActionButton
                          label="Edit Department"
                          icon={Edit3}
                          onClick={() => {
                            setEditingDepartment(department);
                            setShowCreateModal(true);
                            setActionMenu(null);
                          }}
                        />

                        <ActionButton
                          label="Delete"
                          icon={Trash2}
                          danger
                          onClick={() =>
                            handleDeleteDepartment(department.id)
                          }
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDepartments.length === 0 && (
            <div className="px-6 py-16 text-center">
              <Building2
                size={36}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-black text-slate-900">
                No departments found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing the search or status filter.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-black text-slate-900">
              {filteredDepartments.length}
            </span>{" "}
            of{" "}
            <span className="font-black text-slate-900">
              {departments.length}
            </span>{" "}
            departments
          </p>

          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-400">
              Previous
            </button>

            <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </section>

      {showCreateModal && (
        <DepartmentModal
          department={editingDepartment}
          onClose={() => {
            setShowCreateModal(false);
            setEditingDepartment(null);
          }}
          onSave={handleSaveDepartment}
        />
      )}

      {showAssignHeadModal && (
        <AssignHeadModal
          departments={departments}
          onClose={() => setShowAssignHeadModal(false)}
          onAssign={handleAssignHead}
        />
      )}

      {selectedDepartment && (
        <DepartmentDetailsModal
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </main>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: typeof Building2;
  iconClassName: string;
}) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${iconClassName}`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-3 text-xs font-medium text-slate-400">
        {subtitle}
      </p>
    </article>
  );
}

function OverviewStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Activity;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <Icon size={19} className="text-violet-600" />

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}

function InsightRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: DepartmentStatus;
}) {
  const style =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Inactive"
        ? "bg-slate-100 text-slate-600"
        : "bg-orange-50 text-orange-700";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  danger = false,
}: {
  label: string;
  icon: typeof Eye;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function DepartmentModal({
  department,
  onClose,
  onSave,
}: {
  department: Department | null;
  onClose: () => void;
  onSave: (department: Department) => void;
}) {
  const [form, setForm] = useState<Department>(
    department ?? {
      id: Date.now(),
      name: "",
      code: "",
      head: "Not Assigned",
      headInitials: "NA",
      employees: 0,
      openPositions: 0,
      annualBudget: 0,
      budgetUsed: 0,
      performance: 0,
      location: "",
      email: "",
      status: "Active",
    },
  );

  const updateField = <K extends keyof Department>(
    key: K,
    value: Department[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.code.trim()) return;

    const initials =
      form.head === "Not Assigned"
        ? "NA"
        : form.head
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();

    onSave({
      ...form,
      headInitials: initials,
    });
  };

  return (
    <ModalShell
      title={department ? "Edit Department" : "Create Department"}
      description="Define department ownership, budget and operating information."
      icon={Building2}
      onClose={onClose}
    >
      <div className="max-h-[66vh] overflow-y-auto p-6 sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Department Name"
            value={form.name}
            placeholder="Enter department name"
            onChange={(value) => updateField("name", value)}
          />

          <FormField
            label="Department Code"
            value={form.code}
            placeholder="Example: FIN"
            onChange={(value) =>
              updateField("code", value.toUpperCase())
            }
          />

          <FormField
            label="Department Head"
            value={form.head}
            placeholder="Enter department head"
            onChange={(value) => updateField("head", value)}
          />

          <FormField
            label="Department Email"
            type="email"
            value={form.email}
            placeholder="department@krve.in"
            onChange={(value) => updateField("email", value)}
          />

          <FormField
            label="Office Location"
            value={form.location}
            placeholder="Enter office location"
            onChange={(value) => updateField("location", value)}
          />

          <FormField
            label="Annual Budget"
            type="number"
            value={form.annualBudget.toString()}
            placeholder="Enter budget amount"
            onChange={(value) =>
              updateField("annualBudget", Number(value))
            }
          />

          <FormField
            label="Employee Count"
            type="number"
            value={form.employees.toString()}
            placeholder="0"
            onChange={(value) =>
              updateField("employees", Number(value))
            }
          />

          <FormField
            label="Open Positions"
            type="number"
            value={form.openPositions.toString()}
            placeholder="0"
            onChange={(value) =>
              updateField("openPositions", Number(value))
            }
          />

          <SelectField
            label="Department Status"
            value={form.status}
            options={["Active", "Inactive", "Under Review"]}
            onChange={(value) =>
              updateField("status", value as DepartmentStatus)
            }
          />

          <FormField
            label="Performance Score"
            type="number"
            value={form.performance.toString()}
            placeholder="0"
            onChange={(value) =>
              updateField(
                "performance",
                Math.min(100, Number(value)),
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <Check size={17} />
          {department ? "Save Changes" : "Create Department"}
        </button>
      </div>
    </ModalShell>
  );
}

function AssignHeadModal({
  departments,
  onClose,
  onAssign,
}: {
  departments: Department[];
  onClose: () => void;
  onAssign: (departmentId: number, headName: string) => void;
}) {
  const [departmentId, setDepartmentId] = useState(
    departments[0]?.id.toString() ?? "",
  );
  const [headName, setHeadName] = useState("");

  return (
    <ModalShell
      title="Assign Department Head"
      description="Assign leadership ownership to an enterprise department."
      icon={UserCog}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="p-6 sm:p-7">
        <div className="space-y-5">
          <SelectField
            label="Select Department"
            value={departmentId}
            options={departments.map((department) =>
              department.id.toString(),
            )}
            optionLabels={departments.map(
              (department) => department.name,
            )}
            onChange={setDepartmentId}
          />

          <FormField
            label="Department Head"
            value={headName}
            placeholder="Enter employee name"
            onChange={setHeadName}
          />

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-blue-700">
                Department heads receive management permissions and
                responsibility for approvals, employees, reporting and
                department performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!departmentId || !headName.trim()}
          onClick={() =>
            onAssign(Number(departmentId), headName.trim())
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UserCheck size={17} />
          Assign Department Head
        </button>
      </div>
    </ModalShell>
  );
}

function DepartmentDetailsModal({
  department,
  onClose,
}: {
  department: Department;
  onClose: () => void;
}) {
  return (
    <ModalShell
      title={department.name}
      description="Department profile, leadership and operating overview."
      icon={Building2}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailMetric
            label="Employees"
            value={department.employees.toString()}
            icon={Users}
          />

          <DetailMetric
            label="Open Positions"
            value={department.openPositions.toString()}
            icon={BriefcaseBusiness}
          />

          <DetailMetric
            label="Performance"
            value={`${department.performance}%`}
            icon={TrendingUp}
          />

          <DetailMetric
            label="Budget Used"
            value={`${department.budgetUsed}%`}
            icon={CircleDollarSign}
          />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <DetailCard
            title="Department Head"
            value={department.head}
            icon={UserCheck}
          />

          <DetailCard
            title="Department Code"
            value={department.code}
            icon={Building2}
          />

          <DetailCard
            title="Office Location"
            value={department.location}
            icon={MapPin}
          />

          <DetailCard
            title="Department Email"
            value={department.email}
            icon={Mail}
          />

          <DetailCard
            title="Annual Budget"
            value={formatCurrency(department.annualBudget)}
            icon={CircleDollarSign}
          />

          <DetailCard
            title="Department Status"
            value={department.status}
            icon={CheckCircle2}
          />
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-6">
          <h3 className="font-black text-slate-950">
            Department Operating Health
          </h3>

          <div className="mt-5 space-y-4">
            <HealthProgress
              label="Performance"
              value={department.performance}
            />

            <HealthProgress
              label="Budget Utilisation"
              value={department.budgetUsed}
            />

            <HealthProgress
              label="Employee Mapping"
              value={100}
            />
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function ModalShell({
  title,
  description,
  icon: Icon,
  onClose,
  children,
  maxWidth = "max-w-5xl",
}: {
  title: string;
  description: string;
  icon: typeof Building2;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-5 bg-gradient-to-r from-[#111827] via-[#32117c] to-[#1d4ed8] px-6 py-5 text-white">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Icon size={21} />
            </div>

            <div>
              <h2 className="text-xl font-black sm:text-2xl">
                {title}
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
          >
            <X size={19} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  optionLabels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  optionLabels?: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
      >
        {options.map((option, index) => (
          <option key={option} value={option}>
            {optionLabels?.[index] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DetailMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <Icon size={18} className="text-violet-600" />

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}

function DetailCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: typeof Mail;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={19} />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <p className="mt-1 font-black text-slate-950">{value}</p>
      </div>
    </div>
  );
}

function HealthProgress({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-600">
          {label}
        </span>

        <span className="text-sm font-black text-slate-950">
          {value}%
        </span>
      </div>

      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}