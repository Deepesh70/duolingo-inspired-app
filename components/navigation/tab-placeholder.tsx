import { View } from "react-native";

import { AppText } from "@/components/ui/app-text";

type TabPlaceholderProps = {
  title: string;
};

export function TabPlaceholder({ title }: TabPlaceholderProps) {
  return (
    <View className="flex-1 items-center justify-center bg-surface px-6">
      <AppText variant="h2" className="text-center">
        {title}
      </AppText>
      <AppText variant="bodyMedium" className="pt-2 text-center text-text-secondary">
        This screen is coming soon.
      </AppText>
    </View>
  );
}
