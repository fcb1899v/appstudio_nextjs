import Image, { type ImageProps } from 'next/image';

/**
 * Wraps next/image and serves WebP when available (Lighthouse "uses-optimized-images").
 * For local /images/*.png|jpg|jpeg, adds <picture><source type="image/webp"> so browsers
 * that support WebP get the smaller format; others get the original via <img>.
 *
 * Pass width/height as the display size (max size the image is shown at) to avoid
 * requesting larger than needed.
 */
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
  // alt is spelled out at both call sites: jsx-a11y only recognises a literal
  // attribute, not one arriving through a spread, even though ImageProps
  // already requires it.
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
