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
  Sparkles,
  Video,
  Zap,
  Upload,
  Type,
  Download,
  Check,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-blue)]/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="neo-card bg-[var(--color-yellow)] p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display">
            AI Video Text Layering Made Stupid Simple
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-neutral-800">
            Create styled text overlays, kinetic typography, captions & effects
            instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/dashboard/editor">
              <Button className="neo-button bg-[var(--color-blue)] text-white hover:brightness-95 text-lg px-8 py-4">
                Launch Editor
              </Button>
            </Link>
            <Link href="/dashboard/templates">
              <Button className="neo-button bg-white hover:bg-[var(--color-pink)] hover:text-white text-lg px-8 py-4">
                See Templates
              </Button>
            </Link>
          </div>
          {/* Product Mockup Placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="neo-card bg-white p-4 aspect-video flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <Video className="h-16 w-16 mx-auto mb-4" />
                <p className="text-sm font-semibold">Product UI Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <NeoCard className="bg-[var(--color-blue)]/10">
            <NeoCardHeader>
              <div className="h-12 w-12 bg-[var(--color-yellow)] rounded-md flex items-center justify-center mb-4 heavy-border">
                <Zap className="h-6 w-6" />
              </div>
              <NeoCardTitle className="text-xl font-bold">
                Instant Text Effects
              </NeoCardTitle>
            </NeoCardHeader>
            <NeoCardContent>
              <NeoCardDescription className="text-neutral-700">
                Auto layered typography, animated captions. No design skills
                needed.
              </NeoCardDescription>
            </NeoCardContent>
          </NeoCard>

          {/* Feature 2 */}
          <NeoCard className="bg-[var(--color-pink)]/10">
            <NeoCardHeader>
              <div className="h-12 w-12 bg-[var(--color-blue)] rounded-md flex items-center justify-center mb-4 heavy-border">
                <Video className="h-6 w-6 text-white" />
              </div>
              <NeoCardTitle className="text-xl font-bold">
                Smart Video Editor
              </NeoCardTitle>
            </NeoCardHeader>
            <NeoCardContent>
              <NeoCardDescription className="text-neutral-700">
                Minimal tweaks: text fix, colors, sizes. Drag and drop
                simplicity.
              </NeoCardDescription>
            </NeoCardContent>
          </NeoCard>

          {/* Feature 3 */}
          <NeoCard className="bg-[var(--color-yellow)]/20">
            <NeoCardHeader>
              <div className="h-12 w-12 bg-[var(--color-pink)] rounded-md flex items-center justify-center mb-4 heavy-border">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <NeoCardTitle className="text-xl font-bold">
                AI Visual Styles
              </NeoCardTitle>
            </NeoCardHeader>
            <NeoCardContent>
              <NeoCardDescription className="text-neutral-700">
                Generate caption / kinetic templates automatically. AI-powered
                creativity.
              </NeoCardDescription>
            </NeoCardContent>
          </NeoCard>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center">
            <div className="neo-card bg-[var(--color-yellow)] w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold">1</span>
            </div>
            <div className="h-16 w-16 mx-auto mb-4 bg-[var(--color-blue)]/20 rounded-md flex items-center justify-center heavy-border">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload your video</h3>
            <p className="text-neutral-600">
              Drag and drop or select your video file. We support all major
              formats.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="neo-card bg-[var(--color-blue)] w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <div className="h-16 w-16 mx-auto mb-4 bg-[var(--color-pink)]/20 rounded-md flex items-center justify-center heavy-border">
              <Type className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Add text or pick an AI style</h3>
            <p className="text-neutral-600">
              Type your text or choose from AI-generated kinetic typography
              templates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="neo-card bg-[var(--color-pink)] w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <div className="h-16 w-16 mx-auto mb-4 bg-[var(--color-yellow)]/40 rounded-md flex items-center justify-center heavy-border">
              <Download className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Export final video</h3>
            <p className="text-neutral-600">
              Download your video with all text layers rendered. Ready to share.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display">
          AI-Generated Video Text Styles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <NeoCard key={i} className="bg-white aspect-video">
              <NeoCardContent className="p-6 h-full flex flex-col items-center justify-center">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
                  <p className="text-sm font-semibold text-neutral-600">
                    Template Style {i}
                  </p>
                </div>
              </NeoCardContent>
            </NeoCard>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/dashboard/templates">
            <Button className="neo-button bg-[var(--color-yellow)] hover:brightness-95">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Pay-As-You-Go */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 font-display">
              Pay-As-You-Go
            </h3>
            <p className="text-center text-neutral-600 mb-8">
              Buy credits. Pay only for videos you create.
            </p>
            <div className="max-w-md mx-auto">
              <NeoCard className="bg-[var(--color-blue)]/10">
                <NeoCardHeader>
                  <NeoCardTitle className="text-2xl font-bold">
                    Credits Pack
                  </NeoCardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-neutral-600 ml-2">/ 100 credits</span>
                  </div>
                </NeoCardHeader>
                <NeoCardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-blue)]" />
                      <span>1 credit = 1 video export</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-blue)]" />
                      <span>Credits never expire</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-blue)]" />
                      <span>No subscription required</span>
                    </li>
                  </ul>
                  <Button className="neo-button w-full bg-[var(--color-blue)] text-white hover:brightness-95">
                    Buy Credits
                  </Button>
                </NeoCardContent>
              </NeoCard>
            </div>
          </div>

          {/* Subscriptions */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 font-display">
              Subscriptions
            </h3>
            <p className="text-center text-neutral-600 mb-8">
              Unlimited exports. Pro text styles. Faster processing.
            </p>
            <div className="max-w-md mx-auto">
              <NeoCard className="bg-[var(--color-yellow)]">
                <NeoCardHeader>
                  <NeoCardTitle className="text-2xl font-bold">
                    Pro Plan
                  </NeoCardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-neutral-800 ml-2">/ month</span>
                  </div>
                </NeoCardHeader>
                <NeoCardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-pink)]" />
                      <span>Unlimited video exports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-pink)]" />
                      <span>Premium AI text styles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-pink)]" />
                      <span>Priority processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--color-pink)]" />
                      <span>Advanced animation presets</span>
                    </li>
                  </ul>
                  <Button className="neo-button w-full bg-[var(--color-pink)] text-white hover:brightness-95">
                    Start Pro Trial
                  </Button>
                </NeoCardContent>
              </NeoCard>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="neo-card bg-[var(--color-pink)] p-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-display">
            Start layering your videos in seconds.
          </h2>
          <Link href="/dashboard/editor">
            <Button className="neo-button bg-white hover:bg-[var(--color-yellow)] text-lg px-8 py-4">
              Launch Editor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Product Column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard/editor"
                    className="text-neutral-600 hover:text-black"
                  >
                    Editor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/templates"
                    className="text-neutral-600 hover:text-black"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/my-projects"
                    className="text-neutral-600 hover:text-black"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/feedback-lab"
                    className="text-neutral-600 hover:text-black"
                  >
                    Feedback Lab
                  </Link>
                </li>
              </ul>
            </div>

            {/* Templates Column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">
                Templates
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard/templates"
                    className="text-neutral-600 hover:text-black"
                  >
                    All Templates
                  </Link>
                </li>
                <li>
                  <span className="text-neutral-600">Kinetic Typography</span>
                </li>
                <li>
                  <span className="text-neutral-600">Caption Styles</span>
                </li>
                <li>
                  <span className="text-neutral-600">AI Generated</span>
                </li>
              </ul>
            </div>

            {/* Pricing Column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">
                Pricing
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard/credits"
                    className="text-neutral-600 hover:text-black"
                  >
                    Credits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/billing"
                    className="text-neutral-600 hover:text-black"
                  >
                    Billing
                  </Link>
                </li>
                <li>
                  <span className="text-neutral-600">Plans</span>
                </li>
              </ul>
            </div>

            {/* Account Column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">
                Account
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard/account"
                    className="text-neutral-600 hover:text-black"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <span className="text-neutral-600">Support</span>
                </li>
                <li>
                  <span className="text-neutral-600">Documentation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm font-bold font-display">LAYERLY</div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-neutral-600 hover:text-black">
                Terms
              </Link>
              <Link href="#" className="text-neutral-600 hover:text-black">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
