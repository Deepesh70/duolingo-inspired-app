import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/theme";

const tabs = {
  home: { label: "Home", icon: "home-outline", activeIcon: "home" },
  learn: { label: "Learn", icon: "book-outline", activeIcon: "book" },
  "ai-teacher": { label: "AI Teacher", icon: "people-outline", activeIcon: "people" },
  chat: { label: "Chat", icon: "chatbubble-outline", activeIcon: "chatbubble" },
  profile: { label: "Profile", icon: "person-outline", activeIcon: "person" },
} as const;

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const itemWidth = barWidth / state.routes.length;

  useEffect(() => {
    if (!itemWidth) return;

    Animated.spring(translateX, {
      toValue: state.index * itemWidth + (itemWidth - 52) / 2,
      damping: 18,
      stiffness: 180,
      mass: 0.7,
      useNativeDriver: true,
    }).start();
  }, [itemWidth, state.index, translateX]);

  return (
    <View className="items-center bg-transparent">
      <View
        className="w-full max-w-[520px] rounded-t-[30px] bg-background px-2 pt-3"
        style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 10) }]}
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width - 16)}
      >
        {barWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            className="absolute left-2 top-3 h-[52px] w-[52px] rounded-full bg-lingua-purple"
            style={{ transform: [{ translateX }] }}
          />
        )}

        <View className="flex-row">
          {state.routes.map((route, index) => {
          const tab = tabs[route.name as keyof typeof tabs];
          if (!tab) return null;

          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

            return (
              <Pressable
                key={route.key}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onLongPress={onLongPress}
                onPress={onPress}
                style={styles.tab}
              >
                <Ionicons
                  name={isFocused ? tab.activeIcon : tab.icon}
                  color={isFocused ? colors.neutral.background : colors.neutral.textSecondary}
                  size={isFocused ? 27 : 26}
                />
                {!isFocused && (
                  <AppText variant="caption" className="text-center text-[10px] text-text-secondary">
                    {tab.label}
                  </AppText>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    boxShadow: "0 -3px 18px rgba(13, 19, 43, 0.07)",
    borderCurve: "continuous",
  },
  tab: {
    flex: 1,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});
