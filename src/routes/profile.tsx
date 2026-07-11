import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { useProfile, saveProfile, type Profile } from "@/lib/profile";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Signal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const statuses = ["Available", "Busy", "Away", "Do not disturb", "Invisible"];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ProfilePage() {
  const { profile, setProfile, hydrated } = useProfile();
  const [draft, setDraft] = useState<Profile | null>(null);

  const current = draft ?? profile;
  const dirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(profile);

  const patch = (p: Partial<Profile>) =>
    setDraft((prev) => ({ ...(prev ?? profile), ...p }));

  const onSave = () => {
    if (!draft) return;
    saveProfile(draft);
    setProfile(draft);
    setDraft(null);
    toast.success("Profile updated");
  };

  const onCancel = () => setDraft(null);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <SettingsHeader title="Profile" />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-2xl px-5 pb-24"
      >
        <Card className="overflow-hidden border-border/70 p-0 shadow-soft">
          <div className="relative h-32 bg-gradient-to-br from-brand to-primary-glow" />
          <div className="-mt-12 px-6 pb-6">
            <div className="flex items-end justify-between">
              <div className="relative">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background text-2xl font-semibold text-white shadow-soft"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand), color-mix(in oklab, var(--brand) 60%, white))",
                  }}
                >
                  {initialsOf(current.name || "?")}
                </div>
                <button
                  type="button"
                  aria-label="Change photo"
                  onClick={() => toast("Photo upload isn't wired up yet")}
                  className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:bg-muted"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {hydrated ? current.name : "…"}
              </h1>
              <p className="text-sm text-muted-foreground">@{current.username}</p>
            </div>
          </div>
        </Card>

        <Card className="mt-5 border-border/70 p-6 shadow-soft">
          <h2 className="text-sm font-semibold text-foreground">About</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            These details are visible to people you chat with.
          </p>

          <div className="mt-5 grid gap-5">
            <Field id="name" label="Display name">
              <Input
                id="name"
                value={current.name}
                onChange={(e) => patch({ name: e.target.value })}
                maxLength={40}
              />
            </Field>

            <Field id="username" label="Username" hint="Others can find you by @username.">
              <Input
                id="username"
                value={current.username}
                onChange={(e) =>
                  patch({ username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, "") })
                }
                maxLength={24}
              />
            </Field>

            <Field id="bio" label="Bio" hint={`${current.bio.length}/140`}>
              <Textarea
                id="bio"
                value={current.bio}
                onChange={(e) => patch({ bio: e.target.value.slice(0, 140) })}
                rows={3}
              />
            </Field>

            <Field id="status" label="Status">
              <Select
                value={current.status}
                onValueChange={(v) => patch({ status: v })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Card>

        <Card className="mt-5 border-border/70 p-6 shadow-soft">
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
          <div className="mt-5 grid gap-5">
            <Field id="email" label="Email">
              <Input
                id="email"
                type="email"
                value={current.email}
                onChange={(e) => patch({ email: e.target.value })}
              />
            </Field>
            <Field id="phone" label="Phone">
              <Input
                id="phone"
                value={current.phone}
                onChange={(e) => patch({ phone: e.target.value })}
              />
            </Field>
          </div>
        </Card>
      </motion.main>

      {dirty && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur"
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3">
            <span className="text-sm text-muted-foreground">Unsaved changes</span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onCancel}>Cancel</Button>
              <Button onClick={onSave} className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Check className="mr-1 h-4 w-4" /> Save changes
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id} className="text-xs font-medium text-foreground">
          {label}
        </Label>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export function SettingsHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-5">
        <Button asChild variant="ghost" size="icon" aria-label="Back to inbox">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-sm font-semibold tracking-tight text-foreground">{title}</h1>
      </div>
    </header>
  );
}
