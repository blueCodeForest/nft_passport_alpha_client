import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { CustomIcon } from '../atoms/CustomIcon';
import { useWallet } from 'src/hooks/useWallet';
import { useState } from 'react';
import { DebugConsole, DebugInfo } from 'src/components/debugs';

/**
 * アプリケーションの共通レイアウトを提供するコンポーネント
 * 責務:
 * - ヘッダーとナビゲーションの表示
 * - ウォレット情報の表示と関連機能
 * - 子ルートのコンテンツ表示（Outlet）
 */
export function MainLayout() {
  const { address, isLoading } = useWallet();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const location = useLocation();

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const isMintPage = location.pathname.startsWith('/mint/evm/');

  return (
    <div className='min-h-screen'>
      <header className='fixed top-0 left-0 right-0 bg-white border-b border-lightGray z-50'>
        <div className='container max-w-screen-sm mx-auto px-4 py-2 flex justify-between items-center'>
          <h1
            className='text-xl font-bold logo cursor-pointer'
            onClick={navigateToHome}
          >
            NFTパスポート
          </h1>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              {address ? (
                <div className='flex items-center gap-2'>
                  <CustomIcon
                    icon='i-teenyicons-wallet-alt-outline'
                    size='sm'
                  />
                  <button
                    onClick={handleCopyAddress}
                    className='text-sm hover:text-darkGray transition-colors'
                  >
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </button>
                  {showCopied && (
                    <div className='absolute top-full right-0 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded'>
                      コピーしました
                    </div>
                  )}
                </div>
              ) : (
                !isMintPage &&
                isLoading && (
                  <div className='text-sm text-gray-500'>
                    ウォレット読み込み中...
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </header>
      <div className='h-[var(--header-height)]' />
      <main className='container max-w-screen-sm mx-auto'>
        <Outlet />
      </main>
      {/* <footer className='mt-8 py-4 border-t border-lightGray'>
        <div className='container max-w-screen-sm mx-auto px-4 text-center text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} NFTパスポート
        </div>
      </footer> */}
      <DebugConsole />
      <DebugInfo />
    </div>
  );
}
