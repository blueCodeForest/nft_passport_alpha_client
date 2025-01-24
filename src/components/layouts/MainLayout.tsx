import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Outlet, useNavigate } from 'react-router-dom';
import { CustomIcon } from '../atoms/CustomIcon';

export function MainLayout() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleAddressClick = () => {
    if (address) {
      navigate(`/wallet/${address}`);
    }
  };

  return (
    <div className='min-h-screen'>
      <header className='fixed top-0 left-0 right-0 bg-white border-b border-lightGray z-50'>
        <div className='container max-w-screen-sm mx-auto px-4 py-2 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>NFT Passport</h1>
          <div>
            {isConnected ? (
              <div className='flex items-center gap-2'>
                <CustomIcon icon='i-teenyicons-wallet-alt-outline' size='sm' />
                <button
                  onClick={handleAddressClick}
                  className='text-sm hover:text-darkGray transition-colors'
                >
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </button>
                <button
                  onClick={() => disconnect()}
                  className='text-sm text-red-500'
                >
                  切断
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className='text-sm text-blue-500'
              >
                ウォレット接続
              </button>
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
