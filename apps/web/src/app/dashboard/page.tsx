import { Button } from "@layerly/ui/button";
import {
  NeoBadge,
  NeoCard,
  NeoCardContent,
  NeoCardDescription,
  NeoCardHeader,
  NeoCardTitle,
} from "@layerly/ui";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-[2fr,1.3fr]">
        <NeoCard className="bg-[var(--color-yellow)]">
          <NeoCardHeader>
            <NeoBadge>Creator Mode</NeoBadge>
            <NeoCardTitle className="mt-4 text-3xl md:text-4xl">
              Hey Creator, Ready To Build Something Wild?
            </NeoCardTitle>
            <NeoCardDescription className="mt-2 max-w-xl text-sm text-neutral-800">
              Layer your footage, AI effects, and motion graphics into one
              unapologetically bold timeline. No subtlety allowed.
            </NeoCardDescription>
          </NeoCardHeader>
          <NeoCardContent className="mt-4 flex flex-wrap gap-3">
            <Button className="neo-button bg-[var(--color-blue)] text-white hover:brightness-95">
              Upload Footage
            </Button>
            <Button className="neo-button bg-[var(--color-pink)] text-white hover:brightness-95">
              Generate Effects
            </Button>
            <Button className="neo-button bg-white hover:bg-[var(--color-yellow)]">
              Export Session
            </Button>
          </NeoCardContent>
        </NeoCard>

        <NeoCard className="bg-white">
          <NeoCardHeader>
            <NeoCardTitle className="text-lg">Quick stats</NeoCardTitle>
            <NeoCardDescription className="text-xs">
              {/* TODO: replace with real usage stats from API */}
              Today&apos;s snapshot of your creative chaos.
            </NeoCardDescription>
          </NeoCardHeader>
          <NeoCardContent className="grid grid-cols-3 gap-3 text-xs md:text-sm">
            <div className="neo-card flex flex-col gap-1 bg-[var(--color-blue)]/10 p-3">
              <span className="text-[10px] uppercase tracking-wide text-neutral-600">
                Projects
              </span>
              <span className="text-xl font-bold">12</span>
            </div>
            <div className="neo-card flex flex-col gap-1 bg-[var(--color-pink)]/10 p-3">
              <span className="text-[10px] uppercase tracking-wide text-neutral-600">
                Credits
              </span>
              <span className="text-xl font-bold">420</span>
            </div>
            <div className="neo-card flex flex-col gap-1 bg-[var(--color-yellow)]/40 p-3">
              <span className="text-[10px] uppercase tracking-wide text-neutral-600">
                Renders
              </span>
              <span className="text-xl font-bold">7</span>
            </div>
          </NeoCardContent>
        </NeoCard>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold font-display">Recent Projects</h2>
          {/* TODO: wire up link to full projects list */}
          <button
            type="button"
            className="neo-button bg-white px-3 py-1 text-xs hover:bg-[var(--color-yellow)]"
          >
            View all
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <NeoCard key={i} className="bg-white">
              <NeoCardHeader>
                <NeoCardTitle className="text-sm">
                  Wild Concept #{i}
                </NeoCardTitle>
                <NeoCardDescription className="text-xs">
                  {/* TODO: connect to project metadata */}
                  AI composites, glitch overlays & bold typography.
                </NeoCardDescription>
              </NeoCardHeader>
            </NeoCard>
          ))}
        </div>
      </section>
    </div>
  );
}

