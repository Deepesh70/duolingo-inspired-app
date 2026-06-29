import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    description: "Learn useful Spanish for everyday conversations.",
    unitIds: ["es-basics"],
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    description: "Start speaking friendly, practical French.",
    unitIds: ["fr-basics"],
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: "Build a foundation for simple Japanese greetings.",
    unitIds: ["ja-basics"],
  },
];
