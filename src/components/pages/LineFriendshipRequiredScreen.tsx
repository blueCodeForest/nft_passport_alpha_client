import React from 'react';
import { LiffAdapter } from 'src/adapters/LiffAdapter';

/**
 * LINE友達登録が必要な場合に表示する画面コンポーネント
 */
export const LineFriendshipRequiredScreen: React.FC = () => {
  const botId = import.meta.env.VITE_LINE_BOT_ID as string;

  const handleAddFriend = () => {
    // ボットIDの有無にかかわらず友達追加ページを開く
    // （LiffAdapterが適切に処理してくれる）
    LiffAdapter.openFriendshipPage(botId);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-xl font-bold text-center text-gray-800'>
          LINE友達登録が必要です
        </h2>
        <p className='mb-6 text-center text-gray-600'>
          このアプリを利用するにはLINE公式アカウントと友達になる必要があります。以下のボタンから友達登録してください。
        </p>

        <button
          onClick={handleAddFriend}
          className='w-full py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
        >
          友達登録する
        </button>
      </div>
    </div>
  );
};
