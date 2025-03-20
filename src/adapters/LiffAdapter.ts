import liff from '@line/liff';

/**
 * LIFF SDKとの対話を担当するアダプタークラス
 * 外部依存であるLIFF SDKを抽象化し、テスト容易性を向上させる
 */
export class LiffAdapter {
  private static isInitialized = false;

  /**
   * LIFFを初期化する
   */
  static async initialize(liffId: string): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('LIFF初期化開始...');
      await liff.init({ liffId });
      console.log('LIFF初期化完了');
      this.isInitialized = true;
    } catch (error) {
      console.error('LIFF初期化エラー:', error);
      throw error instanceof Error
        ? error
        : new Error('LIFF初期化に失敗しました');
    }
  }

  /**
   * LINE内ブラウザで実行されているかどうかを確認する
   */
  static isInClient(): boolean {
    return liff.isInClient();
  }

  /**
   * LINEにログインしているかどうかを確認する
   */
  static isLoggedIn(): boolean {
    return liff.isLoggedIn();
  }

  /**
   * LINEにログインする
   */
  static login(): void {
    liff.login();
  }

  /**
   * LINEからログアウトする
   */
  static logout(): void {
    liff.logout();
  }

  /**
   * ユーザープロフィールを取得する
   */
  static async getProfile(): Promise<any> {
    return await liff.getProfile();
  }

  /**
   * 友だち関係を確認する
   */
  static async getFriendship(): Promise<boolean> {
    const friendship = await liff.getFriendship();
    return friendship.friendFlag;
  }

  /**
   * 外部ブラウザからLINE内ブラウザにリダイレクトする
   */
  static redirectToLine(liffId: string, path?: string): boolean {
    if (this.isInClient()) return false;

    // 現在のパスを取得（カスタムパスが指定されていればそれを使用）
    const currentPath = path || window.location.pathname;
    const currentQuery = window.location.search;

    // パスをエンコード
    const encodedPath = encodeURIComponent(currentPath);

    // クエリパラメータを結合
    const redirectQuery = currentQuery
      ? `${currentQuery}&path=${encodedPath}`
      : `?path=${encodedPath}`;

    // LINE URLを構築
    const lineMeUrl = `https://line.me/R/app/${liffId}${redirectQuery}`;
    const liffUrl = `https://liff.line.me/${liffId}${redirectQuery}`;

    console.log('リダイレクトURL:', {
      lineMeUrl,
      liffUrl,
      currentPath,
      currentQuery,
      redirectQuery,
    });

    // モバイルデバイスかどうかを判定
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // モバイルデバイスの場合、LINE.me URLを使用
      window.location.href = lineMeUrl;

      // フォールバック
      setTimeout(() => {
        window.location.href = liffUrl;
      }, 500);
    } else {
      // PCの場合はLIFF URLを使用
      window.location.href = liffUrl;
    }

    return true;
  }

  /**
   * 友だち追加ページを開く
   * botIdが指定されていない場合はデフォルトの友達追加ページを開く
   */
  static openFriendshipPage(botId?: string): void {
    if (botId) {
      // 特定のボットの友達追加ページを開く
      liff.openWindow({
        url: `https://line.me/R/ti/p/${botId}`,
        external: false,
      });
    } else {
      // 友達追加ページを開く（LINE内ブラウザの場合）
      if (this.isInClient()) {
        // LIFFアプリが接続されているボットの友達追加ページを開く
        liff.openWindow({
          url: `https://line.me/R/ti/p/`,
          external: false,
        });
      } else {
        // LINE外の場合はLINEアプリのダウンロードページへ
        window.open('https://line.me/ja/download', '_blank');
      }
    }
  }

  /**
   * リダイレクト後のパスを処理する
   */
  static handleRedirectPath(): string | null {
    // URLパラメータからパス情報を取得
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('path');

    if (!redirectPath) return null;

    // クエリパラメータからpathを除去
    urlParams.delete('path');
    const remainingQuery = urlParams.toString()
      ? `?${urlParams.toString()}`
      : '';

    // 新しいURLを構築
    return `${redirectPath}${remainingQuery}`;
  }
}
