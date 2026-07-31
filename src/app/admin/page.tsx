"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Upload,
  Music,
  Palette,
  Image as ImageIcon,
  Heart,
  Star,
  Flower2,
  Clock,
  MessageSquareHeart,
  RotateCcw,
  Eye,
  Check,
} from "lucide-react";
import { useSiteData, fileToDataUrl, makeId } from "@/lib/store";
import {
  Memory,
  GalleryPhoto,
  Reason,
  HiddenStarMessage,
  FlowerMemory,
} from "@/lib/types";

type Tab =
  | "general"
  | "letter"
  | "gallery"
  | "timeline"
  | "garden"
  | "reasons"
  | "stars"
  | "ending"
  | "music"
  | "colors";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Heart },
  { id: "letter", label: "Love Letter", icon: MessageSquareHeart },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "garden", label: "Garden", icon: Flower2 },
  { id: "reasons", label: "Reasons", icon: Heart },
  { id: "stars", label: "Star Night", icon: Star },
  { id: "ending", label: "Ending", icon: Heart },
  { id: "music", label: "Music", icon: Music },
  { id: "colors", label: "Colors", icon: Palette },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs uppercase tracking-widest text-cream/50">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-cream/15 bg-midnight-800 px-4 py-2.5 font-body text-sm text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none";

export default function AdminPage() {
  const { data, setData, resetData } = useSiteData();
  const [tab, setTab] = useState<Tab>("general");
  const [savedFlash, setSavedFlash] = useState(false);

  function flashSaved() {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  return (
    <div className="min-h-screen bg-midnight-900 text-cream">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-cream/10 bg-midnight-900/90 px-4 py-4 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-cream/15 px-3 py-1.5 font-body text-xs text-cream/70 hover:text-cream"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <h1 className="font-display text-lg italic sm:text-xl">
            Admin Panel <span className="not-italic">🛠️</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {savedFlash && (
            <span className="flex items-center gap-1 font-body text-xs text-emerald-400">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-body text-xs font-medium text-midnight-900"
          >
            <Eye className="h-3.5 w-3.5" /> Preview Site
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8 lg:flex-row">
        {/* Sidebar tabs */}
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:w-56 lg:flex-shrink-0 lg:flex-col lg:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-left font-body text-sm transition-colors ${
                tab === t.id
                  ? "bg-accent text-midnight-900"
                  : "text-cream/60 hover:bg-cream/5 hover:text-cream"
              }`}
            >
              <t.icon className="h-4 w-4 flex-shrink-0" />
              {t.label}
            </button>
          ))}

          <button
            onClick={() => {
              if (confirm("Reset all content back to the original defaults? This cannot be undone.")) {
                resetData();
              }
            }}
            className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2.5 text-left font-body text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
          >
            <RotateCcw className="h-4 w-4" /> Reset to defaults
          </button>
        </nav>

        {/* Panel content */}
        <div className="flex-1 rounded-2xl border border-cream/10 bg-midnight-800/40 p-5 sm:p-8">
          {tab === "general" && (
            <GeneralTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "letter" && (
            <LetterTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "gallery" && (
            <GalleryTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "timeline" && (
            <TimelineTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "garden" && (
            <GardenTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "reasons" && (
            <ReasonsTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "stars" && (
            <StarsTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "ending" && (
            <EndingTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "music" && (
            <MusicTab data={data} setData={setData} onSave={flashSaved} />
          )}
          {tab === "colors" && (
            <ColorsTab data={data} setData={setData} onSave={flashSaved} />
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Shared prop typing ----------
// Each tab only ever needs the data + setter + a "saved" flash callback,
// never the full context (resetData / isLoaded stay in the parent).
type TabProps = Pick<ReturnType<typeof useSiteData>, "data" | "setData"> & {
  onSave: () => void;
};

function TabHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl italic text-cream">{title}</h2>
      <p className="mt-1 font-body text-sm text-cream/50">{hint}</p>
    </div>
  );
}

// ---------- GENERAL ----------
function GeneralTab({ data, setData, onSave }: TabProps) {
  return (
    <div className="space-y-5">
      <TabHeading
        title="General"
        hint="The basics — who this site is for and the loading screen tagline."
      />
      <Field label="Girlfriend's Name">
        <input
          className={inputClass}
          value={data.girlfriendName}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, girlfriendName: v }));
          }}
          onBlur={onSave}
          placeholder="e.g. Emma"
        />
      </Field>
      <Field label="Your Name">
        <input
          className={inputClass}
          value={data.yourName}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, yourName: v }));
          }}
          onBlur={onSave}
          placeholder="e.g. Alex"
        />
      </Field>
      <Field label="Loading Screen Tagline">
        <textarea
          className={`${inputClass} min-h-[90px]`}
          value={data.loadingTagline}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, loadingTagline: v }));
          }}
          onBlur={onSave}
        />
      </Field>
    </div>
  );
}

// ---------- LOVE LETTER ----------
function LetterTab({ data, setData, onSave }: TabProps) {
  return (
    <div className="space-y-5">
      <TabHeading title="Love Letter" hint="Shown inside the envelope animation." />
      <Field label="Greeting">
        <input
          className={inputClass}
          value={data.letterGreeting}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, letterGreeting: v }));
          }}
          onBlur={onSave}
        />
      </Field>
      <Field label="Letter Body">
        <textarea
          className={`${inputClass} min-h-[180px]`}
          value={data.letterBody}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, letterBody: v }));
          }}
          onBlur={onSave}
        />
      </Field>
      <Field label="Signature">
        <input
          className={inputClass}
          value={data.letterSignature}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, letterSignature: v }));
          }}
          onBlur={onSave}
        />
      </Field>
    </div>
  );
}

// ---------- GALLERY ----------
function GalleryTab({ data, setData, onSave }: TabProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  async function addPhoto(file: File) {
    const image = await fileToDataUrl(file);
    const photo: GalleryPhoto = { id: makeId("g"), image, caption: "" };
    setData((p) => ({ ...p, gallery: [...p.gallery, photo] }));
    onSave();
  }

  function updateCaption(id: string, caption: string) {
    setData((p) => ({
      ...p,
      gallery: p.gallery.map((g) => (g.id === id ? { ...g, caption } : g)),
    }));
  }

  function removePhoto(id: string) {
    setData((p) => ({ ...p, gallery: p.gallery.filter((g) => g.id !== id) }));
    onSave();
  }

  return (
    <div>
      <TabHeading title="Photo Gallery" hint="Upload unlimited polaroid-style photos." />
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={async (e) => {
          const files = e.target.files;
          if (!files) return;
          for (const f of Array.from(files)) {
            await addPhoto(f);
          }
          if (fileInput.current) fileInput.current.value = "";
        }}
      />
      <button
        onClick={() => fileInput.current?.click()}
        className="mb-6 flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-midnight-900"
      >
        <Upload className="h-4 w-4" /> Upload Photos
      </button>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data.gallery.map((photo) => (
          <div key={photo.id} className="rounded-lg border border-cream/10 bg-midnight-900 p-2">
            <div className="aspect-square overflow-hidden rounded bg-midnight-800">
              {photo.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-cream/20">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
            </div>
            <input
              className="mt-2 w-full rounded bg-transparent px-1 py-1 font-body text-xs text-cream/70 placeholder:text-cream/30 focus:outline-none"
              placeholder="Caption..."
              value={photo.caption || ""}
              onChange={(e) => updateCaption(photo.id, e.target.value)}
              onBlur={onSave}
            />
            <button
              onClick={() => removePhoto(photo.id)}
              className="mt-1 flex w-full items-center justify-center gap-1 rounded bg-red-500/10 py-1.5 font-body text-xs text-red-400 hover:bg-red-500/20"
            >
              <Trash2 className="h-3 w-3" /> Delete
            </button>
          </div>
        ))}
      </div>
      {data.gallery.length === 0 && (
        <p className="font-body text-sm text-cream/40">No photos yet — upload some above.</p>
      )}
    </div>
  );
}

// ---------- TIMELINE (Memories) ----------
function TimelineTab({ data, setData, onSave }: TabProps) {
  function update(id: string, patch: Partial<Memory>) {
    setData((p) => ({
      ...p,
      memories: p.memories.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }));
  }

  function remove(id: string) {
    setData((p) => ({ ...p, memories: p.memories.filter((m) => m.id !== id) }));
    onSave();
  }

  function add() {
    const memory: Memory = {
      id: makeId("m"),
      title: "New Memory",
      date: "Date",
      description: "Describe this memory...",
      image: "",
    };
    setData((p) => ({ ...p, memories: [...p.memories, memory] }));
    onSave();
  }

  function move(index: number, dir: -1 | 1) {
    setData((p) => {
      const list = [...p.memories];
      const target = index + dir;
      if (target < 0 || target >= list.length) return p;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...p, memories: list };
    });
    onSave();
  }

  async function uploadImage(id: string, file: File) {
    const image = await fileToDataUrl(file);
    update(id, { image });
    onSave();
  }

  return (
    <div>
      <TabHeading title="Memory Timeline" hint="Add, delete, and reorder the chapters of your story." />
      <button
        onClick={add}
        className="mb-6 flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-midnight-900"
      >
        <Plus className="h-4 w-4" /> Add Memory
      </button>

      <div className="space-y-4">
        {data.memories.map((m, i) => (
          <div key={m.id} className="rounded-lg border border-cream/10 bg-midnight-900 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body text-xs text-cream/40">Memory #{i + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded p-1.5 text-cream/50 hover:bg-cream/5 hover:text-cream disabled:opacity-20"
                  aria-label="Move up"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === data.memories.length - 1}
                  className="rounded p-1.5 text-cream/50 hover:bg-cream/5 hover:text-cream disabled:opacity-20"
                  aria-label="Move down"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="rounded p-1.5 text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={m.title}
                  onChange={(e) => update(m.id, { title: e.target.value })}
                  onBlur={onSave}
                />
              </Field>
              <Field label="Date / Label">
                <input
                  className={inputClass}
                  value={m.date}
                  onChange={(e) => update(m.id, { date: e.target.value })}
                  onBlur={onSave}
                />
              </Field>
            </div>
            <Field label="Description">
              <textarea
                className={`${inputClass} mt-3 min-h-[80px]`}
                value={m.description}
                onChange={(e) => update(m.id, { description: e.target.value })}
                onBlur={onSave}
              />
            </Field>
            <div className="mt-3 flex items-center gap-3">
              {m.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.image} alt="" className="h-14 w-14 rounded object-cover" />
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-cream/15 px-3 py-2 font-body text-xs text-cream/60 hover:text-cream">
                <Upload className="h-3.5 w-3.5" /> Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(m.id, f);
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- GARDEN ----------
function GardenTab({ data, setData, onSave }: TabProps) {
  function update(id: string, patch: Partial<FlowerMemory>) {
    setData((p) => ({
      ...p,
      flowers: p.flowers.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  }
  function remove(id: string) {
    setData((p) => ({ ...p, flowers: p.flowers.filter((f) => f.id !== id) }));
    onSave();
  }
  function add() {
    const flower: FlowerMemory = { id: makeId("f"), title: "New Flower", message: "A sweet memory..." };
    setData((p) => ({ ...p, flowers: [...p.flowers, flower] }));
    onSave();
  }

  return (
    <div>
      <TabHeading title="Memory Garden" hint="Each flower reveals a short memory when clicked." />
      <button
        onClick={add}
        className="mb-6 flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-midnight-900"
      >
        <Plus className="h-4 w-4" /> Add Flower
      </button>
      <div className="space-y-4">
        {data.flowers.map((f, i) => (
          <div key={f.id} className="rounded-lg border border-cream/10 bg-midnight-900 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-body text-xs text-cream/40">Flower #{i + 1}</span>
              <button
                onClick={() => remove(f.id)}
                className="rounded p-1.5 text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Field label="Title">
              <input
                className={inputClass}
                value={f.title}
                onChange={(e) => update(f.id, { title: e.target.value })}
                onBlur={onSave}
              />
            </Field>
            <Field label="Memory / Message">
              <textarea
                className={`${inputClass} mt-3 min-h-[70px]`}
                value={f.message}
                onChange={(e) => update(f.id, { message: e.target.value })}
                onBlur={onSave}
              />
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- REASONS ----------
function ReasonsTab({ data, setData, onSave }: TabProps) {
  function update(id: string, text: string) {
    setData((p) => ({ ...p, reasons: p.reasons.map((r) => (r.id === id ? { ...r, text } : r)) }));
  }
  function remove(id: string) {
    setData((p) => ({ ...p, reasons: p.reasons.filter((r) => r.id !== id) }));
    onSave();
  }
  function add() {
    const reason: Reason = { id: makeId("r"), text: "A new reason I love you..." };
    setData((p) => ({ ...p, reasons: [...p.reasons, reason] }));
    onSave();
  }

  return (
    <div>
      <TabHeading title="Reasons I Love You" hint="Shown as glass cards on the site." />
      <button
        onClick={add}
        className="mb-6 flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-midnight-900"
      >
        <Plus className="h-4 w-4" /> Add Reason
      </button>
      <div className="space-y-3">
        {data.reasons.map((r, i) => (
          <div key={r.id} className="flex items-start gap-3 rounded-lg border border-cream/10 bg-midnight-900 p-3">
            <span className="mt-2.5 font-body text-xs text-cream/30">{i + 1}.</span>
            <textarea
              className={`${inputClass} min-h-[50px] flex-1`}
              value={r.text}
              onChange={(e) => update(r.id, e.target.value)}
              onBlur={onSave}
            />
            <button
              onClick={() => remove(r.id)}
              className="mt-1 rounded p-1.5 text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- STARS ----------
function StarsTab({ data, setData, onSave }: TabProps) {
  function update(id: string, message: string) {
    setData((p) => ({ ...p, stars: p.stars.map((s) => (s.id === id ? { ...s, message } : s)) }));
  }
  function remove(id: string) {
    setData((p) => ({ ...p, stars: p.stars.filter((s) => s.id !== id) }));
    onSave();
  }
  function add() {
    const star: HiddenStarMessage = { id: makeId("s"), message: "A secret message..." };
    setData((p) => ({ ...p, stars: [...p.stars, star] }));
    onSave();
  }

  return (
    <div>
      <TabHeading title="Star Night" hint="Hidden messages revealed when a star is tapped." />
      <button
        onClick={add}
        className="mb-6 flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-midnight-900"
      >
        <Plus className="h-4 w-4" /> Add Star
      </button>
      <div className="space-y-3">
        {data.stars.map((s, i) => (
          <div key={s.id} className="flex items-start gap-3 rounded-lg border border-cream/10 bg-midnight-900 p-3">
            <Star className="mt-2.5 h-4 w-4 flex-shrink-0 text-gold-300" fill="currentColor" />
            <textarea
              className={`${inputClass} min-h-[50px] flex-1`}
              value={s.message}
              onChange={(e) => update(s.id, e.target.value)}
              onBlur={onSave}
            />
            <button
              onClick={() => remove(s.id)}
              className="mt-1 rounded p-1.5 text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- ENDING ----------
function EndingTab({ data, setData, onSave }: TabProps) {
  return (
    <div className="space-y-5">
      <TabHeading title="Ending Message" hint="Revealed when the gift box is opened, with confetti." />
      <Field label="Ending Title">
        <input
          className={inputClass}
          value={data.endingTitle}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, endingTitle: v }));
          }}
          onBlur={onSave}
        />
      </Field>
      <Field label="Ending Message">
        <textarea
          className={`${inputClass} min-h-[160px]`}
          value={data.endingMessage}
          onChange={(e) => {
            const v = e.target.value;
            setData((p) => ({ ...p, endingMessage: v }));
          }}
          onBlur={onSave}
        />
      </Field>
    </div>
  );
}

// ---------- MUSIC ----------
function MusicTab({ data, setData, onSave }: TabProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    const url = await fileToDataUrl(file);
    setData((p) => ({ ...p, musicUrl: url }));
    onSave();
  }

  return (
    <div>
      <TabHeading title="Background Music" hint="Upload an MP3 to play softly in the background." />
      <input
        ref={fileInput}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
      <button
        onClick={() => fileInput.current?.click()}
        className="mb-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-sm font-medium text-midnight-900"
      >
        <Upload className="h-4 w-4" /> Upload Music
      </button>

      {data.musicUrl ? (
        <div className="rounded-lg border border-cream/10 bg-midnight-900 p-4">
          <audio controls src={data.musicUrl} className="w-full" />
          <button
            onClick={() => {
              setData((p) => ({ ...p, musicUrl: "" }));
              onSave();
            }}
            className="mt-3 flex items-center gap-1.5 rounded bg-red-500/10 px-3 py-1.5 font-body text-xs text-red-400 hover:bg-red-500/20"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove Music
          </button>
        </div>
      ) : (
        <p className="font-body text-sm text-cream/40">No music uploaded yet.</p>
      )}
    </div>
  );
}

// ---------- COLORS ----------
function ColorsTab({ data, setData, onSave }: TabProps) {
  const presets = [
    { name: "Blush & Gold", a: "#FF6FA5", b: "#F4C77A" },
    { name: "Lavender Dream", a: "#B48CE0", b: "#F4C77A" },
    { name: "Rose Red", a: "#FF5C7A", b: "#FFD166" },
    { name: "Ocean Night", a: "#5CC8FF", b: "#F4C77A" },
  ];

  return (
    <div className="space-y-6">
      <TabHeading title="Colors" hint="Change the accent colors used across the whole site." />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Primary Accent">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.accentColor}
              onChange={(e) => {
                const v = e.target.value;
                setData((p) => ({ ...p, accentColor: v }));
              }}
              onBlur={onSave}
              className="h-10 w-14 cursor-pointer rounded border border-cream/15 bg-transparent"
            />
            <span className="font-body text-sm text-cream/60">{data.accentColor}</span>
          </div>
        </Field>
        <Field label="Secondary Accent">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.secondaryColor}
              onChange={(e) => {
                const v = e.target.value;
                setData((p) => ({ ...p, secondaryColor: v }));
              }}
              onBlur={onSave}
              className="h-10 w-14 cursor-pointer rounded border border-cream/15 bg-transparent"
            />
            <span className="font-body text-sm text-cream/60">{data.secondaryColor}</span>
          </div>
        </Field>
      </div>

      <div>
        <span className="mb-2 block font-body text-xs uppercase tracking-widest text-cream/50">
          Quick Presets
        </span>
        <div className="flex flex-wrap gap-3">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setData((p) => ({ ...p, accentColor: preset.a, secondaryColor: preset.b }));
                onSave();
              }}
              className="flex items-center gap-2 rounded-full border border-cream/15 px-3 py-2 font-body text-xs text-cream/70 hover:border-cream/30"
            >
              <span className="flex h-4 w-4 overflow-hidden rounded-full">
                <span className="h-full w-1/2" style={{ background: preset.a }} />
                <span className="h-full w-1/2" style={{ background: preset.b }} />
              </span>
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
