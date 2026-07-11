import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  Eye,
  Keyboard,
  Link2,
  Lock,
  LogOut,
  Moon,
  Palette,
  Trash2,
  User,
  Volume2,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/components/theme-toggle";
import { useProfile, usePreferences } from "@/lib/profile";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Signal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const { profile } = useProfile();
  const { prefs, update } = usePreferences();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-5">
          <Button asChild variant="ghost" size="icon" aria-label="Back to inbox">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-sm font-semibold tracking-tight text-foreground">Settings</h1>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-2xl space-y-5 px-5 py-6 pb-16"
      >
        {/* Profile shortcut */}
        <Link to="/profile" className="block">
          <Card className="flex items-center gap-4 border-border/70 p-4 shadow-soft transition hover:bg-muted/50">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand), color-mix(in oklab, var(--brand) 60%, white))",
              }}
            >
              {profile.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">{profile.name}</div>
              <div className="truncate text-xs text-muted-foreground">
                @{profile.username} · {profile.status}
              </div>
            </div>
            <span className="text-xs font-medium text-brand">Edit</span>
          </Card>
        </Link>

        <Section title="Appearance">
          <ToggleRow
            icon={Moon}
            title="Dark mode"
            description="Switch between light and dark themes."
            checked={isDark}
            onCheckedChange={toggle}
          />
          <RowDivider />
          <NavRow
            icon={Palette}
            title="Chat wallpaper"
            description="Personalize the chat background."
            onClick={() => toast("Wallpapers coming soon")}
          />
        </Section>

        <Section title="Privacy">
          <ToggleRow
            icon={Eye}
            title="Read receipts"
            description="Let others know when you've read a message."
            checked={prefs.readReceipts}
            onCheckedChange={(v) => update({ readReceipts: v })}
          />
          <RowDivider />
          <ToggleRow
            icon={Keyboard}
            title="Typing indicators"
            description="Show when you're typing."
            checked={prefs.typingIndicators}
            onCheckedChange={(v) => update({ typingIndicators: v })}
          />
          <RowDivider />
          <ToggleRow
            icon={Link2}
            title="Link previews"
            description="Generate previews for links you send."
            checked={prefs.linkPreviews}
            onCheckedChange={(v) => update({ linkPreviews: v })}
          />
        </Section>

        <Section title="Notifications">
          <ToggleRow
            icon={Bell}
            title="Desktop notifications"
            description="Show alerts for new messages."
            checked={prefs.desktopNotifications}
            onCheckedChange={(v) => update({ desktopNotifications: v })}
          />
          <RowDivider />
          <ToggleRow
            icon={Volume2}
            title="Sounds"
            description="Play a sound for new messages."
            checked={prefs.sounds}
            onCheckedChange={(v) => update({ sounds: v })}
          />
        </Section>

        <Section title="Chats">
          <ToggleRow
            icon={Keyboard}
            title="Enter to send"
            description="Press Enter to send, Shift+Enter for a new line."
            checked={prefs.enterToSend}
            onCheckedChange={(v) => update({ enterToSend: v })}
          />
        </Section>

        <Section title="Account">
          <NavRow
            icon={User}
            title="Edit profile"
            description="Name, username, bio, and contact info."
            to="/profile"
          />
          <RowDivider />
          <NavRow
            icon={Lock}
            title="Change password"
            description="Update your account password."
            onClick={() => toast("Password change isn't wired up yet")}
          />
          <RowDivider />
          <NavRow
            icon={LogOut}
            title="Sign out"
            description="You'll be returned to the landing page."
            to="/"
          />
          <RowDivider />
          <NavRow
            icon={Trash2}
            title="Delete account"
            description="Permanently remove your Signal account."
            danger
            onClick={() => toast.error("Delete account isn't wired up yet")}
          />
        </Section>

        <p className="pt-2 text-center text-xs text-muted-foreground">
          Signal · v1.0.0 · End-to-end encrypted
        </p>
      </motion.main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 px-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      <Card className="divide-border/70 border-border/70 p-0 shadow-soft">
        {children}
      </Card>
    </section>
  );
}

function RowDivider() {
  return <div className="mx-4 h-px bg-border/70" />;
}

function RowShell({
  icon: Icon,
  title,
  description,
  right,
  onClick,
  danger,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  right?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  const clickable = Boolean(onClick);
  const Comp: "button" | "div" = clickable ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={
        "flex w-full items-center gap-4 px-4 py-3 text-left " +
        (clickable ? "transition hover:bg-muted/60" : "")
      }
    >
      <span
        className={
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full " +
          (danger ? "bg-destructive/10 text-destructive" : "bg-brand-soft text-brand")
        }
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={
            "text-sm font-medium " + (danger ? "text-destructive" : "text-foreground")
          }
        >
          {title}
        </div>
        {description && (
          <div className="truncate text-xs text-muted-foreground">{description}</div>
        )}
      </div>
      {right}
    </Comp>
  );
}

function ToggleRow(props: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  const { checked, onCheckedChange, ...rest } = props;
  return (
    <RowShell
      {...rest}
      right={
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={props.title}
        />
      }
    />
  );
}

function NavRow(props: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  to?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  const { to, onClick, ...rest } = props;
  if (to) {
    return (
      <Link to={to} className="block">
        <RowShell {...rest} right={<span className="text-muted-foreground">›</span>} />
      </Link>
    );
  }
  return <RowShell {...rest} onClick={onClick} right={<span className="text-muted-foreground">›</span>} />;
}

