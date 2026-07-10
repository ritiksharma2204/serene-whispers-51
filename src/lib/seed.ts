export type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: string;
  name: string;
  initials: string;
  color: string;
  online: boolean;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

const palette = [
  "oklch(0.7 0.17 258)",
  "oklch(0.75 0.15 150)",
  "oklch(0.75 0.16 45)",
  "oklch(0.72 0.18 20)",
  "oklch(0.72 0.16 300)",
  "oklch(0.75 0.15 200)",
  "oklch(0.7 0.17 100)",
  "oklch(0.72 0.16 340)",
];

const raw: Omit<Conversation, "color" | "initials">[] = [
  {
    id: "1",
    name: "Ava Mitchell",
    online: true,
    lastMessage: "Just sent the encrypted file — let me know when it decrypts.",
    time: "12:42",
    unread: 2,
    messages: [
      { id: "m1", from: "them", text: "Hey — are you around?", time: "12:38" },
      { id: "m2", from: "me", text: "Yeah, what's up?", time: "12:39", status: "read" },
      { id: "m3", from: "them", text: "Sending you the draft now.", time: "12:40" },
      { id: "m4", from: "them", text: "Just sent the encrypted file — let me know when it decrypts.", time: "12:42" },
    ],
  },
  {
    id: "2",
    name: "Noah Bennett",
    online: false,
    lastMessage: "Sounds good, talk tomorrow 👋",
    time: "11:20",
    unread: 0,
    messages: [
      { id: "m1", from: "me", text: "Wrapping up for tonight.", time: "11:18", status: "read" },
      { id: "m2", from: "them", text: "Sounds good, talk tomorrow 👋", time: "11:20" },
    ],
  },
  {
    id: "3",
    name: "Design Guild",
    online: true,
    lastMessage: "Priya: pushed the new tokens to main",
    time: "10:04",
    unread: 5,
    messages: [
      { id: "m1", from: "them", text: "Kai: anyone reviewing the sidebar spec?", time: "09:50" },
      { id: "m2", from: "me", text: "I'll take a pass this afternoon.", time: "09:55", status: "read" },
      { id: "m3", from: "them", text: "Priya: pushed the new tokens to main", time: "10:04" },
    ],
  },
  {
    id: "4",
    name: "Mira Chen",
    online: true,
    lastMessage: "Coffee at 3?",
    time: "Yesterday",
    unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Coffee at 3?", time: "Yesterday" },
      { id: "m2", from: "me", text: "Only if it's the good place.", time: "Yesterday", status: "delivered" },
    ],
  },
  {
    id: "5",
    name: "Leo Park",
    online: false,
    lastMessage: "Voice message · 0:24",
    time: "Yesterday",
    unread: 1,
    messages: [
      { id: "m1", from: "them", text: "🎙️ Voice message · 0:24", time: "Yesterday" },
    ],
  },
  {
    id: "6",
    name: "Sofia Alvarez",
    online: false,
    lastMessage: "Loved the photos from the trip!",
    time: "Mon",
    unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Loved the photos from the trip!", time: "Mon" },
      { id: "m2", from: "me", text: "Right? The light was unreal.", time: "Mon", status: "read" },
    ],
  },
  {
    id: "7",
    name: "Ethan Rivera",
    online: false,
    lastMessage: "Merged. Rolling out in the morning.",
    time: "Sun",
    unread: 0,
    messages: [
      { id: "m1", from: "me", text: "PR looks solid.", time: "Sun", status: "read" },
      { id: "m2", from: "them", text: "Merged. Rolling out in the morning.", time: "Sun" },
    ],
  },
  {
    id: "8",
    name: "Family",
    online: true,
    lastMessage: "Mom: don't forget Sunday dinner ❤️",
    time: "Sat",
    unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Mom: don't forget Sunday dinner ❤️", time: "Sat" },
    ],
  },
];

export const conversations: Conversation[] = raw.map((c, i) => ({
  ...c,
  color: palette[i % palette.length],
  initials: c.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join(""),
}));
