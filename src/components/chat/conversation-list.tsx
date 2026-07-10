import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/seed";
import { Avatar } from "./avatar";

type Props = {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ConversationList({ conversations, activeId, onSelect }: Props) {
  return (
    <ul className="flex flex-col gap-0.5 px-2 pb-4">
      {conversations.map((c, i) => {
        const active = c.id === activeId;
        return (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => onSelect(c.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                "hover:bg-accent",
                active && "bg-brand-soft hover:bg-brand-soft",
              )}
            >
              <Avatar conversation={c} showStatus />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-sm font-semibold text-foreground",
                      active && "text-brand",
                    )}
                  >
                    {c.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground">{c.lastMessage}</span>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-brand-foreground">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
