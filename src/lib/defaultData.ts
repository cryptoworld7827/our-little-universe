import { SiteData } from "./types";

// This is the content shown the very first time the site loads,
// before anyone has opened /admin to personalize it.
export const defaultData: SiteData = {
  girlfriendName: "My Love",
  yourName: "Me",
  accentColor: "#FF6FA5",
  secondaryColor: "#F4C77A",
  musicUrl: "",

  loadingTagline: "Every love story is beautiful, but ours is my favorite.",

  letterGreeting: "My Dearest,",
  letterBody:
    "From the moment you walked into my life, every ordinary day started to feel like a page from a story worth telling. This little universe is made of every laugh, every quiet moment, and every memory I never want to forget. I built it just for you, so you'd always have a place to come back to and remember how loved you are.",
  letterSignature: "Forever yours",

  gallery: [
    { id: "g1", image: "", caption: "Our first photo together" },
    { id: "g2", image: "", caption: "That perfect sunset" },
    { id: "g3", image: "", caption: "Silly faces" },
  ],

  memories: [
    {
      id: "m1",
      title: "The Day We Met",
      date: "First Chapter",
      description: "A regular day turned into the beginning of everything.",
      image: "",
    },
    {
      id: "m2",
      title: "Our First Date",
      date: "Second Chapter",
      description: "Nervous hands, endless talking, and a night that flew by too fast.",
      image: "",
    },
    {
      id: "m3",
      title: "Today",
      date: "This Chapter",
      description: "Still falling for you, a little more each day.",
      image: "",
    },
  ],

  flowers: [
    { id: "f1", title: "Our First Laugh", message: "The first time you made me laugh until my cheeks hurt." },
    { id: "f2", title: "A Quiet Night", message: "Just the two of us, saying nothing and everything." },
    { id: "f3", title: "A Silly Argument", message: "We fought about something so small, and loved each other anyway." },
    { id: "f4", title: "A Promise", message: "The night we promised to keep choosing each other." },
  ],

  reasons: [
    { id: "r1", text: "The way you laugh at your own jokes before you finish them." },
    { id: "r2", text: "How safe I feel just holding your hand." },
    { id: "r3", text: "The way you remember tiny things I mention once." },
    { id: "r4", text: "Your patience with me, even on my hardest days." },
    { id: "r5", text: "How you make ordinary moments feel like adventures." },
    { id: "r6", text: "Simply, all of you." },
  ],

  stars: [
    { id: "s1", message: "You are the best thing that has ever happened to me." },
    { id: "s2", message: "I fall for you a little more every single day." },
    { id: "s3", message: "Home isn't a place. It's wherever you are." },
    { id: "s4", message: "Thank you for choosing me, over and over again." },
    { id: "s5", message: "You make the ordinary feel magical." },
    { id: "s6", message: "I promise to always be your safe place." },
  ],

  endingTitle: "This Is Just The Beginning",
  endingMessage:
    "Our universe is still being written, one memory at a time. Thank you for being my favorite chapter, my forever plot twist, and my happiest ending — to be continued, always. I love you.",
};
