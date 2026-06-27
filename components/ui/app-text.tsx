import { Text, type TextProps } from "react-native";

import type { TypographyVariant } from "@/theme";

const variantClasses: Record<TypographyVariant, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  bodyLarge: "body-lg",
  bodyMedium: "body-md",
  bodySmall: "body-sm",
  caption: "caption",
};

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  className?: string;
};

export function AppText({
  variant = "bodyMedium",
  className = "",
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`${variantClasses[variant]} text-text-primary ${className}`}
      {...props}
    />
  );
}
