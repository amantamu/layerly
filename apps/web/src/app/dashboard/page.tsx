import Link from "next/link";
import { Button } from "@layerly/ui/button";
import {
  NeoCard,
  NeoCardContent,
  NeoCardDescription,
  NeoCardHeader,
  NeoCardTitle,
} from "@layerly/ui";
import {
  FolderOpen,
  Workflow,
  Activity,
  CheckCircle2,
  Plus,
  Clock,
  Settings,
  BarChart3,
} from "lucide-react";

// Inline component for Summary Card
interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  description?: string;
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  description,
}: SummaryCardProps) {
  return (
    <NeoCard className="bg-white transition-all duration-200 hover:shadow-[4px_8px_0_var(--color-black)] hover:-translate-y-0.5">
      <NeoCardHeader className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`h-12 w-12 rounded-md ${iconBg} flex items-center justify-center heavy-border flex-shrink-0`}
            aria-hidden="true"
          >
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
        <div className="space-y-2">
          <NeoCardDescription className="text-xs uppercase tracking-wider font-semibold text-neutral-600">
            {title}
          </NeoCardDescription>
          <NeoCardTitle className="text-4xl md:text-5xl font-bold font-display leading-none">
            {value}
          </NeoCardTitle>
          {description && (
            <p className="text-xs text-neutral-500 mt-2">{description}</p>
          )}
        </div>
      </NeoCardHeader>
    </NeoCard>
  );
}

// Inline component for Activity Item
interface ActivityItemProps {
  action: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
}

function ActivityItem({ action, time, icon: Icon, iconColor }: ActivityItemProps) {
  return (
    <div
      className="flex items-center gap-4 p-5 hover:bg-[var(--color-yellow)]/20 transition-colors border-l-4 border-black group"
      role="listitem"
    >
      <div className="h-10 w-10 rounded-md bg-[var(--color-blue)]/10 flex items-center justify-center heavy-border flex-shrink-0 group-hover:bg-[var(--color-blue)]/20 transition-colors">
        <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-neutral-900">{action}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <Clock className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
          <time className="text-xs text-neutral-600" dateTime={time}>
            {time}
          </time>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const activityItems = [
    {
      action: "Created a new workflow",
      time: "2 hours ago",
      icon: Plus,
      iconColor: "text-[var(--color-blue)]",
    },
    {
      action: "Updated project settings",
      time: "5 hours ago",
      icon: Settings,
      iconColor: "text-[var(--color-pink)]",
    },
    {
      action: "Triggered automation run",
      time: "1 day ago",
      icon: Workflow,
      iconColor: "text-[var(--color-yellow)]",
    },
    {
      action: "Viewed analytics dashboard",
      time: "2 days ago",
      icon: BarChart3,
      iconColor: "text-[var(--color-blue)]",
    },
  ];

  return (
    <div className="space-y-8" role="main" aria-label="Dashboard">
      {/* Dashboard Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display uppercase tracking-tight">
            Dashboard
          </h1>
          <p className="text-neutral-600 mt-2 text-sm md:text-base">
            Welcome back! Manage your AI workflows.
          </p>
        </div>
        <Link href="/dashboard/editor" aria-label="Create a new workflow">
          <Button className="neo-button bg-[var(--color-blue)] text-white hover:brightness-95 transition-all duration-200 hover:shadow-[4px_8px_0_var(--color-black)] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_4px_0_var(--color-black)]">
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Create Workflow
          </Button>
        </Link>
      </header>

      {/* Summary Cards Section */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Summary Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Projects"
            value={24}
            icon={FolderOpen}
            iconColor="text-[var(--color-blue)]"
            iconBg="bg-[var(--color-blue)]/10"
          />
          <SummaryCard
            title="Active Workflows"
            value={8}
            icon={Workflow}
            iconColor="text-[var(--color-pink)]"
            iconBg="bg-[var(--color-pink)]/10"
          />
          <SummaryCard
            title="API Usage"
            value="1.2K"
            icon={Activity}
            iconColor="text-[var(--color-yellow)]"
            iconBg="bg-[var(--color-yellow)]/40"
            description="This month"
          />
          <SummaryCard
            title="System Status"
            value={
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
                <span className="text-2xl md:text-3xl">Operational</span>
              </span>
            }
            icon={CheckCircle2}
            iconColor="text-green-600"
            iconBg="bg-green-100"
          />
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-4" aria-labelledby="activity-heading">
        <div className="flex items-center justify-between">
          <h2
            id="activity-heading"
            className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight"
          >
            Recent Activity
          </h2>
        </div>
        <NeoCard className="bg-white">
          <NeoCardContent className="p-0">
            <ul className="divide-y-2 divide-black" role="list">
              {activityItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <ActivityItem
                      action={item.action}
                      time={item.time}
                      icon={Icon}
                      iconColor={item.iconColor}
                    />
                  </li>
                );
              })}
            </ul>
          </NeoCardContent>
        </NeoCard>
      </section>
    </div>
  );
}
