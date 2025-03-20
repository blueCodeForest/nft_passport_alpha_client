import { useState } from 'react';
import { useLiff } from 'src/providers';
import { LiffAdapter } from 'src/adapters/LiffAdapter';

export function DebugInfo() {
  // 本番環境ではコンポーネントを表示しない
  if (import.meta.env.PROD) return null;

  const [isVisible, setIsVisible] = useState(false);
  const {
    isInClient,
    isLoggedIn,
    isInitialized,
    isLineFriend,
    profile,
    liffError,
    // redirectToLine,
  } = useLiff();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // ログイン処理
  const handleLogin = () => {
    if (confirm('LINEにログインしますか？')) {
      LiffAdapter.login();
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    if (confirm('LINEからログアウトしますか？')) {
      LiffAdapter.logout();
      // ページをリロードして状態を更新
      window.location.reload();
    }
  };

  // 友達登録処理
  const handleAddFriend = () => {
    if (confirm('LINE公式アカウントを友達追加しますか？')) {
      const botId = (import.meta.env.VITE_LINE_BOT_BASIC_ID as string) || '';
      LiffAdapter.openFriendshipPage(botId);
    }
  };

  // 友達解除（ブロック）画面に誘導
  const handleUnfriend = () => {
    if (
      confirm(
        'LINE公式アカウントをブロック（友達解除）しますか？\nブロック画面に移動します。'
      )
    ) {
      // LINE公式アカウントのブロック画面に誘導
      window.open('https://line.me/R/nv/settings/blocked', '_blank');
    }
  };

  // 現在のパスとクエリパラメータを取得
  const currentPath = window.location.pathname;
  const currentQuery = window.location.search;

  // LIFF IDを取得
  const liffId = import.meta.env.VITE_LIFF_ID;

  // 環境情報を取得
  const envInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    url: window.location.href,
    liffId: liffId,
  };

  // LINE URLスキーム情報
  const lineUrlInfo = {
    lineUrlScheme: `line://R/app/${liffId}?path=${encodeURIComponent(currentPath)}${currentQuery ? `&${currentQuery.substring(1)}` : ''}`,
    lineMeUrl: `https://line.me/R/app/${liffId}?path=${encodeURIComponent(currentPath)}${currentQuery ? `&${currentQuery.substring(1)}` : ''}`,
    liffUrl: `https://liff.line.me/${liffId}?path=${encodeURIComponent(currentPath)}${currentQuery ? `&${currentQuery.substring(1)}` : ''}`,
  };

  return (
    <>
      {/* デバッグ情報トグルボタン */}
      <button
        onClick={toggleVisibility}
        className='fixed bottom-4 left-4 bg-blue-800 text-white p-2 rounded-full z-50 w-10 h-10 flex items-center justify-center'
        style={{ opacity: 0.7 }}
      >
        {isVisible ? 'X' : 'I'}
      </button>

      {/* デバッグ情報パネル */}
      {isVisible && (
        <div className='fixed top-16 left-4 w-[90vw] max-w-md bg-blue-900 text-white rounded-md overflow-hidden z-50 opacity-90'>
          <div className='flex justify-between items-center p-2 bg-blue-800'>
            <h3 className='text-sm font-bold'>デバッグ情報</h3>
            <button
              onClick={toggleVisibility}
              className='text-xs bg-red-600 px-2 py-1 rounded'
            >
              閉じる
            </button>
          </div>
          <div
            className='p-3 text-xs overflow-y-auto'
            style={{ maxHeight: '70vh' }}
          >
            <h4 className='font-bold mb-1'>LIFF情報:</h4>
            <ul className='mb-3 space-y-1'>
              <li>isInClient: {isInClient ? 'true' : 'false'}</li>
              <li>isLoggedIn: {isLoggedIn ? 'true' : 'false'}</li>
              <li>isInitialized: {isInitialized ? 'true' : 'false'}</li>
              <li>isLineFriend: {isLineFriend ? 'true' : 'false'}</li>
              <li>LIFF ID: {liffId}</li>
              {liffError && (
                <li className='text-red-300'>Error: {liffError.message}</li>
              )}
            </ul>

            {/* LINE操作ボタン */}
            <div className='mb-3'>
              <h4 className='font-bold mb-1'>LINE操作:</h4>
              <div className='flex flex-wrap gap-2'>
                {!isLoggedIn && (
                  <button
                    onClick={handleLogin}
                    className='bg-green-600 text-white px-2 py-1 rounded text-xs'
                  >
                    ログイン
                  </button>
                )}
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className='bg-red-600 text-white px-2 py-1 rounded text-xs'
                  >
                    ログアウト
                  </button>
                )}
                {isLoggedIn && !isLineFriend && (
                  <button
                    onClick={handleAddFriend}
                    className='bg-blue-600 text-white px-2 py-1 rounded text-xs'
                  >
                    友達追加
                  </button>
                )}
                {isLoggedIn && isLineFriend && (
                  <button
                    onClick={handleUnfriend}
                    className='bg-gray-600 text-white px-2 py-1 rounded text-xs'
                  >
                    友達解除
                  </button>
                )}
              </div>
            </div>

            <h4 className='font-bold mb-1'>LINE URL情報:</h4>
            <ul className='mb-3 space-y-1 break-all'>
              <li>
                <span className='text-yellow-300'>現在のパス:</span>
                <br />
                {currentPath}
              </li>
              <li>
                <span className='text-yellow-300'>クエリパラメータ:</span>
                <br />
                {currentQuery || '(なし)'}
              </li>
              <li>
                <span className='text-yellow-300'>URL Scheme:</span>
                <br />
                {lineUrlInfo.lineUrlScheme}
              </li>
              <li>
                <span className='text-yellow-300'>LINE.me URL:</span>
                <br />
                {lineUrlInfo.lineMeUrl}
              </li>
              <li>
                <span className='text-yellow-300'>LIFF URL:</span>
                <br />
                {lineUrlInfo.liffUrl}
              </li>
              <li className='mt-2'>
                {/* <button
                  onClick={() => redirectToLine()}
                  className='bg-green-700 text-white px-2 py-1 rounded text-xs mr-2'
                >
                  LINEアプリで開く
                </button> */}
                {/* <button
                  onClick={() => {
                    // テスト用のパスを指定
                    redirectToLine(
                      '/mint/evm/80002/0xBc3ba3F72d7f5528C47f3b7B38A0CB70CD425879'
                    );
                  }}
                  className='bg-green-700 text-white px-2 py-1 rounded text-xs'
                >
                  ミントページを開く
                </button> */}
              </li>
            </ul>

            {profile && (
              <>
                <h4 className='font-bold mb-1'>ユーザープロフィール:</h4>
                <ul className='mb-3 space-y-1'>
                  <li>userId: {profile.userId}</li>
                  <li>displayName: {profile.displayName}</li>
                  {profile.pictureUrl && (
                    <li>pictureUrl: {profile.pictureUrl}</li>
                  )}
                </ul>
              </>
            )}

            <h4 className='font-bold mb-1'>環境情報:</h4>
            <ul className='space-y-1'>
              <li>UserAgent: {envInfo.userAgent}</li>
              <li>Language: {envInfo.language}</li>
              <li>Platform: {envInfo.platform}</li>
              <li>
                Screen: {envInfo.screenWidth}x{envInfo.screenHeight}
              </li>
              <li>URL: {envInfo.url}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
