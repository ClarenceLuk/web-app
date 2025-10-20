import { FeatureFlagProvider } from "./FeatureFlagProvider";
import { ThemeProvider } from "./ThemeProvider";
import { NavigationProvider } from "./NavigationProvider";
import { composeProviders } from "./composeProviders";

export const AppProviders = composeProviders(
  FeatureFlagProvider,
  ThemeProvider,
  NavigationProvider
);
