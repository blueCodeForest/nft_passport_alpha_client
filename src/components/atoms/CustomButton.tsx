import { CustomIcon } from './CustomIcon';

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: string;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function CustomButton({
  label,
  onClick,
  icon,
  className = '',
  disabled = false,
  size = 'md',
}: ButtonProps) {
  const sizeClasses = {
    sm: '',
    md: 'px-6 py-2',
  };

  const baseClasses =
    'rounded-md border-2 font-bold flex items-center justify-center';
  const activeClasses = 'border-darkGray bg-transparent text-darkGray';
  const disabledClasses =
    'border-lightGray bg-lightGray text-white cursor-not-allowed';

  return (
    <div className='flex justify-center'>
      <button
        onClick={onClick}
        className={`${baseClasses} ${disabled ? disabledClasses : activeClasses} ${
          sizeClasses[size]
        } ${className}`}
        disabled={disabled}
      >
        {icon && (
          <CustomIcon
            icon={icon}
            size={size === 'sm' ? 'base' : 'lg'}
            color={disabled ? 'text-white' : 'text-darkGray'}
            className='mr-2'
          />
        )}
        {label}
      </button>
    </div>
  );
}
