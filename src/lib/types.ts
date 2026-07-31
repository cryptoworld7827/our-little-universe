// All the shapes of content that the admin panel can edit.
// Everything the visitor sees on the public site is driven by this data,
// which lives in the browser's localStorage (see src/lib/store.tsx).

export interface Memory {
  id: string;
  title: string;
  date: string; // e.g. "14 Feb 2024"
  description: string;
  image?: string; // base64 data URL
}

export interface GalleryPhoto {
  id: string;
  image: string; // base64 data URL
  caption?: string;
}

export interface Reason {
  id: string;
  text: string;
}

export interface HiddenStarMessage {
  id: string;
  message: string;
}

export interface FlowerMemory {
  id: string;
  title: string;
  message: string;
}

export interface SiteData {
  // Global
  girlfriendName: string;
  yourName: string;
  accentColor: string; // hex, drives --accent CSS variable
  secondaryColor: string; // hex, drives --accent2 CSS variable
  musicUrl: string; // base64 audio data URL or empty

  // Loading screen
  loadingTagline: string;

  // Envelope / love letter
  letterGreeting: string;
  letterBody: string;
  letterSignature: string;

  // Gallery
  gallery: GalleryPhoto[];

  // Timeline & Memories
  memories: Memory[];

  // Memory Garden
  flowers: FlowerMemory[];

  // Reasons I love you
  reasons: Reason[];

  // Star Night hidden messages
  stars: HiddenStarMessage[];

  // Gift box / ending
  endingTitle: string;
  endingMessage: string;
}
