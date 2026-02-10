export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsColors: Record<string, string> = {
  science: "#C4A0FF",
  maths: "#FFD54F",
  language: "#7EC8E3",
  coding: "#FF8EB8",
  history: "#FFB870",
  economics: "#6DD6A3",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const starterCompanions = [
  {
    id: "starter-1",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Introduction to Algebra",
    duration: 30,
    voice: "female",
    style: "casual",
    bookmarked: false,
  },
  {
    id: "starter-2",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "JavaScript Basics for Beginners",
    duration: 45,
    voice: "male",
    style: "casual",
    bookmarked: false,
  },
  {
    id: "starter-3",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "How the Human Body Works",
    duration: 30,
    voice: "female",
    style: "formal",
    bookmarked: false,
  },
];

export const recentSessions = [
  {
    id: "1",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    color: "#C4A0FF",
  },
  {
    id: "2",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    color: "#FFD54F",
  },
  {
    id: "3",
    subject: "language",
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    color: "#7EC8E3",
  },
  {
    id: "4",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    color: "#FF8EB8",
  },
  {
    id: "5",
    subject: "history",
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    color: "#FFB870",
  },
  {
    id: "6",
    subject: "economics",
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    color: "#6DD6A3",
  },
];

export const socials = [
  {
    id: "0",
    title: "x",
    icon: "/icons/x.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Threads",
    icon: "/icons/threads.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    icon: "/icons/instagram.svg",
    url: "#",
  },
  {
    id: "3",
    title: "Discord",
    icon: "/icons/discord.svg",
    url: "#",
  },
];
