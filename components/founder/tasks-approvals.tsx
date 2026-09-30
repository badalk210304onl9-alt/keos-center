"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  CircleDollarSign,
  Megaphone,
  MoreHorizontal,
  PackageCheck,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  UserRound,
  Users,
  X,
  XCircle,
  type LucideIcon,
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
  requesterId?: string | null;
  submittedAt: string;
  dueDate: string;
  amount?: string;
  priority: ApprovalPriority;
  status: ApprovalStatus;
  icon: LucideIcon;
  attachments: number;
  notes: string;
  decisionNote?: string | null;
  decidedBy?: string | null;
  decidedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type ApiApproval = {
  id?: string;
  title?: string;
  description?: string | null;
  department?: string | null;
  category?: string | null;
  requester?: string | null;
  requester_role?: string | null;
  requesterRole?: string | null;
  requester_id?: string | null;
  requesterId?: string | null;
  amount?: number | string | null;
  currency?: string | null;
  priority?: ApprovalPriority | string | null;
  status?: ApprovalStatus | string | null;
  due_date?: string | null;
  dueDate?: string | null;
  attachments_json?: string | null;
  attachments?: number | string | null;
  notes?: string | null;
  decision_note?: string | null;
  decisionNote?: string | null;
  decided_by?: string | null;
  decidedBy?: string | null;
  decided_at?: string | null;
  decidedAt?: string | null;
  submitted_at?: string | null;
  submittedAt?: string | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

type ApiHistoryItem = {
  id?: string;
  action?: string;
  from_status?: string | null;
  to_status?: string | null;
  note?: string | null;
  actor_id?: string | null;
  created_at?: string;
};

type ApiApprovalsResponse = {
  approvals?: ApiApproval[];
  statistics?: {
    pending?: number;
    approved?: number;
    rejected?: number;
    critical?: number;
    total?: number;
  };
  workloadByDepartment?: Array<{
    department?: string;
    count?: number;
  }>;
  recentDecisions?: Array<{
    id?: string;
    title?: string;
    decision?: string;
    time?: string;
  }>;
  total?: number;
  live?: boolean;
};

type ApiApprovalDetailResponse = {
  approval?: ApiApproval;
  history?: ApiHistoryItem[];
};

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

  if (department === "Human Resources" || department === "HR") {
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

function getApprovalIcon(
  category?: string | null,
  department?: string | null,
): LucideIcon {
  const value = `${category ?? ""} ${department ?? ""}`.toLowerCase();

  if (
    value.includes("payroll") ||
    value.includes("salary") ||
    value.includes("tax") ||
    value.includes("gst")
  ) {
    return BadgeIndianRupee;
  }

  if (
    value.includes("vendor") ||
    value.includes("payment") ||
    value.includes("expense") ||
    value.includes("reimbursement")
  ) {
    return CircleDollarSign;
  }

  if (
    value.includes("inventory") ||
    value.includes("purchase") ||
    value.includes("stock")
  ) {
    return PackageCheck;
  }

  if (value.includes("marketing") || value.includes("campaign")) {
    return Megaphone;
  }

  if (
    value.includes("recruitment") ||
    value.includes("hiring") ||
    value.includes("employee")
  ) {
    return UserCheck;
  }

  if (
    value.includes("sales") ||
    value.includes("discount") ||
    value.includes("order")
  ) {
    return ShoppingBag;
  }

  if (
    value.includes("technology") ||
    value.includes("infrastructure") ||
    value.includes("cloud")
  ) {
    return Building2;
  }

  if (value.includes("influencer")) {
    return Users;
  }

  if (value.includes("compliance")) {
    return ShieldCheck;
  }

  return FileText;
}

function normalizePriority(priority?: string | null): ApprovalPriority {
  if (priority === "Critical") return "Critical";
  if (priority === "High") return "High";
  if (priority === "Medium") return "Medium";
  return "Low";
}

function normalizeStatus(status?: string | null): ApprovalStatus {
  if (status === "Approved") return "Approved";
  if (status === "Rejected") return "Rejected";
  return "Pending";
}

function formatAmount(
  amount: number | string | null | undefined,
  currency?: string | null,
) {
  if (amount === null || amount === undefined || amount === "") {
    return undefined;
  }

  const numericAmount =
    typeof amount === "number"
      ? amount
      : Number(String(amount).replace(/,/g, ""));

  if (!Number.isNaN(numericAmount)) {
    if (!currency || currency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(numericAmount);
    }

    return `${currency} ${numericAmount.toLocaleString("en-IN")}`;
  }

  return String(amount);
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value?: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function parseAttachments(value?: string | number | null) {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.length;
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray(parsed.files)
    ) {
      return parsed.files.length;
    }

    return 0;
  } catch {
    const numeric = Number(value);

    return Number.isNaN(numeric) ? 0 : numeric;
  }
}

function mapApproval(approval: ApiApproval): ApprovalItem {
  return {
    id: approval.id ?? "",
    title: approval.title ?? "Untitled Approval",
    description: approval.description ?? "No description provided.",
    department: approval.department ?? "General",
    category: approval.category ?? "General",
    requester: approval.requester ?? "Unknown Requester",
    requesterRole:
      approval.requester_role ?? approval.requesterRole ?? "Employee",
    requesterId:
      approval.requester_id ?? approval.requesterId ?? null,
    submittedAt: formatDateTime(
      approval.submitted_at ??
        approval.submittedAt ??
        approval.created_at ??
        approval.createdAt,
    ),
    dueDate: formatDate(approval.due_date ?? approval.dueDate),
    amount: formatAmount(approval.amount, approval.currency),
    priority: normalizePriority(approval.priority),
    status: normalizeStatus(approval.status),
    icon: getApprovalIcon(approval.category, approval.department),
    attachments: parseAttachments(
      approval.attachments_json ?? approval.attachments ?? 0,
    ),
    notes: approval.notes ?? "No notes provided.",
    decisionNote:
      approval.decision_note ?? approval.decisionNote ?? null,
    decidedBy: approval.decided_by ?? approval.decidedBy ?? null,
    decidedAt: approval.decided_at ?? approval.decidedAt ?? null,
    createdAt:
      approval.created_at ?? approval.createdAt ?? undefined,
    updatedAt:
      approval.updated_at ?? approval.updatedAt ?? undefined,
  };
}

export default function TasksApprovals() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [activeTab, setActiveTab] =
    useState<ApprovalTab>("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [priorityFilter, setPriorityFilter] =
    useState("All");
  const [selectedApprovalId, setSelectedApprovalId] =
    useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  const [processingApprovalId, setProcessingApprovalId] =
    useState<string | null>(null);
  const [processingBulk, setProcessingBulk] = useState(false);

  const [workloadByDepartment, setWorkloadByDepartment] =
    useState<
      Array<{
        department: string;
        count: number;
      }>
    >([]);

  const [recentDecisions, setRecentDecisions] = useState<
    Array<{
      id: string;
      title: string;
      decision: string;
      time: string;
    }>
  >([]);

  const [selectedHistory, setSelectedHistory] = useState<
    ApiHistoryItem[]
  >([]);

  const [isLoadingDetail, setIsLoadingDetail] =
    useState(false);

  const loadApprovals = useCallback(
    async (showRefreshState = false) => {
      if (showRefreshState) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const response = await fetch(
          "/api/keos/approvals",
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          },
        );

        const payload =
          (await response.json().catch(() => null)) as
            | ApiApprovalsResponse
            | {
                error?: string;
                message?: string;
              }
            | null;

        if (!response.ok) {
          throw new Error(
            payload &&
              "error" in payload &&
              payload.error
              ? payload.error
              : payload &&
                  "message" in payload &&
                  payload.message
                ? payload.message
                : `Failed to load approvals (${response.status})`,
          );
        }

        const data = payload as ApiApprovalsResponse;

        setApprovals(
          Array.isArray(data.approvals)
            ? data.approvals.map(mapApproval)
            : [],
        );

        setWorkloadByDepartment(
          Array.isArray(data.workloadByDepartment)
            ? data.workloadByDepartment
                .map((item) => ({
                  department:
                    item.department ?? "General",
                  count: Number(item.count ?? 0),
                }))
                .filter((item) => item.count > 0)
            : [],
        );

        setRecentDecisions(
          Array.isArray(data.recentDecisions)
            ? data.recentDecisions.map((item) => ({
                id: item.id ?? "",
                title: item.title ?? "Approval",
                decision:
                  item.decision === "Approved"
                    ? "Approved"
                    : "Rejected",
                time: item.time ?? "—",
              }))
            : [],
        );
      } catch (requestError) {
        console.error(
          "KEOS_APPROVALS_LOAD_ERROR",
          requestError,
        );

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load approvals.",
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadApprovals();
  }, [loadApprovals]);

  const departments = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          approvals
            .map((approval) => approval.department)
            .filter(Boolean),
        ),
      ),
    ],
    [approvals],
  );

  const filteredApprovals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return approvals.filter((approval) => {
      const tabMatch =
        activeTab === "All" ||
        approval.status === activeTab;

      const departmentMatch =
        departmentFilter === "All" ||
        approval.department === departmentFilter;

      const priorityMatch =
        priorityFilter === "All" ||
        approval.priority === priorityFilter;

      const searchMatch =
        !query ||
        `${approval.id} ${approval.title} ${approval.description} ${approval.department} ${approval.requester} ${approval.category}`
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

  useEffect(() => {
    if (!selectedApproval) {
      setDecisionNote("");
      setSelectedHistory([]);
      return;
    }

    setDecisionNote(selectedApproval.decisionNote ?? "");
  }, [selectedApproval]);

  const loadApprovalDetail = useCallback(
    async (approvalId: string) => {
      setIsLoadingDetail(true);

      try {
        const response = await fetch(
          `/api/keos/approvals/${encodeURIComponent(
            approvalId,
          )}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          },
        );

        const payload =
          (await response.json().catch(() => null)) as
            | ApiApprovalDetailResponse
            | { error?: string; message?: string }
            | null;

        if (!response.ok) {
          throw new Error(
            payload &&
              "error" in payload &&
              payload.error
              ? payload.error
              : payload &&
                  "message" in payload &&
                  payload.message
                ? payload.message
                : "Unable to load approval details.",
          );
        }

        const data =
          payload as ApiApprovalDetailResponse;

        if (data.approval) {
          const mappedApproval =
            mapApproval(data.approval);

          setApprovals((current) =>
            current.map((approval) =>
              approval.id === approvalId
                ? mappedApproval
                : approval,
            ),
          );
        }

        setSelectedHistory(
          Array.isArray(data.history)
            ? data.history
            : [],
        );
      } catch (requestError) {
        console.error(
          "KEOS_APPROVAL_DETAIL_ERROR",
          requestError,
        );
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (selectedApprovalId) {
      void loadApprovalDetail(selectedApprovalId);
    }
  }, [selectedApprovalId, loadApprovalDetail]);

  async function decideApproval(
    approvalId: string,
    status: "Approved" | "Rejected",
    noteOverride?: string,
  ) {
    if (processingApprovalId) {
      return false;
    }

    setProcessingApprovalId(approvalId);
    setError(null);

    try {
      const endpoint =
        status === "Approved"
          ? `/api/keos/approvals/${encodeURIComponent(
              approvalId,
            )}/approve`
          : `/api/keos/approvals/${encodeURIComponent(
              approvalId,
            )}/reject`;

      const response = await fetch(endpoint, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          decisionNote:
            noteOverride ??
            (approvalId === selectedApprovalId
              ? decisionNote
              : ""),
        }),
      });

      const payload = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            payload?.message ||
            `Unable to ${status.toLowerCase()} approval.`,
        );
      }

      const returnedApproval =
        payload?.approval ?? payload?.data?.approval;

      if (returnedApproval) {
        const mappedApproval =
          mapApproval(returnedApproval);

        setApprovals((current) =>
          current.map((approval) =>
            approval.id === approvalId
              ? mappedApproval
              : approval,
          ),
        );
      } else {
        setApprovals((current) =>
          current.map((approval) =>
            approval.id === approvalId
              ? {
                  ...approval,
                  status,
                  decisionNote:
                    noteOverride ??
                    (approvalId === selectedApprovalId
                      ? decisionNote
                      : ""),
                  decidedAt:
                    new Date().toISOString(),
                }
              : approval,
          ),
        );
      }

      setSelectedRows((current) =>
        current.filter((id) => id !== approvalId),
      );

      if (approvalId === selectedApprovalId) {
        setSelectedApprovalId(null);
      }

      await loadApprovals(true);

      return true;
    } catch (requestError) {
      console.error(
        "KEOS_APPROVAL_DECISION_ERROR",
        requestError,
      );

      setError(
        requestError instanceof Error
          ? requestError.message
          : `Unable to ${status.toLowerCase()} approval.`,
      );

      return false;
    } finally {
      setProcessingApprovalId(null);
    }
  }

  async function approveSelectedRows() {
    if (
      selectedRows.length === 0 ||
      processingBulk
    ) {
      return;
    }

    const pendingIds = selectedRows.filter((id) =>
      approvals.some(
        (approval) =>
          approval.id === id &&
          approval.status === "Pending",
      ),
    );

    if (pendingIds.length === 0) {
      setSelectedRows([]);
      return;
    }

    setProcessingBulk(true);
    setError(null);

    try {
      await Promise.all(
        pendingIds.map(async (approvalId) => {
          const response = await fetch(
            `/api/keos/approvals/${encodeURIComponent(
              approvalId,
            )}/approve`,
            {
              method: "POST",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                decisionNote: "",
              }),
            },
          );

          if (!response.ok) {
            const payload = await response
              .json()
              .catch(() => null);

            throw new Error(
              payload?.error ||
                payload?.message ||
                `Failed to approve ${approvalId}`,
            );
          }
        }),
      );

      setSelectedRows([]);
      await loadApprovals(true);
    } catch (requestError) {
      console.error(
        "KEOS_BULK_APPROVE_ERROR",
        requestError,
      );

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Some approvals could not be approved.",
      );

      await loadApprovals(true);
    } finally {
      setProcessingBulk(false);
    }
  }

  async function rejectSelectedRows() {
    if (
      selectedRows.length === 0 ||
      processingBulk
    ) {
      return;
    }

    const pendingIds = selectedRows.filter((id) =>
      approvals.some(
        (approval) =>
          approval.id === id &&
          approval.status === "Pending",
      ),
    );

    if (pendingIds.length === 0) {
      setSelectedRows([]);
      return;
    }

    setProcessingBulk(true);
    setError(null);

    try {
      await Promise.all(
        pendingIds.map(async (approvalId) => {
          const response = await fetch(
            `/api/keos/approvals/${encodeURIComponent(
              approvalId,
            )}/reject`,
            {
              method: "POST",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                decisionNote: "",
              }),
            },
          );

          if (!response.ok) {
            const payload = await response
              .json()
              .catch(() => null);

            throw new Error(
              payload?.error ||
                payload?.message ||
                `Failed to reject ${approvalId}`,
            );
          }
        }),
      );

      setSelectedRows([]);
      await loadApprovals(true);
    } catch (requestError) {
      console.error(
        "KEOS_BULK_REJECT_ERROR",
        requestError,
      );

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Some approvals could not be rejected.",
      );

      await loadApprovals(true);
    } finally {
      setProcessingBulk(false);
    }
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
      .filter(
        (approval) => approval.status === "Pending",
      )
      .map((approval) => approval.id);

    const allSelected =
      pendingVisibleIds.length > 0 &&
      pendingVisibleIds.every((id) =>
        selectedRows.includes(id),
      );

    if (allSelected) {
      setSelectedRows((currentRows) =>
        currentRows.filter(
          (id) => !pendingVisibleIds.includes(id),
        ),
      );
    } else {
      setSelectedRows((currentRows) =>
        Array.from(
          new Set([
            ...currentRows,
            ...pendingVisibleIds,
          ]),
        ),
      );
    }
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
              `"${String(value).replaceAll(
                '"',
                '""',
              )}"`,
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
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  }

  const maxDepartmentCount = Math.max(
    1,
    ...workloadByDepartment.map(
      (department) => department.count,
    ),
  );

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
              Review, approve and reject financial,
              operational, employee, inventory, sales and
              marketing requests from one centralized
              Founder workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void loadApprovals(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCcw
                size={17}
                className={
                  isRefreshing ? "animate-spin" : ""
                }
              />

              {isRefreshing
                ? "Refreshing..."
                : "Refresh"}
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

      {error && (
        <section className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div className="min-w-0">
              <p className="text-sm font-bold text-red-800">
                Unable to synchronize approvals
              </p>

              <p className="mt-1 text-xs leading-5 text-red-700">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
              aria-label="Close error"
            >
              <X size={17} />
            </button>
          </div>
        </section>
      )}

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
                        (approval) =>
                          approval.status === tab,
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
                <Search
                  size={17}
                  className="text-slate-400"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value,
                    )
                  }
                  placeholder="Search approvals..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery("")
                    }
                    aria-label="Clear search"
                  >
                    <X
                      size={15}
                      className="text-slate-400"
                    />
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
                    setDepartmentFilter(
                      event.target.value,
                    )
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-xs font-semibold text-slate-600 outline-none"
                >
                  {departments.map(
                    (department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department === "All"
                          ? "All Departments"
                          : department}
                      </option>
                    ),
                  )}
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
                    setPriorityFilter(
                      event.target.value,
                    )
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-xs font-semibold text-slate-600 outline-none"
                >
                  <option value="All">
                    All Priorities
                  </option>
                  <option value="Critical">
                    Critical
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">
                    Medium
                  </option>
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
                  onClick={() =>
                    void approveSelectedRows()
                  }
                  disabled={processingBulk}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckCheck size={15} />
                  {processingBulk
                    ? "Processing..."
                    : "Approve"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void rejectSelectedRows()
                  }
                  disabled={processingBulk}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                          approval.status ===
                          "Pending",
                      ).length > 0 &&
                      filteredApprovals
                        .filter(
                          (approval) =>
                            approval.status ===
                            "Pending",
                        )
                        .every((approval) =>
                          selectedRows.includes(
                            approval.id,
                          ),
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-20"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <RefreshCcw
                        size={25}
                        className="animate-spin text-blue-600"
                      />

                      <h3 className="mt-4 text-base font-bold text-slate-800">
                        Loading approvals...
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Synchronizing with KRVE Central
                        API.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredApprovals.length > 0 ? (
                filteredApprovals.map(
                  (approval) => {
                    const ApprovalIcon =
                      approval.icon;

                    return (
                      <tr
                        key={approval.id}
                        className="border-b border-slate-100 text-sm transition hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-5">
                          <input
                            type="checkbox"
                            disabled={
                              approval.status !==
                              "Pending"
                            }
                            checked={selectedRows.includes(
                              approval.id,
                            )}
                            onChange={() =>
                              toggleRow(
                                approval.id,
                              )
                            }
                            className="h-4 w-4 accent-blue-600 disabled:opacity-30"
                          />
                        </td>

                        <td className="px-4 py-5">
                          <div className="flex items-start gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                              <ApprovalIcon
                                size={19}
                              />
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
                            {
                              approval.requesterRole
                            }
                          </span>
                        </td>

                        <td className="px-4 py-5 font-black text-slate-900">
                          {approval.amount ??
                            "—"}
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
                                setSelectedApprovalId(
                                  approval.id,
                                )
                              }
                              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                              aria-label="View approval"
                            >
                              <Eye size={16} />
                            </button>

                            {approval.status ===
                              "Pending" && (
                              <>
                                <button
                                  type="button"
                                  disabled={
                                    processingApprovalId ===
                                    approval.id
                                  }
                                  onClick={() =>
                                    void decideApproval(
                                      approval.id,
                                      "Approved",
                                    )
                                  }
                                  className="grid h-9 w-9 place-items-center rounded-lg border border-green-200 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                  aria-label="Approve"
                                >
                                  {processingApprovalId ===
                                  approval.id ? (
                                    <RefreshCcw
                                      size={16}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Check
                                      size={16}
                                    />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    processingApprovalId ===
                                    approval.id
                                  }
                                  onClick={() =>
                                    void decideApproval(
                                      approval.id,
                                      "Rejected",
                                    )
                                  }
                                  className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                              <MoreHorizontal
                                size={17}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-20"
                  >
                    <div className="text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                        <FileCheck2 size={25} />
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-800">
                        No approvals found
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        {approvals.length === 0
                          ? "There are currently no approval requests in the KRVE system."
                          : "Change the filters or search query to view other requests."}
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
            Last synchronized:{" "}
            {approvals.length > 0
              ? formatDateTime(
                  approvals.reduce(
                    (latest, approval) => {
                      const value =
                        approval.updatedAt ??
                        approval.createdAt;

                      if (!value) {
                        return latest;
                      }

                      if (!latest) {
                        return value;
                      }

                      return new Date(
                        value,
                      ).getTime() >
                        new Date(
                          latest,
                        ).getTime()
                        ? value
                        : latest;
                    },
                    null as string | null,
                  ),
                )
              : "—"}
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
              Pending requests currently assigned to
              the Founder
            </p>
          </div>

          <div className="mt-7 space-y-5">
            {workloadByDepartment.length > 0 ? (
              workloadByDepartment.map(
                (department) => {
                  const percentage = Math.round(
                    (department.count /
                      maxDepartmentCount) *
                      100,
                  );

                  return (
                    <div
                      key={department.department}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <strong className="text-xs text-slate-700">
                          {
                            department.department
                          }
                        </strong>

                        <span className="text-xs font-bold text-slate-900">
                          {department.count} pending
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            department.department ===
                            "Finance"
                              ? "bg-blue-600"
                              : department.department ===
                                  "Human Resources"
                                ? "bg-violet-600"
                                : department.department ===
                                    "Inventory"
                                  ? "bg-orange-500"
                                  : department.department ===
                                      "Marketing"
                                    ? "bg-red-500"
                                    : department.department ===
                                        "Sales"
                                      ? "bg-green-600"
                                      : "bg-slate-500"
                          }`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <Building2
                  size={25}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-bold text-slate-600">
                  No pending workload
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Department workload will appear
                  here when approval requests are
                  created.
                </p>
              </div>
            )}
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
            {recentDecisions.length > 0 ? (
              recentDecisions.map(
                (decision) => (
                  <div
                    key={`${decision.id}-${decision.time}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        decision.decision ===
                        "Approved"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {decision.decision ===
                      "Approved" ? (
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
                            decision.decision ===
                            "Approved"
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
                ),
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <Clock3
                  size={25}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-bold text-slate-600">
                  No decisions yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Approved and rejected requests
                  will appear here.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab("All");
              setSelectedRows([]);
            }}
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
            onClick={() =>
              setSelectedApprovalId(null)
            }
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
                onClick={() =>
                  setSelectedApprovalId(null)
                }
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  {(() => {
                    const SelectedIcon =
                      selectedApproval.icon;

                    return (
                      <SelectedIcon size={23} />
                    );
                  })()}
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
                  description={
                    selectedApproval.requesterRole
                  }
                />

                <DetailCard
                  icon={Building2}
                  label="Department"
                  value={selectedApproval.department}
                  description={
                    selectedApproval.category
                  }
                />

                <DetailCard
                  icon={CalendarDays}
                  label="Submitted"
                  value={
                    selectedApproval.submittedAt
                  }
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
                  <FileText
                    size={17}
                    className="text-blue-600"
                  />

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
                      {selectedApproval.attachments}{" "}
                      files attached
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

              {selectedApproval.status ===
                "Pending" && (
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
                    value={decisionNote}
                    onChange={(event) =>
                      setDecisionNote(
                        event.target.value,
                      )
                    }
                    placeholder="Add a note for the requester..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              )}

              {selectedApproval.status !==
                "Pending" &&
                selectedApproval.decisionNote && (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-2">
                      <FileText
                        size={17}
                        className="text-blue-600"
                      />

                      <h4 className="text-sm font-black text-slate-900">
                        Decision Note
                      </h4>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {
                        selectedApproval.decisionNote
                      }
                    </p>

                    {selectedApproval.decidedAt && (
                      <p className="mt-3 text-[10px] text-slate-400">
                        Decided{" "}
                        {formatDateTime(
                          selectedApproval.decidedAt,
                        )}
                      </p>
                    )}
                  </div>
                )}

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      Audit History
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      {isLoadingDetail
                        ? "Loading history..."
                        : `${selectedHistory.length} recorded events`}
                    </p>
                  </div>

                  {isLoadingDetail && (
                    <RefreshCcw
                      size={16}
                      className="animate-spin text-blue-600"
                    />
                  )}
                </div>

                {!isLoadingDetail &&
                  selectedHistory.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {selectedHistory
                        .slice(0, 8)
                        .map((history) => (
                          <div
                            key={
                              history.id ??
                              `${history.action}-${history.created_at}`
                            }
                            className="rounded-xl bg-slate-50 p-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-bold text-slate-700">
                                {history.action ??
                                  "Activity"}
                              </span>

                              <span className="text-[10px] text-slate-400">
                                {formatDateTime(
                                  history.created_at,
                                )}
                              </span>
                            </div>

                            {(history.from_status ||
                              history.to_status) && (
                              <p className="mt-1 text-[10px] text-slate-500">
                                {history.from_status ??
                                  "—"}{" "}
                                →{" "}
                                {history.to_status ??
                                  "—"}
                              </p>
                            )}

                            {history.note && (
                              <p className="mt-2 text-xs leading-5 text-slate-500">
                                {history.note}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                {!isLoadingDetail &&
                  selectedHistory.length ===
                    0 && (
                    <p className="mt-4 text-xs text-slate-400">
                      No approval history is
                      available.
                    </p>
                  )}
              </div>

              {selectedApproval.status ===
              "Pending" ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={
                      processingApprovalId ===
                      selectedApproval.id
                    }
                    onClick={() =>
                      void decideApproval(
                        selectedApproval.id,
                        "Rejected",
                        decisionNote,
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={18} />

                    {processingApprovalId ===
                    selectedApproval.id
                      ? "Processing..."
                      : "Reject"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      processingApprovalId ===
                      selectedApproval.id
                    }
                    onClick={() =>
                      void decideApproval(
                        selectedApproval.id,
                        "Approved",
                        decisionNote,
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckCircle2 size={18} />

                    {processingApprovalId ===
                    selectedApproval.id
                      ? "Processing..."
                      : "Approve"}
                  </button>
                </div>
              ) : (
                <div
                  className={`mt-6 flex items-center gap-3 rounded-2xl border p-4 ${getStatusClasses(
                    selectedApproval.status,
                  )}`}
                >
                  {selectedApproval.status ===
                  "Approved" ? (
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
  icon: LucideIcon;
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
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <Icon
        size={18}
        className="text-blue-600"
      />

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
