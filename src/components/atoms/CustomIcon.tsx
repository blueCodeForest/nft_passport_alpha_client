interface CustomIconProps {
  icon: string;
  size: number;
}

export function CustomIcon({ icon, size }: CustomIconProps) {
  const iconClass = `i-${icon} w-${size} h-${size} bg-current`;
  return (
    <>
      <span className={iconClass}></span>
      {/* <span className='i-streamline-passport'></span>
      <span className='i-majesticons-coins-line w-5 h-5'></span>
      <span className='i-tabler-rubber-stamp'></span>
      <span className='i-fluent-ribbon-12-regular'></span>
      <span className='i-material-symbols-trophy-outline'></span>
      <span className='i-iconamoon-history-fill w-7 h-7'></span>
      <span className='i-emojione-monotone-1st-place-medal w-5 h-5'></span>
      <span className='i-emojione-monotone-2nd-place-medal w-5 h-5'></span>
      <span className='i-emojione-monotone-3rd-place-medal w-5 h-5'></span>
      <span className='i-fluent-emoji-high-contrast-1st-place-medal w-5 h-5'></span>
      <span className='i-teenyicons-wallet-alt-outline w-5 h-5'></span>
      <span className='i-solar-layers-minimalistic-linear w-5 h-5'></span>
      <span className='i-lucide-users w-5 h-5'></span> */}
    </>
  );
}
