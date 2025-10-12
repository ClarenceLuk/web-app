import { FeatureFlagProvider } from "./FeatureFlagProvider";
import { composeProviders } from "./composeProviders";

export const AppProviders = composeProviders(FeatureFlagProvider);
