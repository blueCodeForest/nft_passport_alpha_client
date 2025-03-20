import React from 'react';
import { LineAuthLevel, useLineAuth } from 'src/providers/LineAuthProvider';

interface LineAuthRequiredModalProps {
  isOpen: boolean;
  requiredLevel: LineAuthLevel;
  currentLevel: LineAuthLevel;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 認証が必要な場合に表示するモーダルコンポーネント
 */
export const LineAuthRequiredModal: React.FC<LineAuthRequiredModalProps> = ({
  isOpen,
  requiredLevel,
  currentLevel,
  onConfirm,
  onCancel,
}) => {
  const { redirectToLine } = useLineAuth();

  if (!isOpen) return null;

  // 認証レベルに応じたメッセージとアクションを取得
  const getAuthRequirements = () => {
    switch (requiredLevel) {
      case LineAuthLevel.IN_LINE_BROWSER:
        return {
          title: 'LINE内ブラウザでの閲覧が必要です',
          message:
            'この操作を行うにはLINE内ブラウザでの閲覧が必要です。LINEアプリで開いてください。',
          buttonText: 'LINEで開く',
          action: () => {
            const redirected = redirectToLine();
            if (!redirected) {
              // 既にLINE内ブラウザの場合は確認ボタンを押したとみなす
              onConfirm();
            }
          },
        };
      case LineAuthLevel.LINE_LOGIN:
        if (currentLevel < LineAuthLevel.IN_LINE_BROWSER) {
          return {
            title: 'LINE内ブラウザでの閲覧が必要です',
            message:
              'この操作を行うにはLINE内ブラウザでの閲覧が必要です。LINEアプリで開いてください。',
            buttonText: 'LINEで開く',
            action: () => {
              const redirected = redirectToLine();
              if (!redirected) {
                // 既にLINE内ブラウザの場合は確認ボタンを押したとみなす
                onConfirm();
              }
            },
          };
        }
        return {
          title: 'LINEログインが必要です',
          message: 'この操作を行うにはLINEログインが必要です。',
          buttonText: 'LINEでログイン',
          action: onConfirm,
        };
      case LineAuthLevel.LINE_FRIEND:
        if (currentLevel < LineAuthLevel.IN_LINE_BROWSER) {
          return {
            title: 'LINE内ブラウザでの閲覧が必要です',
            message:
              'この操作を行うにはLINE内ブラウザでの閲覧が必要です。LINEアプリで開いてください。',
            buttonText: 'LINEで開く',
            action: () => {
              const redirected = redirectToLine();
              if (!redirected) {
                // 既にLINE内ブラウザの場合は確認ボタンを押したとみなす
                onConfirm();
              }
            },
          };
        }
        if (currentLevel < LineAuthLevel.LINE_LOGIN) {
          return {
            title: 'LINEログインが必要です',
            message: 'この操作を行うにはLINEログインが必要です。',
            buttonText: 'LINEでログイン',
            action: onConfirm,
          };
        }
        return {
          title: '友だち追加が必要です',
          message: 'この操作を行うには公式アカウントの友だち追加が必要です。',
          buttonText: '友だち追加する',
          action: onConfirm,
        };
      default:
        return {
          title: 'エラーが発生しました',
          message: '予期せぬエラーが発生しました。',
          buttonText: '戻る',
          action: onCancel,
        };
    }
  };

  const { title, message, buttonText, action } = getAuthRequirements();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h2 className='mb-4 text-xl font-bold text-center text-gray-800'>
          {title}
        </h2>
        <p className='mb-6 text-center text-gray-600'>{message}</p>
        <div className='flex justify-between space-x-4'>
          <button
            onClick={onCancel}
            className='w-1/2 py-2 font-bold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
          >
            キャンセル
          </button>
          <button
            onClick={action}
            className='w-1/2 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
