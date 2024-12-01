import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'Create Wagmi',
      preference: 'smartWalletOnly',
    }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
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
