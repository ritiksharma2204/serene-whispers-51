import { motion } from "motion/react";
import { LogoMark } from "./brand-logo";
import { Lock, Check } from "lucide-react";

// Original device mockup illustration — a stylized phone showing a chat UI.
export function DeviceMockup({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      <div className="relative mx-auto w-[300px] rounded-[42px] border border-white/20 bg-gradient-to-b from-slate-900 to-slate-800 p-3 shadow-2xl">
        <div className="absolute top-3 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-black/60" />
        <div className="overflow-hidden rounded-[32px] bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 pt-8 pb-3">
            <div className="flex items-center gap-2">
              <LogoMark className="h-6 w-6" />
              <span className="text-sm font-semibold text-foreground">Cypher</span>
            </div>
            <span className="text-[10px] text-muted-foreground">9:41</span>
          </div>
          <div className="space-y-2 p-3">
            {[
              { name: "Ava", msg: "Meeting notes 📎", u: 2, c: "oklch(0.7 0.17 258)" },
              { name: "Noah", msg: "Sounds good, tomorrow", u: 0, c: "oklch(0.75 0.15 150)" },
              { name: "Design Guild", msg: "Priya: pushed tokens", u: 5, c: "oklch(0.75 0.16 45)" },
              { name: "Mira", msg: "Coffee at 3?", u: 0, c: "oklch(0.72 0.16 300)" },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-2 rounded-xl p-2">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ background: r.c }}
                >
                  {r.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-foreground">{r.name}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{r.msg}</div>
                </div>
                {r.u > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-semibold text-brand-foreground">
                    {r.u}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -top-3 -left-8 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-soft"
      >
        <Lock className="h-3.5 w-3.5 text-brand" />
        Encrypted
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -right-6 bottom-16 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-soft"
      >
        <Check className="h-3.5 w-3.5 text-online" />
        Delivered
      </motion.div>
    </motion.div>
  );
}
