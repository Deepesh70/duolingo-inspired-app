import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { images } from "@/constants/images";
import { colors } from "@/theme";

const primaryColors = [
  { name: "Lingua Purple", value: colors.brand.purple, className: "bg-lingua-purple" },
  {
    name: "Lingua Deep Purple",
    value: colors.brand.deepPurple,
    className: "bg-lingua-deep-purple",
  },
  { name: "Lingua Blue", value: colors.brand.blue, className: "bg-lingua-blue" },
  { name: "Lingua Green", value: colors.brand.green, className: "bg-lingua-green" },
] as const;

const semanticColors = [
  { name: "Success", value: colors.semantic.success, className: "bg-success" },
  { name: "Warning", value: colors.semantic.warning, className: "bg-warning" },
  { name: "Streak", value: colors.semantic.streak, className: "bg-streak" },
  { name: "Error", value: colors.semantic.error, className: "bg-error" },
  { name: "Info", value: colors.semantic.info, className: "bg-info" },
] as const;

const neutralColors = [
  { name: "Text / Primary", value: colors.neutral.textPrimary, className: "bg-text-primary" },
  {
    name: "Text / Secondary",
    value: colors.neutral.textSecondary,
    className: "bg-text-secondary",
  },
  { name: "Border", value: colors.neutral.border, className: "bg-border" },
  { name: "Surface", value: colors.neutral.surface, className: "bg-surface" },
  {
    name: "Background",
    value: colors.neutral.background,
    className: "border border-border bg-background",
  },
] as const;

const typeRows = [
  { label: "H1", use: "Page / Screen Title", size: "32px", weight: "Bold", leading: "1.2", variant: "h1" },
  { label: "H2", use: "Section Title", size: "24px", weight: "SemiBold", leading: "1.3", variant: "h2" },
  { label: "H3", use: "Card / Module Title", size: "20px", weight: "SemiBold", leading: "1.3", variant: "h3" },
  { label: "H4", use: "Subheading", size: "16px", weight: "Medium", leading: "1.4", variant: "h4" },
  { label: "Body Large", use: "Important content", size: "16px", weight: "Regular", leading: "1.6", variant: "bodyLarge" },
  { label: "Body Medium", use: "Body text", size: "14px", weight: "Regular", leading: "1.6", variant: "bodyMedium" },
  { label: "Body Small", use: "Supporting text", size: "13px", weight: "Regular", leading: "1.6", variant: "bodySmall" },
  { label: "Caption", use: "Labels, meta text", size: "11px", weight: "Regular", leading: "1.4", variant: "caption" },
] as const;

type Swatch = (typeof primaryColors)[number] | (typeof semanticColors)[number] | (typeof neutralColors)[number];

function SectionTitle({ children }: { children: string }) {
  return (
    <View className="gap-1">
      <AppText variant="h3" className="uppercase text-lingua-deep-purple">
        {children}
      </AppText>
      <View className="h-px bg-border" />
    </View>
  );
}

function ColorGroup({ title, swatches }: { title: string; swatches: readonly Swatch[] }) {
  return (
    <View className="gap-3">
      <AppText variant="bodySmall" className="uppercase text-text-secondary">
        {title}
      </AppText>
      <View className="flex-row flex-wrap gap-x-7 gap-y-5">
        {swatches.map((swatch) => (
          <View key={swatch.name} className="w-[112px] gap-2">
            <View className={`h-[82px] w-[82px] rounded-xl ${swatch.className}`} />
            <View>
              <AppText variant="caption" className="uppercase text-text-primary">
                {swatch.name}
              </AppText>
              <AppText variant="caption" className="uppercase text-text-secondary">
                {swatch.value}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function DesignSystemScreen() {
  const { isLoaded, isSignedIn, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace("/onboarding");
  }

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/onboarding" />;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View className="w-full max-w-[1480px] gap-5 md:flex-row md:items-start">
        <View className="flex-1 gap-5">
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.85}
            className="items-center rounded-2xl bg-lingua-purple px-6 py-4"
            onPress={() => router.push("/language")}
          >
            <AppText variant="h4" className="text-white">
              Choose a Language
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.85}
            className="items-center rounded-2xl bg-lingua-deep-purple px-6 py-4"
            onPress={handleSignOut}
          >
            <AppText variant="h4" className="text-white">
              Sign Out
            </AppText>
          </TouchableOpacity>

          {/* <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.85}
            className="items-center rounded-2xl border border-border bg-background px-6 py-4"
            onPress={() => router.push("/language")}
          >
            <AppText variant="h4" className="text-text-primary">
              Choose Language
            </AppText>
          </TouchableOpacity> */}

          <View className="gap-7 rounded-2xl bg-background p-6 md:p-9" style={styles.card}>
            <SectionTitle>Brand</SectionTitle>
            <View className="flex-row items-end justify-center py-4">
              <Image source={images.mascotLogo} contentFit="contain" style={styles.logo} />
              <AppText variant="h1" className="-ml-2 pb-1 text-[48px] leading-[56px] text-text-primary">
                lingua
              </AppText>
            </View>
          </View>

          <View className="gap-7 rounded-2xl bg-background p-6 md:p-9" style={styles.card}>
            <SectionTitle>Colors</SectionTitle>
            <ColorGroup title="Primary" swatches={primaryColors} />
            <ColorGroup title="Semantic" swatches={semanticColors} />
            <ColorGroup title="Neutrals" swatches={neutralColors} />
          </View>
        </View>

        <View className="flex-1 gap-7 rounded-2xl bg-background p-6 md:p-9" style={styles.card}>
          <SectionTitle>Typography</SectionTitle>
          <View className="gap-3">
            <AppText variant="bodySmall" className="uppercase text-text-secondary">
              Font Family
            </AppText>
            <AppText variant="h1" className="text-[48px] leading-[58px]">
              Poppins
            </AppText>
            <AppText variant="bodyLarge" className="text-text-secondary">
              Poppins is a modern, geometric sans-serif typeface that provides excellent readability
              and a friendly personality.
            </AppText>
          </View>

          <View className="gap-7 pt-3">
            {typeRows.map((row) => (
              <View key={row.label} className="gap-2 sm:flex-row sm:items-center">
                <View className="sm:w-[28%]">
                  <AppText variant={row.variant}>{row.label}</AppText>
                </View>
                <View className="flex-row flex-1 items-center">
                  <AppText variant="bodyMedium" className="flex-1 text-text-secondary">
                    {row.use}
                  </AppText>
                  <AppText variant="bodySmall" className="w-14 text-text-secondary">
                    {row.size}
                  </AppText>
                  <AppText variant="bodySmall" className="w-20 text-text-secondary">
                    {row.weight}
                  </AppText>
                  <AppText variant="bodySmall" className="w-7 text-text-secondary">
                    {row.leading}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  card: {
    borderCurve: "continuous",
    boxShadow: "0 2px 12px rgba(13, 19, 43, 0.04)",
  },
  logo: {
    width: 132,
    height: 118,
  },
});
