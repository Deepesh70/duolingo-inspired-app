import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { AppText } from "@/components/ui/app-text";
import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function OnboardingScreen() {
  const { height, width } = useWindowDimensions();
  const mascotSize = Math.min(width * 0.82, 420);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.screen}
      contentContainerStyle={[styles.content, { minHeight: Math.max(height, 820) }]}
    >
      <View className="w-full max-w-[548px] flex-1 px-10 pb-10 pt-7">
        <View className="flex-row items-center justify-center">
          <Image source={images.mascotLogo} contentFit="contain" style={styles.logo} />
          <AppText
            variant="h1"
            className="-ml-5 text-[38px] leading-[46px] tracking-[-1.5px] text-text-primary"
          >
            muolingo
          </AppText>
        </View>

        <View className="pt-14">
          <AppText
            variant="h1"
            className="text-[37px] leading-[51px] tracking-[-1px] text-text-primary"
          >
            Your AI language
          </AppText>
          <AppText
            variant="h1"
            className="text-[37px] leading-[51px] tracking-[-1px] text-lingua-deep-purple"
          >
            teacher.
          </AppText>
          <AppText
            variant="bodyLarge"
            className="pt-4 text-[17px] leading-[30px] text-text-secondary"
          >
            Real conversations, personalized{`\n`}lessons, anytime, anywhere.
          </AppText>
        </View>

        <View className="min-h-[390px] flex-1 items-center justify-end pt-5">
          <View
            className="relative items-center justify-end"
            style={{ width: mascotSize, height: mascotSize }}
          >
            <View className="absolute left-0 top-7 z-10 rotate-[-6deg] rounded-2xl bg-[#EDF7FF] px-5 py-3">
              <AppText className="text-[20px] leading-[26px] text-text-primary">
                Hello!
              </AppText>
              <View style={[styles.speechTail, styles.helloTail]} />
            </View>

            <View className="absolute right-1 top-0 z-10 rotate-[8deg] rounded-2xl bg-[#F5F3FF] px-5 py-3">
              <AppText className="text-[20px] leading-[26px] text-lingua-deep-purple">
                ¡Hola!
              </AppText>
              <View style={[styles.speechTail, styles.holaTail]} />
            </View>

            <View className="absolute right-[-4px] top-[118px] z-10 rotate-[8deg] rounded-2xl bg-[#FFF3EC] px-5 py-3">
              <AppText className="text-[20px] leading-[27px] text-error">
                你好!
              </AppText>
              <View style={[styles.speechTail, styles.chineseTail]} />
            </View>

            <Image
              source={images.mascotWelcome}
              contentFit="contain"
              style={{ width: mascotSize, height: mascotSize }}
            />
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.88}
          onPress={() => router.back()}
          className="h-16 w-full flex-row items-center justify-center rounded-[22px] bg-lingua-deep-purple px-6"
          style={styles.button}
        >
          <AppText variant="h3" className="text-[19px] text-white">
            Get Started
          </AppText>
          <AppText className="absolute right-6 text-[42px] leading-[42px] text-white">
            ›
          </AppText>
        </TouchableOpacity>
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
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 86,
  },
  button: {
    borderCurve: "continuous",
    boxShadow: "0 5px 0 #4B2FE0",
  },
  speechTail: {
    position: "absolute",
    bottom: -9,
    width: 20,
    height: 20,
    transform: [{ rotate: "45deg" }],
  },
  helloTail: {
    right: 16,
    backgroundColor: "#EDF7FF",
  },
  holaTail: {
    left: 18,
    backgroundColor: "#F5F3FF",
  },
  chineseTail: {
    left: 18,
    backgroundColor: "#FFF3EC",
  },
});
