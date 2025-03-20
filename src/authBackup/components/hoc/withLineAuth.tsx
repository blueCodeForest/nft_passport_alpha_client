import { ComponentType, useEffect, useState } from 'react';
import { useLineAuth, LineAuthLevel } from 'src/providers/LineAuthProvider';
import { LineAuthRequiredScreen } from '../molecules/LineAuthRequiredScreen';

// LINE認証レベルを要求するHOCのプロパティ
// interface WithLineAuthProps {
//   requiredLevel: LineAuthLevel;
// }

/**
 * コンポーネントにLINE認証レベルを要求するHOC
 * @param WrappedComponent ラップするコンポーネント
 * @param requiredLevel 要求する認証レベル
 * @returns ラップされたコンポーネント
 */
export function withLineAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredLevel: LineAuthLevel
) {
  return function WithLineAuthComponent(props: P) {
    const { checkAuthLevel, currentLevel, isFetching } = useLineAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!isFetching) {
        setIsAuthorized(checkAuthLevel(requiredLevel));
      }
    }, [isFetching, currentLevel, requiredLevel]);

    if (isFetching) {
      return <div>認証状態を確認中...</div>;
    }

    if (!isAuthorized) {
      return (
        <LineAuthRequiredScreen
          currentLevel={currentLevel}
          requiredLevel={requiredLevel}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };
}

/**
 * コンポーネントにLINE内ブラウザを要求するHOC
 */
export function withLineInBrowser<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return withLineAuth(WrappedComponent, LineAuthLevel.IN_LINE_BROWSER);
}

/**
 * コンポーネントにLINEログインを要求するHOC
 */
export function withLineLogin<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return withLineAuth(WrappedComponent, LineAuthLevel.LINE_LOGIN);
}

/**
 * コンポーネントにLINE友達登録を要求するHOC
 */
export function withLineFriend<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return withLineAuth(WrappedComponent, LineAuthLevel.LINE_FRIEND);
}
