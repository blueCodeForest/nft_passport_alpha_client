interface CustomIconProps {
  icon: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  className?: string;
  color?: string;
}

export function CustomIcon({
  icon,
  size = 'base',
  className = '',
  color = 'text-text',
}: CustomIconProps) {
  const sizeMap = {
    xs: 0.75,
    sm: 0.875,
    base: 1,
    lg: 1.125,
    xl: 1.25,
    '2xl': 1.5,
  };

  const rem = sizeMap[size];

  return (
    <span
      className={`${icon} ${color} ${className} inline-flex items-center`}
      style={{
        width: `${rem}rem`,
        height: `${rem}rem`,
        verticalAlign: 'middle',
      }}
    ></span>
  );
}
