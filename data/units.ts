import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "es-basics",
    languageCode: "es",
    order: 1,
    title: "First Conversations",
    description: "Greet someone and introduce yourself.",
    lessonIds: ["es-greetings", "es-introductions"],
  },
  {
    id: "fr-basics",
    languageCode: "fr",
    order: 1,
    title: "First Conversations",
    description: "Say hello and use polite everyday phrases.",
    lessonIds: ["fr-greetings"],
  },
  {
    id: "ja-basics",
    languageCode: "ja",
    order: 1,
    title: "First Conversations",
    description: "Practice greetings for different times of day.",
    lessonIds: ["ja-greetings"],
  },
];
