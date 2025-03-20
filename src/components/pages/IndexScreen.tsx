import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from 'src/hooks/useWallet';

/**
 * インデックス画面コンポーネント
 * 役割: ルートパス（"/"）にアクセスされた時、ウォレットアドレスが取得できたら
 * 自動的に /wallet/{walletAddress} にリダイレクトする
 */
export function IndexScreen() {
  const { address, isLoading } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    // ウォレットアドレスが取得できたらリダイレクト
    if (address && !isLoading) {
      navigate(`/wallet/${address}`);
    }
  }, [address, isLoading, navigate]);

  // ウォレットアドレス取得中はローディング表示
  if (isLoading) {
    return <div>ウォレット情報を読み込み中...</div>;
  }

  // アドレスがない場合（エラーなど）の表示
  return <div>ウォレット情報を取得できませんでした。</div>;
}
