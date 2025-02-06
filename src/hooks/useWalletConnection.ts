import { useConnect, useAccount, useDisconnect, Connector } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

interface UseWalletConnectionReturn {
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
  error: Error | null;
  address: string | undefined;
  isConnected: boolean;
  disconnect: () => void;
}

export const useWalletConnection = (): UseWalletConnectionReturn => {
  const { connect, connectors, isPending: isConnecting, error } = useConnect();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const connectWallet = async (): Promise<void> => {
    const availableConnectors = connectors.filter(
      (connector) => connector.ready
    );

    if (availableConnectors.length === 0) {
      // Coinbase Smart Walletを作成
      const coinbaseConnector = coinbaseWallet({
        appName: 'NFT Passport',
        preference: {
          options: 'smartWalletOnly',
        },
      });

      try {
        await connect({ connector: coinbaseConnector });
        return;
      } catch (err) {
        console.error('Coinbase Wallet connection failed:', err);
        throw err;
      }
    }

    if (availableConnectors.length === 1) {
      await connect({ connector: availableConnectors[0] });
      return;
    }

    return new Promise((resolve, reject) => {
      const modal = createWalletSelectionModal(
        availableConnectors,
        async (connector: Connector) => {
          try {
            await connect({ connector });
            modal.remove();
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  };

  return {
    connectWallet,
    isConnecting,
    error,
    address,
    isConnected,
    disconnect,
  };
};

const createWalletSelectionModal = (
  connectors: Connector[],
  onSelect: (connector: Connector) => void
) => {
  const modal = document.createElement('div');
  modal.className =
    'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

  const content = document.createElement('div');
  content.className = 'bg-white p-6 rounded-lg max-w-sm w-full';
  content.innerHTML = `
    <h3 class="text-lg font-bold mb-4">ウォレットを選択してください</h3>
    <div class="space-y-2">
      ${connectors
        .map(
          (connector) => `
          <button
            data-connector-id="${connector.id}"
            class="block w-full p-3 text-left border rounded hover:bg-gray-100"
          >
            ${connector.name}
          </button>
        `
        )
        .join('')}
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // イベントリスナーの設定
  connectors.forEach((connector) => {
    const button = content.querySelector(
      `[data-connector-id="${connector.id}"]`
    );
    button?.addEventListener('click', () => onSelect(connector));
  });

  return modal;
};
