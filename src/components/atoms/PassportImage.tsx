interface PassportImageProps {
  src: string;
  alt: string;
}

export function PassportImage({ src, alt }: PassportImageProps) {
  return <img src={src} alt={alt} className='w-14 h-14' />;
}
