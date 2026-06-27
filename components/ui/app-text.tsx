import { Text, type TextProps } from "react-native";

import type { TypographyVariant } from "@/theme";

const variantClasses: Record<TypographyVariant, string> = {
  h1: "typography__h1",
  h2: "typography__h2",
  h3: "typography__h3",
  h4: "typography__h4",
  bodyLarge: "typography__body-large",
  bodyMedium: "typography__body-medium",
  bodySmall: "typography__body-small",
  caption: "typography__caption",
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
