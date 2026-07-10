import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Paperclip, Mic, Send, Smile, Phone, Video, MoreVertical, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Conversation, Message } from "@/lib/seed";
import { Avatar } from "./avatar";
import { Button } from "@/components/ui/button";

type Props = {
  conversation: Conversation;
};

export function ChatWindow({ conversation }: Props) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation.id, conversation.messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        from: "me",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-card/60 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Avatar conversation={conversation} size={40} showStatus />
          <div>
            <div className="text-sm font-semibold text-foreground">{conversation.name}</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {conversation.online ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-online" /> Active now
                </>
              ) : (
                "Last seen recently"
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="scrollbar-thin flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <div className="mx-auto mb-4 flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[11px] font-medium text-brand">
            <Lock className="h-3 w-3" /> End-to-end encrypted
          </div>
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                    m.from === "me"
                      ? "rounded-br-md bg-bubble-out text-bubble-out-foreground"
                      : "rounded-bl-md bg-bubble-in text-bubble-in-foreground",
                  )}
                >
                  <div>{m.text}</div>
                  <div
                    className={cn(
                      "mt-1 text-right text-[10px]",
                      m.from === "me"
                        ? "text-bubble-out-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {m.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-border bg-card/60 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-end rounded-2xl border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-brand/40">
            <Button variant="ghost" size="icon" className="text-muted-foreground -ml-1">
              <Smile className="h-5 w-5" />
            </Button>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Write a message…"
              className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button variant="ghost" size="icon" className="text-muted-foreground -mr-1">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          <Button
            size="icon"
            onClick={send}
            className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
