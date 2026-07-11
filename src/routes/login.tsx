import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Signal" },
      { name: "description", content: "Sign in to your Signal account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 500);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-brand p-12 text-brand-foreground lg:flex lg:flex-col lg:justify-between">
        <BrandLogo />
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            Welcome back.<br />Your conversations are waiting.
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Private, encrypted, and instantly synced across all your devices.
          </p>
        </div>
        <div className="text-xs text-white/60">© {new Date().getFullYear()} Signal</div>
      </div>

      <div className="flex flex-col bg-background">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="lg:hidden">
            <BrandLogo />
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-10"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter your details to open your inbox.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@cypher.app" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-brand hover:underline">Forgot?</a>
              </div>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New to Signal?{" "}
            <Link to="/register" className="font-medium text-brand hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
