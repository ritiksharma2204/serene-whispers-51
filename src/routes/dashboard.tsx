import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Search, PenSquare, Settings, LogOut, User } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { conversations as seed } from "@/lib/seed";
import { ConversationList } from "@/components/chat/conversation-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { Avatar } from "@/components/chat/avatar";
import { useProfile } from "@/lib/profile";



export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Inbox — Signal" },
      { name: "description", content: "Your encrypted Signal inbox." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}


function Dashboard() {
  const [activeId, setActiveId] = useState(seed[0].id);
  const [query, setQuery] = useState("");
  const { profile } = useProfile();
  const me = {
    name: profile.name,
    initials: initialsOf(profile.name),
    color: "oklch(0.55 0.2 262)",
    online: true,
  };


  const filtered = seed.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(query.toLowerCase()),
  );
  const active = seed.find((c) => c.id === activeId) ?? seed[0];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="hidden w-full max-w-[360px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex md:w-[34%]"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <Link to="/"><BrandLogo /></Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              size="icon"
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
              aria-label="New chat"
            >
              <PenSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="rounded-full border-transparent bg-muted pl-9 focus-visible:bg-background"
            />
          </div>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto">
          <ConversationList
            conversations={filtered}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>

        <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-3">
          <Avatar conversation={me} size={36} showStatus />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">{profile.name}</div>
            <div className="truncate text-xs text-muted-foreground">{profile.status}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Settings">

                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/"><LogOut className="mr-2 h-4 w-4" /> Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>

      {/* Chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <ChatWindow key={active.id} conversation={active} />
      </main>
    </div>
  );
}
