import { ReactNode } from 'react';
import { useLiff } from './LiffProvider';
import { LineAuthRequiredScreen } from 'src/components/pages/LineAuthRequiredScreen';
import { LineFriendshipRequiredScreen } from 'src/components/pages/LineFriendshipRequiredScreen';

/**
 * LINE認証状態に基づいて適切な画面を表示するコンポーネント
 */
export const LineAuthProvider = ({ children }: { children: ReactNode }) => {
  const { isInClient, isLoggedIn, isLineFriend, isInitialized } = useLiff();

  // 初期化中の場合は何も表示しない
  if (!isInitialized) {
    return null;
  }

  // 認証が必要な場合は認証画面を表示
  if (!isInClient || !isLoggedIn) {
    return <LineAuthRequiredScreen />;
  }

  // 友達登録が必要な場合は友達登録画面を表示
  if (!isLineFriend) {
    return <LineFriendshipRequiredScreen />;
  }

  // すべての認証条件を満たしている場合は子コンポーネントを表示
  return <>{children}</>;
};
