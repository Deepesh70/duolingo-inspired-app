import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

type LanguageState = {
  selectedLanguageId: LanguageCode | null;
  completedLessonIds: string[];
  xp: number;
  streak: number;
  hasHydrated: boolean;
  setSelectedLanguage: (languageId: LanguageCode) => void;
  completeLesson: (lessonId: string, earnedXp: number) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      completedLessonIds: [],
      xp: 0,
      streak: 0,
      hasHydrated: false,
      setSelectedLanguage: (selectedLanguageId) => set({ selectedLanguageId }),
      completeLesson: (lessonId, earnedXp) =>
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) return state;

          return {
            completedLessonIds: [...state.completedLessonIds, lessonId],
            xp: state.xp + earnedXp,
          };
        }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ selectedLanguageId, completedLessonIds, xp, streak }) => ({
        selectedLanguageId,
        completedLessonIds,
        xp,
        streak,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
