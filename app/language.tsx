import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AppText } from "@/components/ui/app-text";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { colors } from "@/theme";

const learnerCounts: Record<string, string> = {
  es: "28.4M learners",
  fr: "19.4M learners",
  ja: "12.7M learners",
};

export default function LanguageScreen() {
  const [query, setQuery] = useState("");
  const [selectedLanguageId, setSelectedLanguageId] = useState(languages[0]?.id ?? "");

  const filteredLanguages = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) return languages;

    return languages.filter(
      (language) =>
        language.name.toLocaleLowerCase().includes(normalizedQuery) ||
        language.nativeName.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View className="w-full max-w-[520px] flex-1 self-center">
        <View className="h-16 flex-row items-center justify-center">
          <TouchableOpacity
            accessibilityLabel="Go back"
            accessibilityRole="button"
            activeOpacity={0.65}
            className="absolute left-0 h-12 w-12 items-start justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={30} color={colors.neutral.textPrimary} />
          </TouchableOpacity>
          <AppText variant="h3" className="text-[22px] leading-7">
            Choose a language
          </AppText>
        </View>

        <View className="mt-4 h-[58px] flex-row items-center gap-3 rounded-full border border-border bg-surface px-5">
          <Ionicons name="search-outline" size={25} color="#65708C" />
          <TextInput
            accessibilityLabel="Search languages"
            autoCapitalize="none"
            placeholder="Search languages"
            placeholderTextColor="#65708C"
            returnKeyType="search"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <AppText variant="h4" className="pb-4 pt-8 text-[18px] leading-6">
          Popular
        </AppText>

        <View className="gap-1">
          {filteredLanguages.map((language) => {
            const isSelected = language.id === selectedLanguageId;

            return (
              <TouchableOpacity
                key={language.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                activeOpacity={0.78}
                className={`min-h-[92px] flex-row items-center rounded-[24px] border-2 px-4 ${
                  isSelected ? "border-lingua-purple bg-[#F8F7FF]" : "border-[#F4F5F8] bg-white"
                }`}
                onPress={() => setSelectedLanguageId(language.id)}
              >
                <AppText className="w-16 text-center text-[42px] leading-[50px]">
                  {language.flag}
                </AppText>
                <View className="flex-1 pl-3">
                  <AppText variant="h4" className="text-[18px] leading-6">
                    {language.name}
                  </AppText>
                  <AppText variant="bodyMedium" className="pt-1 text-[15px] text-[#65708C]">
                    {learnerCounts[language.id] ?? language.nativeName}
                  </AppText>
                </View>
                <View
                  className={`h-10 w-10 items-center justify-center rounded-full ${
                    isSelected ? "bg-lingua-purple" : "bg-transparent"
                  }`}
                >
                  <Ionicons
                    name={isSelected ? "checkmark" : "chevron-forward"}
                    size={isSelected ? 25 : 24}
                    color={isSelected ? "#FFFFFF" : "#65708C"}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredLanguages.length === 0 ? (
          <AppText variant="bodyLarge" className="py-12 text-center text-text-secondary">
            No languages found
          </AppText>
        ) : null}

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.82}
          className="mt-6 h-[62px] items-center justify-center rounded-[22px] bg-lingua-deep-purple"
          disabled={!selectedLanguageId}
          onPress={() => router.back()}
        >
          <AppText variant="h4" className="text-[17px] text-white">
            Confirm language
          </AppText>
        </TouchableOpacity>

        <Image source={images.earth} contentFit="contain" style={styles.earth} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 0,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: colors.neutral.textPrimary,
  },
  earth: {
    width: "118%",
    height: 220,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: -30,
  },
});
