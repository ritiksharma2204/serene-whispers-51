import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/seed";

export function Avatar({
  conversation,
  size = 44,
  showStatus = false,
  className,
}: {
  conversation: Pick<Conversation, "initials" | "color" | "online">;
  size?: number;
  showStatus?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <div
        className="flex h-full w-full items-center justify-center rounded-full font-semibold text-white"
        style={{
          background: `linear-gradient(135deg, ${conversation.color}, color-mix(in oklab, ${conversation.color} 60%, white))`,
          fontSize: size * 0.38,
        }}
      >
        {conversation.initials}
      </div>
      {showStatus && conversation.online && (
        <span
          className="absolute right-0 bottom-0 rounded-full border-2 border-background bg-online"
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
      )}
    </div>
  );
}
