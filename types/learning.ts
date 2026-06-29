export type LanguageCode = "es" | "fr" | "ja";

export type LessonKind = "practice" | "ai-teacher";

export type ActivityKind =
  | "multiple-choice"
  | "translate"
  | "listen-and-repeat"
  | "speak";

export type Language = {
  id: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
  unitIds: string[];
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessonIds: string[];
};

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
};

export type Phrase = {
  id: string;
  text: string;
  translation: string;
  pronunciation?: string;
};

type ActivityBase = {
  id: string;
  kind: ActivityKind;
  instruction: string;
};

export type MultipleChoiceActivity = ActivityBase & {
  kind: "multiple-choice";
  prompt: string;
  options: string[];
  correctAnswer: string;
};

export type TranslateActivity = ActivityBase & {
  kind: "translate";
  prompt: string;
  acceptedAnswers: string[];
  hint?: string;
};

export type ListenAndRepeatActivity = ActivityBase & {
  kind: "listen-and-repeat";
  phraseId: string;
};

export type SpeakActivity = ActivityBase & {
  kind: "speak";
  phraseId: string;
};

export type LessonActivity =
  | MultipleChoiceActivity
  | TranslateActivity
  | ListenAndRepeatActivity
  | SpeakActivity;

export type AiTeacherPrompt = {
  teacherName: string;
  role: string;
  systemPrompt: string;
  firstMessage: string;
  completionCriteria: string[];
};

export type Lesson = {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  order: number;
  kind: LessonKind;
  title: string;
  description: string;
  estimatedMinutes: number;
  xp: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: LessonActivity[];
  aiTeacherPrompt?: AiTeacherPrompt;
};
