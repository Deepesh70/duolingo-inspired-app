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

export default function OnboardingScreen() {
  const { height, width } = useWindowDimensions();
  const mascotSize = Math.min(width * 0.82, 420);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, { minHeight: Math.max(height, 820) }]}
    >
      <View className="w-full max-w-[548px] flex-1 px-10 pb-10 pt-7">
        <View className="flex-row items-center justify-center">
          <Image
            source={images.mascotLogo}
            contentFit="contain"
            className="h-[86px] w-[100px]"
          />
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
              <View className="absolute bottom-[-9px] right-4 h-5 w-5 rotate-45 bg-[#EDF7FF]" />
            </View>

            <View className="absolute right-1 top-0 z-10 rotate-[8deg] rounded-2xl bg-[#F5F3FF] px-5 py-3">
              <AppText className="text-[20px] leading-[26px] text-lingua-deep-purple">
                ¡Hola!
              </AppText>
              <View className="absolute bottom-[-9px] left-[18px] h-5 w-5 rotate-45 bg-[#F5F3FF]" />
            </View>

            <View className="absolute right-[-4px] top-[118px] z-10 rotate-[8deg] rounded-2xl bg-[#FFF3EC] px-5 py-3">
              <AppText className="text-[20px] leading-[27px] text-error">
                你好!
              </AppText>
              <View className="absolute bottom-[-9px] left-[18px] h-5 w-5 rotate-45 bg-[#FFF3EC]" />
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
          onPress={() => router.push("/sign-up")}
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
  content: {
    flexGrow: 1,
    alignItems: "center",
  },
  button: {
    borderCurve: "continuous",
    boxShadow: "0 5px 0 #4B2FE0",
  },
});
