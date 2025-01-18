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
import { MintSuccessModalProvider } from 'src/components/organisms';
import { SWRConfig } from 'swr';
(globalThis as any).Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SWRConfig>
          <MintSuccessModalProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path='/mint/evm/:chainId/:contractAddress'
                  element={<MintScreen />}
                ></Route>
                <Route
                  path='/contract/:contractId'
                  element={<ContractScreen />}
                ></Route>
                <Route
                  path='/wallet/:walletAddress'
                  element={<WalletScreen />}
                ></Route>
                <Route path='/passport' element={<PassportRoot />}>
                  <Route
                    path='brand/:id'
                    element={<BrandPassportScreen />}
                  ></Route>
                  <Route
                    path='collection/:id'
                    element={<CollectionPassportScreen />}
                  ></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </MintSuccessModalProvider>
        </SWRConfig>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
