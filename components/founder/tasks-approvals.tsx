"use client";

import { useMemo, useState } from "react";

import {
  AlertCircle,
  ArrowRight,
  BadgeIndianRupee,
  Ban,
  Building2,
  CalendarDays,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  IndianRupee,
  Megaphone,
  MoreHorizontal,
  PackageCheck,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserCheck,
  UserRound,
  Users,
  WalletCards,
  X,
  XCircle,
} from "lucide-react";

type ApprovalStatus = "Pending" | "Approved" | "Rejected";
type ApprovalPriority = "Critical" | "High" | "Medium" | "Low";
type ApprovalTab = "All" | ApprovalStatus;

type ApprovalItem = {
  id: string;
  title: string;
  description: string;
  department: string;
  category: string;
  requester: string;
  requesterRole: string;
  submittedAt: string;
  dueDate: string;
  amount?: string;
  priority: ApprovalPriority;
  status: ApprovalStatus;
  icon: typeof FileText;
  attachments: number;
  notes: string;
};

const initialApprovals: ApprovalItem[] = [
  {
    id: "APR-2026-084",
    title: "July Payroll Approval",
    description:
      "Monthly payroll approval for 128 active employees, including salary adjustments and incentives.",
    department: "Human Resources",
    category: "Payroll",
    requester: "Ananya Singh",
    requesterRole: "HR Manager",
    submittedAt: "25 Jul 2026, 09:20 AM",
    dueDate: "26 Jul 2026",
    amount: "₹4,82,000",
    priority: "Critical",
    status: "Pending",
    icon: BadgeIndianRupee,
    attachments: 4,
    notes:
      "Payroll has been verified by HR. Final Founder approval is required before bank processing.",
  },
  {
    id: "APR-2026-083",
    title: "Vendor Payment — Arvind Textiles",
    description:
      "Payment approval for fabric supply invoices received during July 2026.",
    department: "Finance",
    category: "Vendor Payment",
    requester: "Rohan Verma",
    requesterRole: "Finance Manager",
    submittedAt: "25 Jul 2026, 08:45 AM",
    dueDate: "27 Jul 2026",
    amount: "₹1,26,500",
    priority: "High",
    status: "Pending",
    icon: CircleDollarSign,
    attachments: 3,
    notes:
      "Goods receipt and quality verification have been completed by the warehouse team.",
  },
  {
    id: "APR-2026-082",
    title: "Inventory Replenishment Order",
    description:
      "Purchase request for replenishment of low-stock premium menswear products.",
    department: "Inventory",
    category: "Purchase Order",
    requester: "Vikram Patel",
    requesterRole: "Inventory Manager",
    submittedAt: "24 Jul 2026, 05:30 PM",
    dueDate: "28 Jul 2026",
    amount: "₹2,18,750",
    priority: "High",
    status: "Pending",
    icon: PackageCheck,
    attachments: 5,
    notes:
      "The purchase request covers five SKUs currently below their reorder points.",
  },
  {
    id: "APR-2026-081",
    title: "Performance Marketing Campaign",
    description:
      "Approval for a 30-day paid campaign across Google, Meta and influencer channels.",
    department: "Marketing",
    category: "Campaign Budget",
    requester: "Priya Mehta",
    requesterRole: "Marketing Lead",
    submittedAt: "24 Jul 2026, 03:10 PM",
    dueDate: "29 Jul 2026",
    amount: "₹1,75,000",
    priority: "Medium",
    status: "Pending",
    icon: Megaphone,
    attachments: 2,
    notes:
      "The campaign targets premium fashion customers across Delhi, Mumbai, Bengaluru and Hyderabad.",
  },
  {
    id: "APR-2026-080",
    title: "Employee Travel Reimbursements",
    description:
      "Reimbursement approval for seven employee business travel claims.",
    department: "Finance",
    category: "Reimbursement",
    requester: "Neha Sharma",
    requesterRole: "Accounts Executive",
    submittedAt: "24 Jul 2026, 12:15 PM",
    dueDate: "27 Jul 2026",
    amount: "₹38,450",
    priority: "Medium",
    status: "Pending",
    icon: WalletCards,
    attachments: 7,
    notes:
      "All receipts and travel authorizations have been attached to the request.",
  },
  {
    id: "APR-2026-079",
    title: "Senior Fashion Designer Hiring",
    description:
      "Final hiring approval for the selected Senior Fashion Designer candidate.",
    department: "Human Resources",
    category: "Recruitment",
    requester: "Ananya Singh",
    requesterRole: "HR Manager",
    submittedAt: "23 Jul 2026, 04:40 PM",
    dueDate: "30 Jul 2026",
    amount: "₹9.60L Annual CTC",
    priority: "High",
    status: "Pending",
    icon: UserCheck,
    attachments: 6,
    notes:
      "The candidate has completed all interview rounds and reference verification.",
  },
  {
    id: "APR-2026-078",
    title: "Bulk Order Discount Exception",
    description:
      "Special pricing approval for a corporate order of 86 premium blazers.",
    department: "Sales",
    category: "Discount",
    requester: "Aarav Sharma",
    requesterRole: "Sales Manager",
    submittedAt: "23 Jul 2026, 02:30 PM",
    dueDate: "26 Jul 2026",
    amount: "₹8,42,800",
    priority: "Critical",
    status: "Pending",
    icon: ShoppingBag,
    attachments: 2,
    notes:
      "The requested discount is 12%, while the standard authorized discount is 8%.",
  },
  {
    id: "APR-2026-077",
    title: "Cloud Infrastructure Upgrade",
    description:
      "Upgrade request for production servers, monitoring and backup infrastructure.",
    department: "Technology",
    category: "Technology Expense",
    requester: "Aditya Rao",
    requesterRole: "Technology Lead",
    submittedAt: "22 Jul 2026, 06:05 PM",
    dueDate: "31 Jul 2026",
    amount: "₹92,000",
    priority: "Medium",
    status: "Approved",
    icon: Building2,
    attachments: 3,
    notes:
      "The upgrade is required to support increased traffic and enterprise data workloads.",
  },
  {
    id: "APR-2026-076",
    title: "Influencer Partnership Request",
    description:
      "Three-month collaboration request with a premium fashion content creator.",
    department: "Marketing",
    category: "Influencer Partnership",
    requester: "Priya Mehta",
    requesterRole: "Marketing Lead",
    submittedAt: "22 Jul 2026, 10:15 AM",
    dueDate: "25 Jul 2026",
    amount: "₹1,20,000",
    priority: "Low",
    status: "Rejected",
    icon: Users,
    attachments: 2,
    notes:
      "The proposal did not meet the required return-on-investment benchmark.",
  },
  {
    id: "APR-2026-075",
    title: "GST Payment Authorization",
    description:
      "Authorization for monthly GST liability payment for June 2026.",
    department: "Finance",
    category: "Tax Compliance",
    requester: "Rohan Verma",
    requesterRole: "Finance Manager",
    submittedAt: "21 Jul 2026, 11:35 AM",
    dueDate: "25 Jul 2026",
    amount: "₹74,280",
    priority: "Critical",
    status: "Approved",
    icon: ShieldCheck,
    attachments: 4,
    notes:
      "GST returns were reconciled and verified before the payment request.",
  },
];

const recentDecisions = [
  {
    id: "APR-2026-077",
    title: "Cloud Infrastructure Upgrade",
    decision: "Approved",
    time: "22 Jul 2026, 07:10 PM",
  },
  {
    id: "APR-2026-076",
    title: "Influencer Partnership Request",
    decision: "Rejected",
    time: "22 Jul 2026, 11:40 AM",
  },
  {
    id: "APR-2026-075",
    title: "GST Payment Authorization",
    decision: "Approved",
    time: "21 Jul 2026, 12:10 PM",
  },
];

function getPriorityClasses(priority: ApprovalPriority) {
  if (priority === "Critical") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (priority === "High") {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  if (priority === "Medium") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  return "bg-slate-100 text-slate-600 border-slate-200";
}

function getStatusClasses(status: ApprovalStatus) {
  if (status === "Approved") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (status === "Rejected") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-orange-50 text-orange-700 border-orange-200";
}

function getDepartmentClasses(department: string) {
  if (department === "Finance") {
    return "bg-blue-50 text-blue-700";
  }

  if (department === "Human Resources") {
    return "bg-violet-50 text-violet-700";
  }

  if (department === "Marketing") {
    return "bg-red-50 text-red-700";
  }

  if (department === "Inventory") {
    return "bg-orange-50 text-orange-700";
  }

  if (department === "Sales") {
    return "bg-green-50 text-green-700";
  }

  return "bg-slate-100 text-slate-700";
}

export default function TasksApprovals() {
  const [approvals, setApprovals] =
    useState<ApprovalItem[]>(initialApprovals);

  const [activeTab, setActiveTab] =
    useState<ApprovalTab>("Pending");

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedApprovalId, setSelectedApprovalId] =
    useState<string | null>(null);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const departments = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(approvals.map((approval) => approval.department)),
      ),
    ],
    [approvals],
  );

  const filteredApprovals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return approvals.filter((approval) => {
      const tabMatch =
        activeTab === "All" || approval.status === activeTab;

      const departmentMatch =
        departmentFilter === "All" ||
        approval.department === departmentFilter;

      const priorityMatch =
        priorityFilter === "All" ||
        approval.priority === priorityFilter;

      const searchMatch =
        !query ||
        `${approval.id} ${approval.title} ${approval.description} ${approval.department} ${approval.requester}`
          .toLowerCase()
          .includes(query);

      return (
        tabMatch &&
        departmentMatch &&
        priorityMatch &&
        searchMatch
      );
    });
  }, [
    activeTab,
    approvals,
    departmentFilter,
    priorityFilter,
    searchQuery,
  ]);

  const selectedApproval =
    approvals.find(
      (approval) => approval.id === selectedApprovalId,
    ) ?? null;

  const pendingCount = approvals.filter(
    (approval) => approval.status === "Pending",
  ).length;

  const approvedCount = approvals.filter(
    (approval) => approval.status === "Approved",
  ).length;

  const rejectedCount = approvals.filter(
    (approval) => approval.status === "Rejected",
  ).length;

  const criticalCount = approvals.filter(
    (approval) =>
      approval.status === "Pending" &&
      approval.priority === "Critical",
  ).length;

  function updateApprovalStatus(
    approvalId: string,
    status: ApprovalStatus,
  ) {
    setApprovals((currentApprovals) =>
      currentApprovals.map((approval) =>
        approval.id === approvalId
          ? {
              ...approval,
              status,
            }
          : approval,
      ),
    );

    setSelectedRows((currentRows) =>
      currentRows.filter((id) => id !== approvalId),
    );
  }

  function approveSelectedRows() {
    if (selectedRows.length === 0) {
      return;
    }

    setApprovals((currentApprovals) =>
      currentApprovals.map((approval) =>
        selectedRows.includes(approval.id) &&
        approval.status === "Pending"
          ? {
              ...approval,
              status: "Approved",
            }
          : approval,
      ),
    );

    setSelectedRows([]);
  }

  function rejectSelectedRows() {
    if (selectedRows.length === 0) {
      return;
    }

    setApprovals((currentApprovals) =>
      currentApprovals.map((approval) =>
        selectedRows.includes(approval.id) &&
        approval.status === "Pending"
          ? {
              ...approval,
              status: "Rejected",
            }
          : approval,
      ),
    );

    setSelectedRows([]);
  }

  function toggleRow(approvalId: string) {
    setSelectedRows((currentRows) =>
      currentRows.includes(approvalId)
        ? currentRows.filter((id) => id !== approvalId)
        : [...currentRows, approvalId],
    );
  }

  function toggleAllVisibleRows() {
    const pendingVisibleIds = filteredApprovals
      .filter((approval) => approval.status === "Pending")
      .map((approval) => approval.id);

    const allSelected =
      pendingVisibleIds.length > 0 &&
      pendingVisibleIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows((currentRows) =>
        currentRows.filter(
          (id) => !pendingVisibleIds.includes(id),
        ),
      );
    } else {
      setSelectedRows((currentRows) =>
        Array.from(
          new Set([...currentRows, ...pendingVisibleIds]),
        ),
      );
    }
  }

  function refreshApprovals() {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  }

  function exportApprovals() {
    const rows = [
      [
        "Approval ID",
        "Title",
        "Department",
        "Requester",
        "Amount",
        "Priority",
        "Status",
        "Submitted",
        "Due Date",
      ],
      ...filteredApprovals.map((approval) => [
        approval.id,
        approval.title,
        approval.department,
        approval.requester,
        approval.amount ?? "",
        approval.priority,
        approval.status,
        approval.submittedAt,
        approval.dueDate,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replaceAll('"', '""')}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "keos-tasks-approvals.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 p-7 text-white shadow-xl shadow-blue-900/10 sm:p-9">
        <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              <FileCheck2 size={16} />
              Founder Decision Center
            </div>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Tasks & Approvals
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Review, approve and reject financial, operational,
              employee, inventory, sales and marketing requests from
              one centralized Founder workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshApprovals}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
            >
              <RefreshCcw
                size={17}
                className={isRefreshing ? "animate-spin" : ""}
              />

              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={exportApprovals}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              <Download size={17} />
              Export Report
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Pending Approvals"
          value={String(pendingCount).padStart(2, "0")}
          description="Waiting for your decision"
          icon={Clock3}
          tone="orange"
        />

        <SummaryCard
          title="Critical Requests"
          value={String(criticalCount).padStart(2, "0")}
          description="Require immediate attention"
          icon={AlertCircle}
          tone="red"
        />

        <SummaryCard
          title="Approved"
          value={String(approvedCount).padStart(2, "0")}
          description="Approved during this period"
          icon={CheckCircle2}
          tone="green"
        />

        <SummaryCard
          title="Rejected"
          value={String(rejectedCount).padStart(2, "0")}
          description="Requests not authorized"
          icon={XCircle}
          tone="blue"
        />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "All",
                  "Pending",
                  "Approved",
                  "Rejected",
                ] as ApprovalTab[]
              ).map((tab) => {
                const count =
                  tab === "All"
                    ? approvals.length
                    : approvals.filter(
                        (approval) => approval.status === tab,
                      ).length;

                return (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedRows([]);
                    }}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        activeTab === tab
                          ? "bg-white/20"
                          : "bg-white"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex h-11 min-w-[240px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <Search size={17} className="text-slate-400" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search approvals..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={15} className="text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Building2
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={departmentFilter}
                  onChange={(event) =>
                    setDepartmentFilter(event.target.value)
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-xs font-semibold text-slate-600 outline-none"
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department === "All"
                        ? "All Departments"
                        : department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(event.target.value)
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-xs font-semibold text-slate-600 outline-none"
                >
                  <option value="All">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {selectedRows.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                <span className="text-xs font-bold text-blue-800">
                  {selectedRows.length} selected
                </span>

                <button
                  type="button"
                  onClick={approveSelectedRows}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                >
                  <CheckCheck size={15} />
                  Approve
                </button>

                <button
                  type="button"
                  onClick={rejectSelectedRows}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  <Ban size={15} />
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRows([])}
                  className="text-slate-500"
                  aria-label="Clear selection"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.08em] text-slate-500">
                <th className="w-14 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={
                      filteredApprovals.filter(
                        (approval) =>
                          approval.status === "Pending",
                      ).length > 0 &&
                      filteredApprovals
                        .filter(
                          (approval) =>
                            approval.status === "Pending",
                        )
                        .every((approval) =>
                          selectedRows.includes(approval.id),
                        )
                    }
                    onChange={toggleAllVisibleRows}
                    className="h-4 w-4 accent-blue-600"
                  />
                </th>

                <th className="px-4 py-4 font-semibold">
                  Request
                </th>

                <th className="px-4 py-4 font-semibold">
                  Department
                </th>

                <th className="px-4 py-4 font-semibold">
                  Requester
                </th>

                <th className="px-4 py-4 font-semibold">
                  Amount
                </th>

                <th className="px-4 py-4 font-semibold">
                  Priority
                </th>

                <th className="px-4 py-4 font-semibold">
                  Due Date
                </th>

                <th className="px-4 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApprovals.length > 0 ? (
                filteredApprovals.map((approval) => {
                  const ApprovalIcon = approval.icon;

                  return (
                    <tr
                      key={approval.id}
                      className="border-b border-slate-100 text-sm transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <input
                          type="checkbox"
                          disabled={
                            approval.status !== "Pending"
                          }
                          checked={selectedRows.includes(
                            approval.id,
                          )}
                          onChange={() => toggleRow(approval.id)}
                          className="h-4 w-4 accent-blue-600 disabled:opacity-30"
                        />
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                            <ApprovalIcon size={19} />
                          </div>

                          <div className="max-w-[310px]">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedApprovalId(
                                  approval.id,
                                )
                              }
                              className="block text-left text-sm font-bold text-slate-900 hover:text-blue-600"
                            >
                              {approval.title}
                            </button>

                            <span className="mt-1 block text-[11px] font-semibold text-blue-600">
                              {approval.id}
                            </span>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                              {approval.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${getDepartmentClasses(
                            approval.department,
                          )}`}
                        >
                          {approval.department}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <strong className="block text-xs text-slate-800">
                          {approval.requester}
                        </strong>

                        <span className="mt-1 block text-[10px] text-slate-500">
                          {approval.requesterRole}
                        </span>
                      </td>

                      <td className="px-4 py-5 font-black text-slate-900">
                        {approval.amount ?? "—"}
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] font-bold ${getPriorityClasses(
                            approval.priority,
                          )}`}
                        >
                          {approval.priority}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <CalendarDays
                            size={14}
                            className="text-slate-400"
                          />
                          {approval.dueDate}
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] font-bold ${getStatusClasses(
                            approval.status,
                          )}`}
                        >
                          {approval.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedApprovalId(approval.id)
                            }
                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                            aria-label="View approval"
                          >
                            <Eye size={16} />
                          </button>

                          {approval.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateApprovalStatus(
                                    approval.id,
                                    "Approved",
                                  )
                                }
                                className="grid h-9 w-9 place-items-center rounded-lg border border-green-200 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                                aria-label="Approve"
                              >
                                <Check size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateApprovalStatus(
                                    approval.id,
                                    "Rejected",
                                  )
                                }
                                className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                                aria-label="Reject"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
                            aria-label="More options"
                          >
                            <MoreHorizontal size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-20">
                    <div className="text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                        <FileCheck2 size={25} />
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-800">
                        No approvals found
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Change the filters or search query to view
                        other requests.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>
            Showing {filteredApprovals.length} of{" "}
            {approvals.length} requests
          </span>

          <span>
            Last synchronized: 25 Jul 2026, 08:20 PM
          </span>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Approval Workload by Department
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pending requests currently assigned to the Founder
            </p>
          </div>

          <div className="mt-7 space-y-5">
            {[
              {
                name: "Finance",
                value: 3,
                percentage: 75,
                className: "bg-blue-600",
              },
              {
                name: "Human Resources",
                value: 2,
                percentage: 50,
                className: "bg-violet-600",
              },
              {
                name: "Inventory",
                value: 1,
                percentage: 25,
                className: "bg-orange-500",
              },
              {
                name: "Marketing",
                value: 1,
                percentage: 25,
                className: "bg-red-500",
              },
              {
                name: "Sales",
                value: 1,
                percentage: 25,
                className: "bg-green-600",
              },
            ].map((department) => (
              <div key={department.name}>
                <div className="mb-2 flex items-center justify-between">
                  <strong className="text-xs text-slate-700">
                    {department.name}
                  </strong>

                  <span className="text-xs font-bold text-slate-900">
                    {department.value} pending
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${department.className}`}
                    style={{
                      width: `${department.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Recent Decisions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest Founder approval activity
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {recentDecisions.map((decision) => (
              <div
                key={decision.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
              >
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    decision.decision === "Approved"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {decision.decision === "Approved" ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <XCircle size={19} />
                  )}
                </div>

                <div className="min-w-0">
                  <strong className="block truncate text-sm text-slate-900">
                    {decision.title}
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    {decision.id}
                  </span>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        decision.decision === "Approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {decision.decision}
                    </span>

                    <span className="text-[10px] text-slate-400">
                      {decision.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            View Complete Decision History
            <ArrowRight size={15} />
          </button>
        </article>
      </section>

      {selectedApproval && (
        <>
          <button
            type="button"
            onClick={() => setSelectedApprovalId(null)}
            className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm"
            aria-label="Close approval details"
          />

          <aside className="fixed inset-y-0 right-0 z-[70] w-full max-w-[520px] overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                  Approval Request
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900">
                  Request Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApprovalId(null)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <selectedApproval.icon size={23} />
                </div>

                <div>
                  <span className="text-xs font-bold text-blue-600">
                    {selectedApproval.id}
                  </span>

                  <h3 className="mt-2 text-xl font-black leading-7 text-slate-900">
                    {selectedApproval.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {selectedApproval.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${getPriorityClasses(
                    selectedApproval.priority,
                  )}`}
                >
                  {selectedApproval.priority} Priority
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                    selectedApproval.status,
                  )}`}
                >
                  {selectedApproval.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getDepartmentClasses(
                    selectedApproval.department,
                  )}`}
                >
                  {selectedApproval.department}
                </span>
              </div>

              {selectedApproval.amount && (
                <div className="mt-6 rounded-2xl bg-blue-600 p-5 text-white">
                  <p className="text-xs font-semibold text-blue-100">
                    Requested Amount
                  </p>

                  <h4 className="mt-2 text-3xl font-black">
                    {selectedApproval.amount}
                  </h4>
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailCard
                  icon={UserRound}
                  label="Requested By"
                  value={selectedApproval.requester}
                  description={selectedApproval.requesterRole}
                />

                <DetailCard
                  icon={Building2}
                  label="Department"
                  value={selectedApproval.department}
                  description={selectedApproval.category}
                />

                <DetailCard
                  icon={CalendarDays}
                  label="Submitted"
                  value={selectedApproval.submittedAt}
                  description="Submission timestamp"
                />

                <DetailCard
                  icon={Clock3}
                  label="Due Date"
                  value={selectedApproval.dueDate}
                  description="Decision deadline"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center gap-2">
                  <FileText size={17} className="text-blue-600" />

                  <h4 className="text-sm font-black text-slate-900">
                    Request Notes
                  </h4>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {selectedApproval.notes}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      Supporting Documents
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      {selectedApproval.attachments} files attached
                    </p>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-bold text-blue-600"
                  >
                    View Files
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="decision-note"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Decision Note
                </label>

                <textarea
                  id="decision-note"
                  rows={4}
                  placeholder="Add a note for the requester..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {selectedApproval.status === "Pending" ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      updateApprovalStatus(
                        selectedApproval.id,
                        "Rejected",
                      );
                      setSelectedApprovalId(null);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-600 hover:text-white"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateApprovalStatus(
                        selectedApproval.id,
                        "Approved",
                      );
                      setSelectedApprovalId(null);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                  >
                    <CheckCircle2 size={18} />
                    Approve
                  </button>
                </div>
              ) : (
                <div
                  className={`mt-6 flex items-center gap-3 rounded-2xl border p-4 ${getStatusClasses(
                    selectedApproval.status,
                  )}`}
                >
                  {selectedApproval.status === "Approved" ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    <XCircle size={19} />
                  )}

                  <p className="text-sm font-bold">
                    This request has been{" "}
                    {selectedApproval.status.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Clock3;
  tone: "blue" | "red" | "green" | "orange";
}) {
  const toneClass =
    tone === "red"
      ? "bg-red-50 text-red-600"
      : tone === "green"
        ? "bg-green-50 text-green-600"
        : tone === "orange"
          ? "bg-orange-50 text-orange-600"
          : "bg-blue-50 text-blue-600";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${toneClass}`}
        >
          <Icon size={21} />
        </div>

        <span className="text-3xl font-black text-slate-900">
          {value}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </article>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <Icon size={18} className="text-blue-600" />

      <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <strong className="mt-2 block text-xs leading-5 text-slate-800">
        {value}
      </strong>

      <span className="mt-1 block text-[10px] text-slate-500">
        {description}
      </span>
    </article>
  );
}