import React from 'react';
import { LineAuthLevel, useLineAuth } from 'src/providers/LineAuthProvider';
import { LiffAdapter } from 'src/authBackup/adapters/LiffAdapter';

interface LineAuthRequiredScreenProps {
  currentLevel: LineAuthLevel;
  requiredLevel: LineAuthLevel;
}

export const LineAuthRequiredScreen: React.FC<LineAuthRequiredScreenProps> = ({
  currentLevel,
  requiredLevel,
}) => {
  // 認証レベルに応じたメッセージとアクションを取得
  const getAuthRequirements = () => {
    const { redirectToLine } = useLineAuth();
    const botId = import.meta.env.VITE_LINE_BOT_BASIC_ID as string;

    switch (requiredLevel) {
      case LineAuthLevel.IN_LINE_BROWSER:
        return {
          title: 'LINE内ブラウザでの閲覧が必要です',
          message:
            'このページはLINE内ブラウザでの閲覧が必要です。LINEアプリで開いてください。',
          buttonText: 'LINEで開く',
          action: () => {
            const redirected = redirectToLine();
            if (!redirected) {
              // 既にLINE内ブラウザの場合はリロード
              window.location.reload();
            }
          },
        };
      case LineAuthLevel.LINE_LOGIN:
        if (currentLevel < LineAuthLevel.IN_LINE_BROWSER) {
          return {
            title: 'LINE内ブラウザでの閲覧が必要です',
            message:
              'このページはLINE内ブラウザでの閲覧が必要です。LINEアプリで開いてください。',
            buttonText: 'LINEで開く',
            action: () => {
              const redirected = redirectToLine();
              if (!redirected) {
                // 既にLINE内ブラウザの場合はリロード
                window.location.reload();
              }
            },
          };
        }
        return {
          title: 'LINEログインが必要です',
          message: 'このページを閲覧するにはLINEログインが必要です。',
          buttonText: 'LINEでログイン',
          action: () => LiffAdapter.login(),
        };
      case LineAuthLevel.LINE_FRIEND:
        if (currentLevel < LineAuthLevel.IN_LINE_BROWSER) {
          return {
            title: 'LINE内ブラウザでの閲覧が必要です',
            message:
              'このページはLINE内ブラウザでの閲覧が必要です。LINEアプリで開いてください。',
            buttonText: 'LINEで開く',
            action: () => {
              const redirected = redirectToLine();
              if (!redirected) {
                // 既にLINE内ブラウザの場合はリロード
                window.location.reload();
              }
            },
          };
        }
        if (currentLevel < LineAuthLevel.LINE_LOGIN) {
          return {
            title: 'LINEログインが必要です',
            message: 'このページを閲覧するにはLINEログインが必要です。',
            buttonText: 'LINEでログイン',
            action: () => LiffAdapter.login(),
          };
        }
        return {
          title: '友だち追加が必要です',
          message:
            'このページを閲覧するには公式アカウントの友だち追加が必要です。',
          buttonText: '友だち追加する',
          action: () => LiffAdapter.openFriendshipPage(botId),
        };
      default:
        return {
          title: 'エラーが発生しました',
          message: '予期せぬエラーが発生しました。',
          buttonText: '戻る',
          action: () => window.history.back(),
        };
    }
  };

  const { title, message, buttonText, action } = getAuthRequirements();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-xl font-bold text-center text-gray-800'>
          {title}
        </h2>
        <p className='mb-6 text-center text-gray-600'>{message}</p>
        <button
          onClick={action}
          className='w-full py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
