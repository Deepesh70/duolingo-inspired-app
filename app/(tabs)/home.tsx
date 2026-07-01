import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/ui/app-text";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { lessons } from "@/data/lessons";
import { units } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";
import { colors } from "@/theme";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const completedLessonIds = useLanguageStore((state) => state.completedLessonIds);
  const xp = useLanguageStore((state) => state.xp);
  const streak = useLanguageStore((state) => state.streak);

  const language = languages.find((item) => item.id === selectedLanguageId) ?? languages[0];
  const languageLessons = lessons
    .filter((lesson) => lesson.languageCode === language.id)
    .sort((a, b) => a.order - b.order);
  const currentLesson =
    languageLessons.find((lesson) => !completedLessonIds.includes(lesson.id)) ??
    languageLessons[languageLessons.length - 1];
  const currentUnit = units.find((unit) => unit.id === currentLesson?.unitId);
  const completedCount = languageLessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id),
  ).length;
  const progress = languageLessons.length ? completedCount / languageLessons.length : 0;
  const firstName = user?.firstName ?? user?.username ?? "Learner";
  const avatarSource = user?.imageUrl ? { uri: user.imageUrl } : images.mascotLogo;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}
    >
      <View className="w-full max-w-[520px] self-center gap-7">
        <View className="flex-row items-center justify-between">
          <View>
            <AppText variant="bodyMedium" className="text-[15px] text-[#7A8197]">
              Good morning,
            </AppText>
            <AppText variant="h2" className="pt-0.5 text-[26px] leading-8">
              {firstName}! 👋
            </AppText>
          </View>

          <TouchableOpacity
            accessibilityLabel="Open profile"
            accessibilityRole="button"
            activeOpacity={0.8}
            className="h-[52px] w-[52px] overflow-hidden rounded-full border-2 border-white bg-[#EEEAFE]"
            onPress={() => router.push("/(tabs)/profile")}
            style={styles.avatar}
          >
            <Image source={avatarSource} contentFit="cover" style={styles.fill} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between rounded-[22px] bg-white px-5 py-4" style={styles.card}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.75}
            className="flex-row items-center gap-3"
            onPress={() => router.push("/language")}
          >
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#F2EFFF]">
              <AppText className="text-[25px] leading-8">{language.flag}</AppText>
            </View>
            <View>
              <AppText variant="caption" className="font-medium uppercase tracking-[1.2px] text-[#8A90A2]">
                Learning
              </AppText>
              <AppText variant="h4" className="text-[16px]">
                {language.name}
              </AppText>
            </View>
          </TouchableOpacity>

          <View className="flex-row gap-5">
            <View className="flex-row items-center gap-1.5">
              <Image source={images.streakFire} contentFit="contain" style={styles.statIcon} />
              <AppText variant="h4" className="text-[15px]">{streak}</AppText>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="flash" size={22} color="#FFC800" />
              <AppText variant="h4" className="text-[15px]">{xp}</AppText>
            </View>
          </View>
        </View>

        <View className="overflow-hidden rounded-[30px] bg-lingua-deep-purple px-6 pb-6 pt-5" style={styles.hero}>
          <View className="flex-row">
            <View className="flex-1 pb-3">
              <View className="self-start rounded-full bg-white/20 px-3 py-1.5">
                <AppText variant="caption" className="font-semibold uppercase tracking-[1px] text-white">
                  {currentUnit?.title ?? "Your course"}
                </AppText>
              </View>
              <AppText variant="h2" className="max-w-[235px] pt-4 text-[24px] leading-[30px] text-white">
                {currentLesson?.title ?? "Start learning"}
              </AppText>
              <AppText variant="bodySmall" className="max-w-[225px] pt-2 text-white/75">
                {currentLesson?.description}
              </AppText>
            </View>
            <Image source={images.mascotWelcome} contentFit="contain" style={styles.mascot} />
          </View>

          <View className="pb-4 pt-1">
            <View className="h-2.5 overflow-hidden rounded-full bg-white/20">
              <View className="h-full rounded-full bg-[#A9F28B]" style={{ width: `${Math.max(progress * 100, 8)}%` }} />
            </View>
            <View className="flex-row justify-between pt-2">
              <AppText variant="caption" className="text-white/70">Course progress</AppText>
              <AppText variant="caption" className="font-semibold text-white">
                {completedCount}/{languageLessons.length} lessons
              </AppText>
            </View>
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.86}
            className="h-[58px] flex-row items-center justify-center gap-2 rounded-[19px] bg-white"
            onPress={() => router.push("/(tabs)/learn")}
          >
            <AppText variant="h4" className="text-[16px] text-lingua-deep-purple">
              Continue learning
            </AppText>
            <Ionicons name="arrow-forward" size={21} color={colors.brand.deepPurple} />
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <AppText variant="h3" className="text-[20px]">Today&apos;s plan</AppText>
            <AppText variant="bodySmall" className="font-medium text-lingua-purple">{currentLesson?.estimatedMinutes ?? 0} min</AppText>
          </View>

          <View className="gap-3">
            <PlanItem icon="book" iconColor="#6C4EF5" iconBackground="#EEEAFE" title={currentLesson?.title ?? "First lesson"} subtitle={`${currentLesson?.estimatedMinutes ?? 0} min · +${currentLesson?.xp ?? 0} XP`} onPress={() => router.push("/(tabs)/learn")} />
            <PlanItem icon="chatbubbles" iconColor="#4D8BFF" iconBackground="#EAF2FF" title="Practice with AI" subtitle="A quick guided conversation" onPress={() => router.push("/(tabs)/chat")} />
            <PlanItem icon="videocam" iconColor="#21C16B" iconBackground="#E9FAF1" title="Meet your AI teacher" subtitle="Build confidence speaking aloud" onPress={() => router.push("/(tabs)/ai-teacher")} />
          </View>
        </View>

        <View className="h-[112px] flex-row items-center overflow-hidden rounded-[26px] bg-[#FFF6DA] px-5">
          <View className="flex-1">
            <AppText variant="h4" className="text-[17px]">Daily goal</AppText>
            <AppText variant="bodySmall" className="pt-1 text-[#747A8D]">Earn {Math.max(20 - xp, 0)} more XP today</AppText>
          </View>
          <Image source={images.treasure} contentFit="contain" style={styles.treasure} />
        </View>
      </View>
    </ScrollView>
  );
}

type PlanItemProps = {
  icon: "book" | "chatbubbles" | "videocam";
  iconColor: string;
  iconBackground: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

function PlanItem({ icon, iconColor, iconBackground, title, subtitle, onPress }: PlanItemProps) {
  return (
    <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} className="min-h-[82px] flex-row items-center rounded-[22px] bg-white px-4 py-3" onPress={onPress} style={styles.card}>
      <View className="h-12 w-12 items-center justify-center rounded-[16px]" style={{ backgroundColor: iconBackground }}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <View className="flex-1 px-3.5">
        <AppText variant="h4" className="text-[15px] leading-5">{title}</AppText>
        <AppText variant="bodySmall" className="pt-0.5 text-[12px] text-[#7A8197]">{subtitle}</AppText>
      </View>
      <View className="h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F8]">
        <Ionicons name="chevron-forward" size={20} color="#8B90A0" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.surface },
  content: { paddingHorizontal: 22, paddingBottom: 32 },
  card: { borderCurve: "continuous", boxShadow: "0 5px 18px rgba(28, 31, 52, 0.055)" },
  avatar: { boxShadow: "0 4px 14px rgba(52, 40, 130, 0.13)" },
  fill: { width: "100%", height: "100%" },
  statIcon: { width: 23, height: 23 },
  hero: { borderCurve: "continuous", boxShadow: "0 12px 26px rgba(91, 59, 246, 0.22)" },
  mascot: { width: 126, height: 138, marginRight: -20, marginTop: -4 },
  treasure: { width: 112, height: 112, marginRight: -12 },
});
