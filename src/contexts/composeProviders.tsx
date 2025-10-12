import React, { ComponentType, ReactNode } from 'react';

export const composeProviders = (...providers: ComponentType<{ children: ReactNode }>[]) =>
  providers.reduce(
    (AccumulatedProviders, CurrentProvider) =>
      ({ children }: { children: ReactNode }) => (
        <AccumulatedProviders>
          <CurrentProvider>{children}</CurrentProvider>
        </AccumulatedProviders>
      ),
    ({ children }: { children: ReactNode }) => <>{children}</>
  );
