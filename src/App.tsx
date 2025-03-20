import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  MintScreen,
  WalletScreen,
  PassportRoot,
  BrandPassportScreen,
  CollectionPassportScreen,
  ContractScreen,
  IndexScreen,
} from 'src/components/pages';
import { MainLayout } from 'src/components/layouts';
import {
  MintModalProvider,
  LiffProvider,
  LineAuthProvider,
  WalletProvider,
} from 'src/providers';
import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// クエリクライアントの初期化
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <MintModalProvider>
          <LiffProvider>
            <LineAuthProvider>
              <WalletProvider>
                <Routes>
                  <Route path='/' element={<MainLayout />}>
                    <Route index element={<IndexScreen />} />
                    <Route
                      path='wallet/:walletAddress'
                      element={<WalletScreen />}
                    />
                    <Route
                      path='mint/evm/:chainId/:contractAddress'
                      element={<MintScreen />}
                    />
                    <Route path='passport' element={<PassportRoot />}>
                      <Route
                        path='brand/:id'
                        element={<BrandPassportScreen />}
                      />
                      <Route
                        path='collection/:id'
                        element={<CollectionPassportScreen />}
                      />
                    </Route>
                    <Route path='contract/:id' element={<ContractScreen />} />
                  </Route>
                </Routes>
              </WalletProvider>
            </LineAuthProvider>
          </LiffProvider>
        </MintModalProvider>
      </SWRConfig>
    </QueryClientProvider>
  );
}

export default App;
