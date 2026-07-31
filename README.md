# Our Little Universe ❤️

A premium, cinematic romantic website — built with **Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.**

The entire site is editable from a built-in **Admin Panel** at `/admin`. You do not need to write or touch any code to personalize it — every name, photo, letter, memory, and color is stored in your browser and edited through simple forms.

---

## 1. What's inside

- **Loading Screen** — animated stars, a glowing moon, a typewriter tagline, and a "Begin Our Story ❤️" button.
- **Envelope & Love Letter** — a sealed envelope that opens into a full letter.
- **Photo Gallery** — polaroid-style, hover animations, click-to-open lightbox, unlimited photos.
- **Memory Timeline** — an animated, alternating timeline of your story.
- **Memory Garden** — flowers that bloom into view; click one to read the memory.
- **Reasons I Love You** — glass cards with hover animation.
- **Star Night** — a twinkling sky where each interactive star reveals a hidden message.
- **Gift Box** — a final confetti burst with your closing message.
- **Ambient effects** — floating hearts, sakura petals, fireflies, a cursor sparkle trail, and a GSAP-drawn "constellation thread" that traces down the page as you scroll.
- **Background music** — upload an MP3, with a floating play/pause control.

Everything above is driven by one content file that lives in your browser's `localStorage`, editable entirely from `/admin`.

---

## 2. Requirements

- [Node.js](https://nodejs.org) version **18.18 or newer** (Node 20 LTS recommended)
- npm (comes with Node.js)

You do **not** need to know how to code to use this project day-to-day — you only need to follow the steps below once to get it running on your computer.

---

## 3. How to run it (one-time setup)

1. **Install Node.js** from [nodejs.org](https://nodejs.org) if you don't already have it.
2. **Open a terminal** in this project folder (the folder containing this README).
3. **Install dependencies** — this downloads everything the project needs:
   ```bash
   npm install
   ```
4. **Start the site**:
   ```bash
   npm run dev
   ```
5. Open your browser to **http://localhost:3000** — that's your site.
6. Open **http://localhost:3000/admin** — that's your admin panel.

To stop the site, go back to the terminal and press `Ctrl + C`.

### Running it again later
You only need to run `npm install` once. After that, any time you want to view or edit the site, just open a terminal in the project folder and run:
```bash
npm run dev
```

---

## 4. Using the Admin Panel (`/admin`)

There's also a small settings (⚙️) icon in the top-left corner of the live site that jumps straight to `/admin`.

The panel is organized into tabs:

| Tab | What you can do |
|---|---|
| **General** | Change her name, your name, and the loading screen message |
| **Love Letter** | Edit the greeting, letter body, and signature shown in the envelope |
| **Gallery** | Upload unlimited photos and captions, delete any photo |
| **Timeline** | Add / delete / reorder (▲▼) memories, each with a title, date, description, and photo |
| **Garden** | Add or delete flower memories (title + short message) |
| **Reasons** | Add, edit, or delete "reasons I love you" cards |
| **Star Night** | Add, edit, or delete hidden star messages |
| **Ending** | Edit the final gift box title and closing message |
| **Music** | Upload or remove background music (MP3) |
| **Colors** | Pick your own accent colors, or choose a ready-made preset |

Every change **saves automatically** to your browser — there is no separate "Save" button to hunt for; a small "Saved ✓" indicator flashes in the top bar whenever a change is stored. Click **Preview Site** any time to see your changes live.

### Important notes about saving
- Your content is stored in **this browser, on this computer**, using `localStorage`. It is **not** uploaded anywhere or shared with anyone.
- If you clear your browser's site data/cookies, or switch to a different browser/computer, your edits won't carry over automatically. If you want a backup, you can use your browser's DevTools to copy the `our-little-universe-data-v1` key from Local Storage.
- There's a **"Reset to defaults"** button in the admin sidebar if you ever want to start over.
- Photos and music are stored as embedded data, so very large files (many high-resolution photos or long songs) can eventually fill up the browser's storage limit (usually 5–10MB). For best results, use compressed photos and a short music clip.

---

## 5. Deploying it online (optional)

If you'd like this to live at a real web address instead of just `localhost`, the easiest option is [Vercel](https://vercel.com) (made by the creators of Next.js):

1. Push this project folder to a GitHub repository.
2. Go to vercel.com, sign in, and click "New Project."
3. Select your repository and click Deploy — no configuration needed.

Note: because content is saved in the browser's `localStorage`, each visitor's browser has its own copy. Whoever opens `/admin` on a given browser/device controls what that browser sees.

---

## 6. Project structure

```
our-little-universe/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, global providers
│   │   ├── page.tsx            # The public site — assembles every section
│   │   ├── globals.css         # Design tokens, glass effect, animations
│   │   └── admin/
│   │       └── page.tsx        # The no-code admin dashboard
│   ├── components/
│   │   ├── LoadingScreen.tsx
│   │   ├── Envelope.tsx
│   │   ├── Gallery.tsx
│   │   ├── Timeline.tsx
│   │   ├── Garden.tsx
│   │   ├── Reasons.tsx
│   │   ├── StarNight.tsx
│   │   ├── GiftBox.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── SmoothScroll.tsx    # Lenis smooth-scroll wrapper
│   │   ├── ConstellationThread.tsx  # GSAP scroll-drawn signature line
│   │   ├── CursorTrail.tsx
│   │   ├── FloatingHearts.tsx
│   │   ├── Fireflies.tsx
│   │   ├── Sakura.tsx
│   │   └── SectionHeading.tsx
│   └── lib/
│       ├── types.ts            # Shape of all editable content
│       ├── defaultData.ts      # First-run default content
│       └── store.tsx           # localStorage-backed React context (the "database")
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### How the "no code" system works, technically
`src/lib/store.tsx` holds one big `SiteData` object in React context. Every field (names, letter text, photo arrays, colors, etc.) is defined in `src/lib/types.ts`. The admin panel (`src/app/admin/page.tsx`) is just a set of forms that call `setData()` to update pieces of that object; every update is immediately written to `window.localStorage`. The public site (`src/app/page.tsx`) reads from the same context, so any admin change appears instantly when you preview the site.

---

## 7. Design notes

- **Palette:** midnight navy background, a blush-pink and warm-gold duo-tone accent (fully customizable in `/admin` → Colors), and a soft cream for text.
- **Type:** Playfair Display (romantic serif) for headings, Jost (clean geometric sans) for body text.
- **Signature motif:** a hand-drawn constellation line (GSAP + ScrollTrigger) threads down the page and draws itself in sync with your scroll position — tying every section together like connected stars, echoing the "universe" theme.

Enjoy building your little universe. ❤️
