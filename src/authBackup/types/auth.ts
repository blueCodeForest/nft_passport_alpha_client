/**
 * LINE認証レベルの定義
 */
export enum LineAuthLevel {
  NONE = 0, // 制限なし
  IN_LINE_BROWSER = 1, // LINE内ブラウザ必須
  LINE_LOGIN = 2, // LINEログイン必須
  LINE_FRIEND = 3, // 友達登録必須
}

/**
 * 認証状態の型定義
 */
export interface LineAuthState {
  currentLevel: LineAuthLevel;
  isInLineBrowser: boolean;
  isLineLoggedIn: boolean;
  isLineFriend: boolean;
  isFetching: boolean;
}

/**
 * 認証イベントの型定義
 */
export interface AuthEventDetail {
  actionId: string | null;
}
