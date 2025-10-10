import { getFeatureFlags } from './api/featureFlags';

const callFlags = async () => {
  const flags = await getFeatureFlags();
  
  return flags;
};

callFlags();
