"use client";

// This file is the heart of the "no coding required" admin system.
// It keeps one big SiteData object in React state, and mirrors every
// change straight into the browser's localStorage. The public site
// (src/app/page.tsx) and the admin panel (src/app/admin/page.tsx)
// both read and write through this single context, so anything typed
// or uploaded in /admin instantly reflects on the main site.

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SiteData } from "./types";
import { defaultData } from "./defaultData";

const STORAGE_KEY = "our-little-universe-data-v1";

interface SiteDataContextValue {
  data: SiteData;
  setData: (updater: (prev: SiteData) => SiteData) => void;
  resetData: () => void;
  isLoaded: boolean;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

function loadFromStorage(): SiteData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    // Merge with defaults so newly added fields never crash old saved data.
    return { ...defaultData, ...parsed };
  } catch {
    return defaultData;
  }
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<SiteData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setDataState(loadFromStorage());
    setIsLoaded(true);
  }, []);

  const setData = useCallback((updater: (prev: SiteData) => SiteData) => {
    setDataState((prev) => {
      const next = updater(prev);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Could not save to localStorage (storage may be full):", e);
      }
      return next;
    });
  }, []);

  const resetData = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setDataState(defaultData);
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, setData, resetData, isLoaded }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}

// Helper: turn an uploaded File into a base64 data URL we can store.
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
