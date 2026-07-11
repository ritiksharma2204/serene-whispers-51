import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — Signal" },
      { name: "description", content: "Create your Signal account in seconds." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
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
            Say hello privately.
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Set up in under a minute. No phone number required to try the web app.
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
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            It's free and takes less than a minute.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" required placeholder="Alex Rivera" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@signal.app" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="At least 8 characters" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {loading ? "Creating…" : "Create account"}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
