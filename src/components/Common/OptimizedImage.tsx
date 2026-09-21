import Image, { type ImageProps } from 'next/image';

/** next/image wrapper that serves WebP for local /images/*.png|jpg|jpeg via <picture>.
 * Pass width/height as the display size so nothing larger than needed is requested. */
function getWebpSrc(src: string): string | null {
  if (typeof src !== 'string' || !src.startsWith('/')) return null;
  const match = src.match(/^(.+)\.(png|jpe?g)$/i);
  return match ? `${match[1]}.webp` : null;
}

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
}

export default function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  const webpSrc = getWebpSrc(src);
  // alt is spelled out at both call sites: jsx-a11y only recognises a literal attribute, not one arriving through a spread.
  const imageProps: Omit<ImageProps, 'alt'> = { ...props, src };

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <Image {...imageProps} alt={alt} />
      </picture>
    );
  }

  return <Image {...imageProps} alt={alt} />;
}
