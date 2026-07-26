"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileBarChart,
  FileText,
  Gift,
  Globe2,
  Heart,
  IndianRupee,
  LayoutDashboard,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Newspaper,
  PackageSearch,
  Percent,
  Phone,
  PieChart,
  Plus,
  Radio,
  RefreshCcw,
  Search,
  Send,
  Settings2,
  Share2,
  ShoppingBag,
  Sparkles,
  Store,
  Tags,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";

type IconType = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type ModuleId =
  | "marketing-dashboard"
  | "marketing-strategy"
  | "campaign-management"
  | "audience-management"
  | "brand-management"
  | "content-marketing"
  | "social-media"
  | "email-marketing"
  | "whatsapp-sms"
  | "seo"
  | "paid-advertising"
  | "influencer-marketing"
  | "affiliate-marketing"
  | "crm-marketing"
  | "retention-marketing"
  | "loyalty-marketing"
  | "product-marketing"
  | "ecommerce-marketing"
  | "market-research"
  | "competitor-analysis"
  | "events-activations"
  | "public-relations"
  | "creative-studio"
  | "media-library"
  | "marketing-budget"
  | "attribution"
  | "marketing-analytics"
  | "marketing-reports"
  | "marketing-settings"
  | "krve-ai-marketing";

type MarketingModule = {
  id: ModuleId;
  title: string;
  description: string;
  icon: IconType;
  items: string[];
};

const modules: MarketingModule[] = [
  {
    id: "marketing-dashboard",
    title: "Marketing Dashboard",
    description: "View complete growth, campaign and channel performance.",
    icon: LayoutDashboard,
    items: [
      "Campaign Revenue",
      "ROAS",
      "Active Campaigns",
      "Audience Reach",
      "Leads Generated",
      "Conversion Rate",
      "Customer Acquisition Cost",
      "Channel Performance",
      "AI Insights",
    ],
  },
  {
    id: "marketing-strategy",
    title: "Marketing Strategy",
    description: "Plan annual, quarterly and campaign-level marketing direction.",
    icon: Target,
    items: [
      "Annual Marketing Plan",
      "Quarterly Marketing Plan",
      "Marketing Objectives",
      "Target Market",
      "Positioning Strategy",
      "Go-to-Market Strategy",
      "Campaign Calendar",
      "Growth Priorities",
      "Marketing Roadmap",
      "Strategy Review",
    ],
  },
  {
    id: "campaign-management",
    title: "Campaign Management",
    description: "Create, launch, monitor and optimise campaigns.",
    icon: Megaphone,
    items: [
      "Campaign Dashboard",
      "Create Campaign",
      "Campaign Brief",
      "Campaign Objectives",
      "Campaign Audience",
      "Campaign Budget",
      "Campaign Channels",
      "Creative Assets",
      "Campaign Approval",
      "Campaign Launch",
      "Campaign Performance",
      "Campaign Archive",
    ],
  },
  {
    id: "audience-management",
    title: "Audience Management",
    description: "Build, segment and activate customer audiences.",
    icon: Users,
    items: [
      "Audience Dashboard",
      "Create Audience",
      "Customer Segments",
      "Lookalike Audiences",
      "Behavioural Audiences",
      "Geographic Audiences",
      "Demographic Audiences",
      "High Intent Audiences",
      "Retargeting Audiences",
      "Audience Exclusions",
      "Audience Sync",
      "Audience Reports",
    ],
  },
  {
    id: "brand-management",
    title: "Brand Management",
    description: "Control brand identity, guidelines and consistency.",
    icon: Trophy,
    items: [
      "Brand Dashboard",
      "Brand Guidelines",
      "Logo Usage",
      "Colour System",
      "Typography",
      "Tone of Voice",
      "Brand Positioning",
      "Brand Messaging",
      "Brand Architecture",
      "Brand Compliance",
      "Brand Assets",
      "Brand Reports",
    ],
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Plan and manage content across all channels.",
    icon: FileText,
    items: [
      "Content Dashboard",
      "Content Calendar",
      "Blog Content",
      "Website Content",
      "Landing Page Content",
      "Product Content",
      "Campaign Copy",
      "Content Approval",
      "Content Publishing",
      "Content Repurposing",
      "Content Performance",
      "Content Archive",
    ],
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Manage social channels, publishing and engagement.",
    icon: Camera,
    items: [
      "Social Dashboard",
      "Instagram",
      "Facebook",
      "LinkedIn",
      "YouTube",
      "X / Twitter",
      "Social Calendar",
      "Post Scheduling",
      "Community Management",
      "Comments & Replies",
      "Social Listening",
      "Social Analytics",
    ],
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description: "Manage newsletters, automation and email campaigns.",
    icon: Mail,
    items: [
      "Email Dashboard",
      "Email Campaigns",
      "Newsletter",
      "Email Templates",
      "Audience Lists",
      "Email Automation",
      "Welcome Series",
      "Abandoned Cart Email",
      "Product Launch Email",
      "A/B Testing",
      "Email Deliverability",
      "Email Reports",
    ],
  },
  {
    id: "whatsapp-sms",
    title: "WhatsApp & SMS",
    description: "Manage direct messaging campaigns and automations.",
    icon: MessageCircle,
    items: [
      "WhatsApp Dashboard",
      "WhatsApp Campaigns",
      "SMS Campaigns",
      "Message Templates",
      "Broadcast Lists",
      "Transactional Messages",
      "Promotional Messages",
      "Automation Flows",
      "Opt-in Management",
      "Delivery Reports",
      "Reply Management",
      "Compliance",
    ],
  },
  {
    id: "seo",
    title: "SEO Management",
    description: "Improve organic visibility, rankings and traffic.",
    icon: Search,
    items: [
      "SEO Dashboard",
      "Keyword Research",
      "Keyword Tracking",
      "On-Page SEO",
      "Technical SEO",
      "Off-Page SEO",
      "Backlink Management",
      "Content SEO",
      "Local SEO",
      "Competitor Keywords",
      "SEO Audit",
      "SEO Reports",
    ],
  },
  {
    id: "paid-advertising",
    title: "Paid Advertising",
    description: "Manage performance marketing across paid channels.",
    icon: MousePointerClick,
    items: [
      "Ads Dashboard",
      "Google Ads",
      "Meta Ads",
      "YouTube Ads",
      "LinkedIn Ads",
      "Marketplace Ads",
      "Campaign Budget",
      "Bid Strategy",
      "Creative Testing",
      "Conversion Tracking",
      "Retargeting",
      "Paid Media Reports",
    ],
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    description: "Manage creators, collaborations and campaign outcomes.",
    icon: Camera,
    items: [
      "Influencer Dashboard",
      "Influencer Database",
      "Influencer Discovery",
      "Outreach",
      "Collaboration Brief",
      "Contracts",
      "Content Approval",
      "Coupon Codes",
      "Affiliate Links",
      "Payment Tracking",
      "Campaign Performance",
      "Influencer Reports",
    ],
  },
  {
    id: "affiliate-marketing",
    title: "Affiliate Marketing",
    description: "Manage partners, links, commissions and performance.",
    icon: Share2,
    items: [
      "Affiliate Dashboard",
      "Affiliate Partners",
      "Affiliate Onboarding",
      "Tracking Links",
      "Coupon Codes",
      "Commission Rules",
      "Sales Tracking",
      "Payout Approval",
      "Payout History",
      "Fraud Checks",
      "Affiliate Performance",
      "Affiliate Reports",
    ],
  },
  {
    id: "crm-marketing",
    title: "CRM Marketing",
    description: "Run lifecycle campaigns using customer data.",
    icon: Heart,
    items: [
      "CRM Dashboard",
      "Lead Nurturing",
      "Customer Journeys",
      "Lifecycle Campaigns",
      "New Customer Campaigns",
      "Repeat Customer Campaigns",
      "VIP Campaigns",
      "Win-back Campaigns",
      "Behaviour Triggers",
      "Journey Automation",
      "Customer Scoring",
      "CRM Reports",
    ],
  },
  {
    id: "retention-marketing",
    title: "Retention Marketing",
    description: "Improve repeat purchases, retention and reactivation.",
    icon: RefreshCcw,
    items: [
      "Retention Dashboard",
      "Repeat Purchase Campaigns",
      "Churn Prevention",
      "Reactivation Campaigns",
      "Win-back Offers",
      "Cohort Campaigns",
      "Customer Frequency",
      "Retention Segments",
      "Personalised Offers",
      "Retention Automation",
      "Retention Analytics",
      "Retention Reports",
    ],
  },
  {
    id: "loyalty-marketing",
    title: "Loyalty Marketing",
    description: "Promote loyalty tiers, points and reward campaigns.",
    icon: Gift,
    items: [
      "Loyalty Campaigns",
      "Tier Promotion",
      "Points Campaigns",
      "Bonus Points",
      "Reward Promotions",
      "Member-Only Offers",
      "Birthday Rewards",
      "Anniversary Rewards",
      "Referral Rewards",
      "Loyalty Automation",
      "Loyalty Analytics",
      "Loyalty Reports",
    ],
  },
  {
    id: "product-marketing",
    title: "Product Marketing",
    description: "Plan launches, positioning and product communication.",
    icon: PackageSearch,
    items: [
      "Product Marketing Dashboard",
      "Product Positioning",
      "Product Messaging",
      "Launch Plan",
      "Launch Calendar",
      "Feature Communication",
      "Product Education",
      "Sales Enablement",
      "Product Campaigns",
      "Customer Feedback",
      "Product Adoption",
      "Product Marketing Reports",
    ],
  },
  {
    id: "ecommerce-marketing",
    title: "E-commerce Marketing",
    description: "Drive store traffic, conversion and revenue.",
    icon: ShoppingBag,
    items: [
      "E-commerce Dashboard",
      "Homepage Campaigns",
      "Collection Promotions",
      "Product Promotions",
      "Cart Campaigns",
      "Checkout Campaigns",
      "Upsell Campaigns",
      "Cross-sell Campaigns",
      "Abandoned Cart Recovery",
      "Flash Sales",
      "Marketplace Promotions",
      "E-commerce Reports",
    ],
  },
  {
    id: "market-research",
    title: "Market Research",
    description: "Study customers, trends, categories and opportunities.",
    icon: PieChart,
    items: [
      "Research Dashboard",
      "Customer Research",
      "Market Size",
      "Category Trends",
      "Consumer Behaviour",
      "Pricing Research",
      "Product Research",
      "Brand Research",
      "Survey Management",
      "Focus Groups",
      "Research Repository",
      "Research Reports",
    ],
  },
  {
    id: "competitor-analysis",
    title: "Competitor Analysis",
    description: "Track competitor strategy, campaigns and positioning.",
    icon: Activity,
    items: [
      "Competitor Dashboard",
      "Competitor Profiles",
      "Price Tracking",
      "Product Tracking",
      "Campaign Tracking",
      "Social Tracking",
      "SEO Comparison",
      "Ad Library",
      "Messaging Comparison",
      "Market Share",
      "SWOT Analysis",
      "Competitor Reports",
    ],
  },
  {
    id: "events-activations",
    title: "Events & Activations",
    description: "Manage online and offline marketing events.",
    icon: CalendarDays,
    items: [
      "Events Dashboard",
      "Event Calendar",
      "Event Planning",
      "Budget",
      "Vendor Coordination",
      "Guest Management",
      "Registration",
      "Promotions",
      "On-ground Activation",
      "Post-event Follow-up",
      "Event ROI",
      "Event Reports",
    ],
  },
  {
    id: "public-relations",
    title: "Public Relations",
    description: "Manage media relations, press and reputation.",
    icon: Newspaper,
    items: [
      "PR Dashboard",
      "Press Releases",
      "Media Database",
      "Media Outreach",
      "Press Coverage",
      "Founder Interviews",
      "Brand Stories",
      "Crisis Communication",
      "Reputation Monitoring",
      "PR Calendar",
      "PR Performance",
      "PR Reports",
    ],
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    description: "Manage design, copy, video and production workflows.",
    icon: WandSparkles,
    items: [
      "Creative Dashboard",
      "Design Requests",
      "Copy Requests",
      "Video Requests",
      "Photography Requests",
      "Creative Briefs",
      "Creative Production",
      "Review & Approval",
      "Version Control",
      "Creative Calendar",
      "Creative Performance",
      "Creative Reports",
    ],
  },
  {
    id: "media-library",
    title: "Media Library",
    description: "Store and organise marketing assets and media files.",
    icon: Video,
    items: [
      "Image Library",
      "Video Library",
      "Audio Library",
      "Brand Assets",
      "Campaign Assets",
      "Product Assets",
      "Influencer Content",
      "Press Assets",
      "File Tags",
      "Usage Rights",
      "Asset Search",
      "Asset Archive",
    ],
  },
  {
    id: "marketing-budget",
    title: "Marketing Budget",
    description: "Plan spend, approvals and channel budgets.",
    icon: CircleDollarSign,
    items: [
      "Budget Dashboard",
      "Annual Budget",
      "Campaign Budget",
      "Channel Budget",
      "Department Budget",
      "Budget Approval",
      "Spend Tracking",
      "Budget Variance",
      "Vendor Payments",
      "Committed Spend",
      "Marketing ROI",
      "Budget Reports",
    ],
  },
  {
    id: "attribution",
    title: "Marketing Attribution",
    description: "Measure channel contribution across the customer journey.",
    icon: MonitorSmartphone,
    items: [
      "Attribution Dashboard",
      "First-touch Attribution",
      "Last-touch Attribution",
      "Multi-touch Attribution",
      "Channel Attribution",
      "Campaign Attribution",
      "Revenue Attribution",
      "Conversion Paths",
      "Assisted Conversions",
      "Offline Attribution",
      "Attribution Models",
      "Attribution Reports",
    ],
  },
  {
    id: "marketing-analytics",
    title: "Marketing Analytics",
    description: "Analyse performance, growth, efficiency and customer response.",
    icon: BarChart3,
    items: [
      "Marketing Performance",
      "Campaign Analytics",
      "Channel Analytics",
      "Audience Analytics",
      "Content Analytics",
      "Social Analytics",
      "SEO Analytics",
      "Paid Media Analytics",
      "Influencer Analytics",
      "Customer Analytics",
      "Funnel Analytics",
      "AI Predictions",
    ],
  },
  {
    id: "marketing-reports",
    title: "Marketing Reports",
    description: "Generate strategy, campaign and channel reports.",
    icon: FileBarChart,
    items: [
      "Executive Marketing Report",
      "Campaign Performance Report",
      "Channel Report",
      "Audience Report",
      "Content Report",
      "Social Media Report",
      "SEO Report",
      "Paid Media Report",
      "Influencer Report",
      "Marketing ROI Report",
      "Attribution Report",
      "Custom Reports",
    ],
  },
  {
    id: "marketing-settings",
    title: "Marketing Settings",
    description: "Configure channels, workflows, approvals and permissions.",
    icon: Settings2,
    items: [
      "Campaign Status",
      "Campaign Approval",
      "Channel Settings",
      "Budget Rules",
      "Audience Rules",
      "UTM Standards",
      "Naming Conventions",
      "Brand Guidelines",
      "Notification Settings",
      "Marketing Roles",
      "Permissions",
      "Integrations",
    ],
  },
  {
    id: "krve-ai-marketing",
    title: "KRVE AI Marketing",
    description: "Use AI for campaigns, content, audiences and optimisation.",
    icon: Sparkles,
    items: [
      "AI Campaign Planner",
      "AI Audience Builder",
      "AI Content Generator",
      "AI Copy Assistant",
      "AI Creative Assistant",
      "AI SEO Assistant",
      "AI Ad Optimiser",
      "AI Budget Recommendation",
      "AI Attribution Insights",
      "AI Trend Prediction",
      "AI Competitor Analysis",
      "AI Marketing Chat Assistant",
    ],
  },
];

const dashboardMetrics = [
  ["Campaign Revenue", "₹7.26L", "Current month", IndianRupee],
  ["ROAS", "4.8x", "Across paid channels", TrendingUp],
  ["Active Campaigns", "11", "4 ending this week", Megaphone],
  ["Audience Reach", "8.4L", "Last 30 days", Users],
];

export default function MarketingManagement() {
  const [selectedModule, setSelectedModule] =
    useState<MarketingModule | null>(null);
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return modules;

    return modules.filter((module) =>
      `${module.title} ${module.description} ${module.items.join(" ")}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  if (selectedModule) {
    return (
      <ModuleWorkspace
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <Hero />

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map(([title, value, note, Icon]) => (
          <MetricCard
            key={String(title)}
            title={String(title)}
            value={String(value)}
            note={String(note)}
            icon={Icon as IconType}
          />
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-500 focus-within:bg-white">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search marketing modules, channels or workflows..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />

          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X size={16} className="text-slate-400" />
            </button>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Complete Marketing Operations
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Tap any card to open its complete marketing workspace.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onOpen={() => setSelectedModule(module)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <Megaphone size={25} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
              Growth Operations
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Marketing Management
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
            Complete enterprise marketing covering strategy, campaigns,
            audiences, brand, content, social media, email, SEO, advertising,
            influencers, research, attribution, analytics and KRVE AI Marketing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">
            <Users size={17} />
            Build Audience
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">
            <Plus size={17} />
            Create Campaign
          </button>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: IconType;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function ModuleCard({
  module,
  onOpen,
}: {
  module: MarketingModule;
  onOpen: () => void;
}) {
  const Icon = module.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group min-h-[220px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-base font-black text-slate-950">
        {module.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          {module.items.length} features
        </span>

        <span className="flex items-center gap-2 text-sm font-bold text-blue-600">
          Open
          <ChevronRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </button>
  );
}

function ModuleWorkspace({
  module,
  onBack,
}: {
  module: MarketingModule;
  onBack: () => void;
}) {
  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-700 p-7 text-white shadow-xl sm:p-9">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Marketing Modules
        </button>

        <div className="mt-7 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <Icon size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                Marketing Workspace
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {module.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              {module.description}
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700">
            <Plus size={17} />
            Create New
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          title="Active Records"
          value="128"
          note="Current module"
          icon={Activity}
        />
        <WorkspaceMetric
          title="Pending Actions"
          value="14"
          note="Require attention"
          icon={BellRing}
        />
        <WorkspaceMetric
          title="Completed"
          value="96%"
          note="Current cycle"
          icon={CheckCircle2}
        />
        <WorkspaceMetric
          title="Reports"
          value="8"
          note="Available exports"
          icon={FileBarChart}
        />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              {module.title} Features
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tap any feature to open its marketing workflow.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">
            <FileBarChart size={17} />
            View Reports
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {module.items.map((item, index) => (
            <FeatureCard key={item} title={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkspaceMetric({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: IconType;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function FeatureCard({
  title,
  index,
}: {
  title: string;
  index: number;
}) {
  const icons: IconType[] = [
    Megaphone,
    Users,
    Target,
    Mail,
    Camera,
    Search,
    MousePointerClick,
    Camera,
    Share2,
    BarChart3,
    Gift,
    Store,
  ];

  const Icon = icons[index % icons.length];

  return (
    <button
      type="button"
      className="group min-h-[175px] rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-950">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Open and manage the complete {title.toLowerCase()} workflow.
      </p>

      <span className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600">
        Open
        <ArrowRight
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}