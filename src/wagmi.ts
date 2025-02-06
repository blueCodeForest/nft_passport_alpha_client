import { http, createConfig, type Config } from 'wagmi';
import { polygonAmoy, polygon } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config: Config = createConfig({
  chains: [polygon, polygonAmoy],
  connectors: [
    coinbaseWallet({
      appName: 'NFT Passport',
      preference: {
        options: 'smartWalletOnly',
      },
    }),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
