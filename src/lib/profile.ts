import { useEffect, useState } from "react";

export type Profile = {
  name: string;
  username: string;
  bio: string;
  email: string;
  phone: string;
  status: string;
};

export const defaultProfile: Profile = {
  name: "Alex Rivera",
  username: "alex.rivera",
  bio: "Designing calm software. Coffee, cameras, and long walks.",
  email: "alex@signal.app",
  phone: "+1 (555) 010-2048",
  status: "Available",
};

const KEY = "cypher.profile";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) } as Profile;
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(p: Profile) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("cypher:profile", { detail: p }));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setHydrated(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<Profile>).detail;
      if (detail) setProfile(detail);
    };
    window.addEventListener("cypher:profile", onChange);
    return () => window.removeEventListener("cypher:profile", onChange);
  }, []);

  return { profile, setProfile, hydrated };
}

export type Preferences = {
  readReceipts: boolean;
  typingIndicators: boolean;
  desktopNotifications: boolean;
  sounds: boolean;
  enterToSend: boolean;
  linkPreviews: boolean;
};

export const defaultPreferences: Preferences = {
  readReceipts: true,
  typingIndicators: true,
  desktopNotifications: true,
  sounds: true,
  enterToSend: true,
  linkPreviews: false,
};

const PREF_KEY = "cypher.preferences";

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREF_KEY);
      if (raw) setPrefs({ ...defaultPreferences, ...JSON.parse(raw) });
    } catch {
      // ignore
    }
  }, []);

  const update = (patch: Partial<Preferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(PREF_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { prefs, update };
}
