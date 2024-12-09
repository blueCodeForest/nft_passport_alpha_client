import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'Create Wagmi',
      preference: {
        options: 'smartWalletOnly',
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
