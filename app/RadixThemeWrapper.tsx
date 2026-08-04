"use client";

import { Theme } from "@radix-ui/themes";
import { useTheme } from "next-themes";

export default function RadixThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <Theme
      accentColor="jade"
      radius="large"
      appearance={resolvedTheme as "light" | "dark"}
      suppressHydrationWarning
    >
      {children}
    </Theme>
  );
}
