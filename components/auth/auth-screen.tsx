import { useState } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { VerificationModal } from "@/components/auth/verification-modal";
import { AppText } from "@/components/ui/app-text";
import { images } from "@/constants/images";
import { colors, fontFamilies } from "@/theme";

type AuthMode = "sign-in" | "sign-up";

type AuthScreenProps = {
  mode: AuthMode;
};

const copy = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today",
    action: "Sign Up",
    footer: "Already have an account?",
    footerAction: "Log in",
    footerRoute: "/sign-in" as const,
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey",
    action: "Sign In",
    footer: "Don't have an account?",
    footerAction: "Sign up",
    footerRoute: "/sign-up" as const,
  },
} as const;

const socialOptions = [
  { name: "Google", icon: "google", color: "#4285F4" },
  { name: "Facebook", icon: "facebook", color: "#1877F2" },
  { name: "Apple", icon: "apple", color: colors.neutral.textPrimary },
] as const;

export function AuthScreen({ mode }: AuthScreenProps) {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const screenCopy = copy[mode];
  const isSignUp = mode === "sign-up";

  return (
    <>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={[styles.content, { minHeight: Math.max(height, isSignUp ? 930 : 850) }]}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[558px] flex-1 px-[43px] pb-10 pt-5">
          <TouchableOpacity
            accessibilityLabel="Go back"
            accessibilityRole="button"
            activeOpacity={0.7}
            className="h-12 w-12 items-start justify-center"
            onPress={() => router.back()}
          >
            <Ionicons color={colors.neutral.textPrimary} name="chevron-back" size={34} />
          </TouchableOpacity>

          <View className="pt-8">
            <AppText variant="h1" className="text-[34px] leading-[43px] tracking-[-0.9px]">
              {screenCopy.title}
            </AppText>
            <AppText variant="bodyLarge" className="pt-4 text-[17px] leading-[28px] text-text-secondary">
              {screenCopy.subtitle}
            </AppText>
          </View>

          <View className="h-[198px] items-center justify-end overflow-hidden">
            <Image source={images.mascotAuth} contentFit="contain" className="h-[245px] w-[245px]" />
          </View>

          <View className="gap-[18px]">
            <View className="h-[112px] justify-center rounded-[22px] border border-border bg-white px-6">
              <AppText variant="bodyMedium" className="pb-2 text-[14px] leading-[19px] text-text-secondary">
                Email
              </AppText>
              <TextInput
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="alex@gmail.com"
                placeholderTextColor={colors.neutral.textPrimary}
                selectionColor={colors.brand.deepPurple}
                style={styles.input}
                value={email}
              />
            </View>

            {isSignUp ? (
              <View className="h-[104px] justify-center rounded-[22px] border border-border bg-white px-6">
                <AppText variant="bodyMedium" className="pb-1 text-[14px] leading-[19px] text-text-secondary">
                  Password
                </AppText>
                <View className="flex-row items-center">
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="new-password"
                    onChangeText={setPassword}
                    placeholder="•••••••••"
                    placeholderTextColor={colors.neutral.textPrimary}
                    secureTextEntry={!passwordVisible}
                    selectionColor={colors.brand.deepPurple}
                    style={[styles.input, styles.passwordInput]}
                    value={password}
                  />
                  <TouchableOpacity
                    accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
                    accessibilityRole="button"
                    activeOpacity={0.65}
                    className="h-11 w-11 items-end justify-center"
                    onPress={() => setPasswordVisible((visible) => !visible)}
                  >
                    <Ionicons
                      color="#69749A"
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                      size={29}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.88}
              className="h-[82px] items-center justify-center rounded-[20px] bg-lingua-deep-purple"
              onPress={() => setVerificationVisible(true)}
              style={styles.primaryButton}
            >
              <AppText variant="h3" className="text-[20px] text-white">
                {screenCopy.action}
              </AppText>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-5 py-[28px]">
            <View className="h-px flex-1 bg-border" />
            <AppText variant="bodyLarge" className="text-[15px] text-text-secondary">
              or continue with
            </AppText>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="gap-3">
            {socialOptions.map((option) => (
              <TouchableOpacity
                key={option.name}
                accessibilityLabel={`Continue with ${option.name}`}
                accessibilityRole="button"
                activeOpacity={0.72}
                className="h-[76px] flex-row items-center rounded-[22px] border border-border bg-white px-12"
              >
                <FontAwesome5 color={option.color} name={option.icon} size={32} />
                <AppText variant="bodyLarge" className="flex-1 text-center text-[16px] text-text-primary">
                  Continue with {option.name}
                </AppText>
                <View className="w-8" />
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex-1 justify-end pt-10">
            <View className="flex-row flex-wrap items-center justify-center gap-1">
              <AppText variant="bodyMedium" className="text-[14px] text-text-secondary">
                {screenCopy.footer}
              </AppText>
              <TouchableOpacity
                accessibilityRole="link"
                activeOpacity={0.65}
                onPress={() => router.replace(screenCopy.footerRoute)}
              >
                <AppText variant="bodyMedium" className="font-poppins-semibold text-[14px] text-lingua-deep-purple">
                  {screenCopy.footerAction}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        email={email}
        onClose={() => setVerificationVisible(false)}
        visible={verificationVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flexGrow: 1,
  },
  input: {
    color: colors.neutral.textPrimary,
    fontFamily: fontFamilies.regular,
    fontSize: 17,
    lineHeight: 25,
    padding: 0,
  },
  passwordInput: {
    flex: 1,
  },
  primaryButton: {
    borderCurve: "continuous",
    boxShadow: "0 3px 0 #4B2FE0",
  },
});
