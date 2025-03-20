import { useState, useCallback } from 'react';
import { LineAuthLevel } from 'src/providers/LineAuthProvider';
import { LineAuthRequiredModal } from 'src/components/molecules/LineAuthRequiredModal';

/**
 * LINE認証モーダルを管理するフック
 */
export function useLineAuthModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requiredLevel, setRequiredLevel] = useState<LineAuthLevel>(
    LineAuthLevel.NONE
  );
  const [currentLevel, setCurrentLevel] = useState<LineAuthLevel>(
    LineAuthLevel.NONE
  );
  const [onConfirmCallback, setOnConfirmCallback] = useState<
    (() => void) | null
  >(null);
  const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | null>(
    null
  );

  /**
   * モーダルを表示する
   */
  const showModal = useCallback(
    (
      requiredAuthLevel: LineAuthLevel,
      currentAuthLevel: LineAuthLevel,
      onConfirm: () => void,
      onCancel: () => void
    ) => {
      setRequiredLevel(requiredAuthLevel);
      setCurrentLevel(currentAuthLevel);
      setOnConfirmCallback(() => onConfirm);
      setOnCancelCallback(() => onCancel);
      setIsModalOpen(true);
    },
    []
  );

  /**
   * モーダルを閉じる
   */
  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /**
   * 確認ボタンがクリックされたときの処理
   */
  const handleConfirm = useCallback(() => {
    if (onConfirmCallback) {
      onConfirmCallback();
    }
    hideModal();
  }, [onConfirmCallback, hideModal]);

  /**
   * キャンセルボタンがクリックされたときの処理
   */
  const handleCancel = useCallback(() => {
    if (onCancelCallback) {
      onCancelCallback();
    }
    hideModal();
  }, [onCancelCallback, hideModal]);

  /**
   * useActionAuthのrenderAuthUIオプションとして使用するコールバック
   */
  const renderAuthUI = useCallback(
    (
      requiredAuthLevel: LineAuthLevel,
      currentAuthLevel: LineAuthLevel,
      onConfirm: () => void,
      onCancel: () => void
    ) => {
      showModal(requiredAuthLevel, currentAuthLevel, onConfirm, onCancel);
    },
    [showModal]
  );

  /**
   * モーダルコンポーネント
   */
  const AuthModal = useCallback(
    () => (
      <LineAuthRequiredModal
        isOpen={isModalOpen}
        requiredLevel={requiredLevel}
        currentLevel={currentLevel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ),
    [isModalOpen, requiredLevel, currentLevel, handleConfirm, handleCancel]
  );

  return {
    isModalOpen,
    showModal,
    hideModal,
    renderAuthUI,
    AuthModal,
  };
}
