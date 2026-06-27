import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { AppText } from "@/components/ui/app-text";
import { fontFamilies } from "@/theme";

type VerificationModalProps = {
  email: string;
  visible: boolean;
  onClose: () => void;
};

export function VerificationModal({ email, visible, onClose }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(focusTimer);
    }
  }, [visible]);

  function handleCodeChange(value: string) {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);
    setCode(nextCode);

    if (nextCode.length === 6) {
      Keyboard.dismiss();
      setTimeout(() => router.replace("/"), 120);
    }
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <KeyboardAvoidingView
        behavior={process.env.EXPO_OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View className="mx-5 w-full max-w-[510px] gap-6 rounded-[30px] bg-white px-6 pb-8 pt-7" style={styles.card}>
          <View className="gap-2">
            <AppText variant="h2" className="text-center text-[25px] leading-[34px]">
              Check your email
            </AppText>
            <AppText variant="bodyMedium" className="text-center text-[14px] leading-[23px] text-text-secondary">
              We sent a 6-digit verification code to{`\n`}
              <AppText variant="bodyMedium" className="font-poppins-semibold text-text-primary">
                {email || "your email address"}
              </AppText>
            </AppText>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enter verification code"
            className="relative flex-row justify-between gap-2"
            onPress={() => inputRef.current?.focus()}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <View
                key={index}
                className={`h-[58px] flex-1 items-center justify-center rounded-2xl border ${
                  index === code.length ? "border-lingua-deep-purple" : "border-border"
                } bg-white`}
              >
                <AppText variant="h3" className="text-[21px]">
                  {code[index] ?? ""}
                </AppText>
              </View>
            ))}
            <TextInput
              ref={inputRef}
              accessibilityLabel="Verification code"
              caretHidden
              keyboardType="number-pad"
              maxLength={6}
              onChangeText={handleCodeChange}
              style={styles.hiddenInput}
              textContentType="oneTimeCode"
              value={code}
            />
          </Pressable>

          <AppText variant="bodySmall" className="text-center text-text-secondary">
            Entering the last digit will continue automatically.
          </AppText>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 19, 43, 0.48)",
  },
  card: {
    borderCurve: "continuous",
    boxShadow: "0 16px 44px rgba(13, 19, 43, 0.18)",
  },
  hiddenInput: {
    color: "transparent",
    fontFamily: fontFamilies.regular,
    height: 1,
    left: 0,
    opacity: 0.01,
    position: "absolute",
    top: 0,
    width: 1,
  },
});
