interface ContractImageProps {
  src: string;
  size: 'md' | 'lg';
}
export function ContractImage({ src, size }: ContractImageProps) {
  const sizeStyles = {
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
        ${sizeStyles[size]}`}
    >
      <img src={src} alt='ミント画像' className='h-auto' />
    </div>
  );
}
