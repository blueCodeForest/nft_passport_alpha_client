import { Buffer } from 'buffer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { BrowserRouter } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi.ts';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  MintScreen,
  WalletScreen,
  PassportRoot,
  BrandPassportScreen,
  CollectionPassportScreen,
  ContractScreen,
} from 'src/components/pages';
import { MintModalProvider } from 'src/components/organisms';
import { SWRConfig } from 'swr';
import { MainLayout } from 'src/components/layouts';
import { WalletConnectionModalProvider } from './components/organisms/WalletConnectionModalContext.tsx';
(globalThis as any).Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SWRConfig>
          <WalletConnectionModalProvider>
            <MintModalProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route
                      path='/mint/evm/:chainId/:contractAddress'
                      element={<MintScreen />}
                    />
                    <Route
                      path='/contract/:contractId'
                      element={<ContractScreen />}
                    />
                    <Route
                      path='/wallet/:walletAddress'
                      element={<WalletScreen />}
                    />
                    <Route path='/passport' element={<PassportRoot />}>
                      <Route
                        path='brand/:id'
                        element={<BrandPassportScreen />}
                      />
                      <Route
                        path='collection/:id'
                        element={<CollectionPassportScreen />}
                      />
                    </Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </MintModalProvider>
          </WalletConnectionModalProvider>
        </SWRConfig>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
