# LINE認証レベル管理システム

このシステムは、LIFFアプリケーション内でのLINE関連の認証状態を管理するための仕組みを提供します。

20250316コメント
工数がかさみそうなので、一旦シンプルな認証システムを導入することにする。
ここでやりたいことは、ページ単位、もしくは処理単位に認証レベルを設定し、
LINE内ブラウザに限らず、より広い環境でアプリケーションをシームレスに動作させること。

## プロバイダーの責務

### LiffProvider

- LIFF SDKの初期化と基本的な状態管理
- LINE内ブラウザかどうかの判定（`isInClient`）
- LINEログイン状態の管理（`isLoggedIn`）
- 友達関係の確認（`isLineFriend`）
- ユーザープロファイル情報の取得（`profile`）
- LINE内ブラウザへのリダイレクト機能（`redirectToLine`）
- 認証完了後のコールバック処理（`checkPendingActions`）

### LineAuthProvider

- 認証レベルの抽象化と階層管理
- 現在の認証レベルの判定（`currentLevel`）
- 認証レベルのチェック機能（`checkAuthLevel`）
- LiffProviderが提供する基本機能の利用

## 認証レベル

以下の4つの認証レベルが定義されています：

1. `LineAuthLevel.NONE` (0) - 制限なし
2. `LineAuthLevel.IN_LINE_BROWSER` (1) - LINE内ブラウザでの閲覧が必要
3. `LineAuthLevel.LINE_LOGIN` (2) - LINEログインが必要
4. `LineAuthLevel.LINE_FRIEND` (3) - 友だち登録が必要

各レベルは階層的になっており、上位のレベルは下位のレベルの条件も満たす必要があります。
例えば、`LINE_FRIEND`レベルが要求される場合、LINE内ブラウザでの閲覧とLINEログインも必要です。

## 使用方法

### 認証方法の選択

このシステムでは、2つの認証方法を提供しています：

1. **ページ単位の認証（HOC）** - ページ全体に認証レベルを適用
2. **アクション単位の認証（フック）** - 特定のアクション（ボタンクリックなど）に認証レベルを適用

状況に応じて適切な方法を選択してください。

### 1. ページ単位の認証（HOC）

コンポーネントに認証レベルを適用するには、以下のHOC（Higher-Order Component）を使用します：

```tsx
// LINE内ブラウザを要求する
import { withLineInBrowser } from 'src/components/hoc';
export const MyComponent = withLineInBrowser(MyComponentBase);

// LINEログインを要求する
import { withLineLogin } from 'src/components/hoc';
export const MyComponent = withLineLogin(MyComponentBase);

// 友だち登録を要求する
import { withLineFriend } from 'src/components/hoc';
export const MyComponent = withLineFriend(MyComponentBase);
```

カスタム認証レベルを適用するには、`withLineAuth`関数を使用します：

```tsx
import { withLineAuth, LineAuthLevel } from 'src/components/hoc';
export const MyComponent = withLineAuth(
  MyComponentBase,
  LineAuthLevel.LINE_LOGIN
);
```

### 2. アクション単位の認証（フック）

特定のアクションに認証レベルを適用するには、`useActionAuth`フックを使用します：

```tsx
import { useActionAuth } from 'src/hooks';
import { LineAuthLevel } from 'src/providers/LineAuthProvider';

function MyComponent() {
  const {
    executeWithAuth,
    executeWithLineInBrowser,
    executeWithLineLogin,
    executeWithLineFriend,
    isAuthenticating,
  } = useActionAuth({
    onAuthStart: () => console.log('認証開始'),
    onAuthSuccess: () => console.log('認証成功'),
    onAuthCancel: () => console.log('認証キャンセル'),
    onAuthError: (error) => console.error('認証エラー:', error),
  });

  // 友だち登録が必要なアクションを実行
  const handleAction = () => {
    executeWithLineFriend(
      () => {
        // 認証成功後に実行されるアクション
        console.log('アクション実行');
        // APIリクエストなど
      },
      'この機能を利用するには友だち登録が必要です。' // 認証メッセージ
    );
  };

  return (
    <button onClick={handleAction} disabled={isAuthenticating}>
      アクション実行
    </button>
  );
}
```

### フック内で認証レベルを確認する

コンポーネント内で認証レベルを確認するには、`useLineAuth`フックを使用します：

```tsx
import { useLineAuth, LineAuthLevel } from 'src/providers/LineAuthProvider';

function MyComponent() {
  const {
    checkAuthLevel,
    currentLevel,
    isInLineBrowser,
    isLineLoggedIn,
    isLineFriend,
  } = useLineAuth();

  // 特定のレベルを満たしているか確認
  const canAccessFeature = checkAuthLevel(LineAuthLevel.LINE_LOGIN);

  // 条件に応じた処理
  if (!canAccessFeature) {
    return <div>この機能を使用するにはLINEログインが必要です</div>;
  }

  return <div>認証済みコンテンツ</div>;
}
```

### LINE内ブラウザへのリダイレクト

ユーザーをLINE内ブラウザにリダイレクトするには、`redirectToLine`関数を使用します：

```tsx
import { useLineAuth } from 'src/providers/LineAuthProvider';
// または
import { useLiff } from 'src/providers/LiffProvider';

function MyComponent() {
  // LineAuthProviderから取得する場合
  const { redirectToLine } = useLineAuth();

  // または直接LiffProviderから取得する場合
  // const { redirectToLine } = useLiff();

  const handleOpenInLine = () => {
    // 現在のパスでLINEに遷移
    redirectToLine();

    // または特定のパスを指定してLINEに遷移
    // redirectToLine('/specific/path');
  };

  return <button onClick={handleOpenInLine}>LINEで開く</button>;
}
```

## 認証状態の確認

`useLineAuth`フックは以下のプロパティを提供します：

- `currentLevel`: 現在の認証レベル
- `isInLineBrowser`: LINE内ブラウザかどうか
- `isLineLoggedIn`: LINEログイン済みかどうか
- `isLineFriend`: 友だち登録済みかどうか
- `isFetching`: 認証状態を取得中かどうか
- `checkAuthLevel`: 特定のレベルを満たしているか確認する関数
- `redirectToLine`: LINE内ブラウザにリダイレクトする関数

## 認証が必要な画面

ページ単位の認証を使用する場合、認証レベルが不足している場合は自動的に`LineAuthRequiredScreen`コンポーネントが表示され、ユーザーに必要なアクション（LINEで開く、ログイン、友だち追加）を促します。

## ユースケース

### ユースケース1: ページ全体に認証を適用

ページ全体に認証を適用する場合は、HOCを使用します：

```tsx
// ページ全体にLINEログインを要求
export const MyPage = withLineLogin(MyPageBase);
```

### ユースケース2: 特定のアクションに認証を適用

ページ自体は認証なしで表示し、特定のアクション（ボタンクリックなど）に認証を適用する場合は、`useActionAuth`フックを使用します：

```tsx
function MyPage() {
  const { executeWithLineFriend } = useActionAuth();

  const handleAction = () => {
    executeWithLineFriend(() => {
      // 認証成功後に実行されるアクション
      console.log('アクション実行');
    });
  };

  return (
    <div>
      <h1>ページタイトル</h1>
      <p>このページは認証なしで閲覧できます</p>
      <button onClick={handleAction}>友だち登録が必要なアクション</button>
    </div>
  );
}
```

このアプローチにより、ユーザーはまずコンテンツを確認してから、必要に応じて認証を行うことができます。
