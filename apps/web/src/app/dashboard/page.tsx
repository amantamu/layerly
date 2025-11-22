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
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display">Dashboard</h1>
          <p className="text-neutral-600 mt-2">
            Welcome back! Manage your AI workflows.
          </p>
        </div>
        <Link href="/dashboard/editor">
          <Button className="neo-button bg-[var(--color-blue)] text-white hover:brightness-95">
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </Link>
      </div>

      {/* Summary Cards Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Projects Card */}
          <NeoCard className="bg-white">
            <NeoCardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-md bg-[var(--color-blue)]/10 flex items-center justify-center heavy-border">
                  <FolderOpen className="h-5 w-5 text-[var(--color-blue)]" />
                </div>
              </div>
              <NeoCardTitle className="text-2xl font-bold mt-4">24</NeoCardTitle>
              <NeoCardDescription className="text-sm text-neutral-600">
                Total Projects
              </NeoCardDescription>
            </NeoCardHeader>
          </NeoCard>

          {/* Active Workflows Card */}
          <NeoCard className="bg-white">
            <NeoCardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-md bg-[var(--color-pink)]/10 flex items-center justify-center heavy-border">
                  <Workflow className="h-5 w-5 text-[var(--color-pink)]" />
                </div>
              </div>
              <NeoCardTitle className="text-2xl font-bold mt-4">8</NeoCardTitle>
              <NeoCardDescription className="text-sm text-neutral-600">
                Active Workflows
              </NeoCardDescription>
            </NeoCardHeader>
          </NeoCard>

          {/* API Usage Card */}
          <NeoCard className="bg-white">
            <NeoCardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-md bg-[var(--color-yellow)]/40 flex items-center justify-center heavy-border">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <NeoCardTitle className="text-2xl font-bold mt-4">1.2K</NeoCardTitle>
              <NeoCardDescription className="text-sm text-neutral-600">
                API Usage (this month)
              </NeoCardDescription>
            </NeoCardHeader>
          </NeoCard>

          {/* System Status Card */}
          <NeoCard className="bg-white">
            <NeoCardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center heavy-border">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <NeoCardTitle className="text-lg font-bold">Operational</NeoCardTitle>
              </div>
              <NeoCardDescription className="text-sm text-neutral-600">
                System Status
              </NeoCardDescription>
            </NeoCardHeader>
          </NeoCard>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display">Recent Activity</h2>
        </div>
        <NeoCard className="bg-white">
          <NeoCardContent className="p-0">
            <div className="divide-y-2 divide-black">
              {[
                {
                  action: "Created a new workflow",
                  time: "2 hours ago",
                  icon: Plus,
                },
                {
                  action: "Updated project settings",
                  time: "5 hours ago",
                  icon: Activity,
                },
                {
                  action: "Triggered automation run",
                  time: "1 day ago",
                  icon: Workflow,
                },
                {
                  action: "Viewed analytics dashboard",
                  time: "2 days ago",
                  icon: Activity,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-md bg-[var(--color-blue)]/10 flex items-center justify-center heavy-border flex-shrink-0">
                      <Icon className="h-4 w-4 text-[var(--color-blue)]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-neutral-500" />
                        <p className="text-xs text-neutral-500">{item.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </NeoCardContent>
        </NeoCard>
      </section>
    </div>
  );
}
