/**
 * LINE認証の状態を表す型
 */
export interface LineAuthState {
  isInLineBrowser: boolean;
  isLineLoggedIn: boolean;
  isLineFriend: boolean;
  isFetching: boolean;
}
