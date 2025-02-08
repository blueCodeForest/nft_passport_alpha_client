import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { CustomIcon } from '../atoms/CustomIcon';
import { useWalletConnection } from 'src/hooks';
import { useState } from 'react';

export function MainLayout() {
  const { connectWallet, address, isConnected, disconnect } =
    useWalletConnection();
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

  const isMintPage = location.pathname.startsWith('/mint/evm/');

  return (
    <div className='min-h-screen'>
      <header className='fixed top-0 left-0 right-0 bg-white border-b border-lightGray z-50'>
        <div className='container max-w-screen-sm mx-auto px-4 py-2 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>NFT Passport</h1>
          <div className='relative'>
            {isConnected ? (
              <div className='flex items-center gap-2'>
                <CustomIcon icon='i-teenyicons-wallet-alt-outline' size='sm' />
                <button
                  onClick={handleCopyAddress}
                  className='text-sm hover:text-darkGray transition-colors'
                >
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='text-sm'
                >
                  <CustomIcon
                    icon='i-material-symbols-keyboard-arrow-down'
                    size='base'
                  />
                </button>
                {isMenuOpen && (
                  <div className='absolute top-full right-0 mt-2 bg-white border border-lightGray rounded-md shadow-lg'>
                    <button
                      onClick={() => {
                        navigate(`/wallet/${address}`);
                        setIsMenuOpen(false);
                      }}
                      className='block w-full px-4 py-2 text-sm text-left hover:bg-gray-100'
                    >
                      マイウォレット
                    </button>
                    <button
                      onClick={() => {
                        disconnect();
                        setIsMenuOpen(false);
                      }}
                      className='block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100'
                    >
                      切断
                    </button>
                  </div>
                )}
                {showCopied && (
                  <div className='absolute top-full right-0 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded'>
                    コピーしました
                  </div>
                )}
              </div>
            ) : (
              !isMintPage && (
                <button
                  onClick={async () => await connectWallet()}
                  className='text-sm text-blue-500'
                >
                  ウォレット接続
                </button>
              )
            )}
          </div>
        </div>
      </header>
      <div className='h-[var(--header-height)]' />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
