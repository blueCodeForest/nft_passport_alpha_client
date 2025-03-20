import React, { useEffect } from 'react';
import { LiffAdapter } from 'src/adapters/LiffAdapter';

/**
 * LINE認証が必要な場合に表示する画面コンポーネント
 */
export const LineAuthRequiredScreen: React.FC = () => {
  const liffId = import.meta.env.VITE_LIFF_ID as string;

  // LINE内ブラウザで開かれている場合は自動的にログイン処理を実行
  useEffect(() => {
    if (LiffAdapter.isInClient()) {
      // LINE内ブラウザでログインしていない場合は自動的にログイン
      if (!LiffAdapter.isLoggedIn()) {
        LiffAdapter.login();
      }
    }
  }, []);

  const handleOpenInLine = () => {
    if (!liffId) {
      console.error('環境変数 VITE_LIFF_ID が設定されていません');
      return;
    }

    // LINE内ブラウザにリダイレクト
    LiffAdapter.redirectToLine(liffId);
  };

  // LINE内ブラウザで開かれていない場合のみ表示
  if (LiffAdapter.isInClient()) {
    return null; // LINE内ブラウザの場合は何も表示しない
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-xl font-bold text-center text-gray-800'>
          LINEで開く必要があります
        </h2>
        <p className='mb-6 text-center text-gray-600'>
          このアプリはLINE内ブラウザでの利用が必要です。以下のボタンからLINEで開いてください。
        </p>

        <button
          onClick={handleOpenInLine}
          className='w-full py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
        >
          LINEで開く
        </button>
      </div>
    </div>
  );
};
