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

export default function OptimizedImage({ src, ...props }: OptimizedImageProps) {
  const webpSrc = getWebpSrc(src);
  const imageProps: ImageProps = { ...props, src };

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <Image {...imageProps} />
      </picture>
    );
  }

  return <Image {...imageProps} />;
}
