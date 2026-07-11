import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Lock, MessageCircle, Shield, Users, Zap } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { DeviceMockup } from "@/components/device-mockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Signal — Private, encrypted messaging" },
      {
        name: "description",
        content:
          "Signal is a modern privacy-first messenger with end-to-end encryption, seamless sync, and a beautifully minimal design.",
      },
      { property: "og:title", content: "Signal — Private, encrypted messaging" },
      {
        property: "og:description",
        content: "Modern, private messaging with end-to-end encryption.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <BrandLogo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <a href="#download" className="hover:text-foreground transition-colors">Download</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
              <Link to="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-brand-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-glow blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-28 md:grid-cols-2 md:items-center md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Lock className="h-3.5 w-3.5" /> Private by default
            </div>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Conversations that stay <span className="italic">between you</span>.
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">
              Signal is a modern, privacy-focused messenger. End-to-end encrypted by default,
              beautifully minimal, and fast on every device.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-6 text-brand hover:bg-white/90"
              >
                <Link to="/register">
                  Create account <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/dashboard">Open web app</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Zero data collection</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> Instant sync</div>
            </div>
          </motion.div>

          <div className="relative flex justify-center md:justify-end">
            <DeviceMockup />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for private, everyday conversation.
          </h2>
          <p className="mt-3 text-muted-foreground">
            The small details make a messenger feel like home. We obsessed over every one.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Lock,
              title: "End-to-end encrypted",
              body: "Every message, call, and file is sealed with modern cryptography — only you and the recipient can read it.",
            },
            {
              icon: MessageCircle,
              title: "Beautifully minimal",
              body: "A clean, calm interface that gets out of your way. No ads, no algorithms, no clutter.",
            },
            {
              icon: Users,
              title: "Groups that scale",
              body: "Direct chats, family groups, and team channels — all with the same privacy guarantees.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-primary-glow p-10 text-brand-foreground shadow-brand sm:p-14">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready when you are.
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Sign up in seconds. Bring your friends. Keep your conversations to yourself.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-6 text-brand hover:bg-white/90"
            >
              <Link to="/register">Get Signal free</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <BrandLogo />
          <div>© {new Date().getFullYear()} Signal. Private by design.</div>
        </div>
      </footer>
    </div>
  );
}
