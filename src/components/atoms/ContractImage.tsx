interface ContractImageProps {
  src: string;
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function ContractImage({
  src,
  size,
  onClick,
  className = '',
}: ContractImageProps) {
  const sizeStyles = {
    sm: 'w-1/3 p-1',
    md: 'w-1/3 p-1',
    lg: 'w-4/5 p-2',
  };
  return (
    <div
      className={`
        flex
        justify-center
        items-center
        border-2
        border-dashed
        border-lightGray
        ${sizeStyles[size]}
        ${className}`}
    >
      <img src={src} alt='ミント画像' className='h-auto' onClick={onClick} />
    </div>
  );
}
