export const getFeatureFlags = async () => {
  const response = await fetch('https://edge.api.flagsmith.com/api/v1/flags/', {
    headers: {
      'X-Environment-Key': 'QwfQ7eQTFQKKzB9wpH3Nzh',
    },
  });
  return response.json();
};
