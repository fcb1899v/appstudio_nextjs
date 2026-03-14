'use client';

import { NextPage } from 'next';
import { useState } from 'react';
import { isSP, myApp } from '@/utils/constants';
import { CSSProperties } from 'react';

/**
 * Interface for YouTube movie component props
 * Defines the properties required for rendering YouTube videos
 */
interface Props {
  appNumber: number;
  width: number;
  isJa: boolean;
}

/** YouTube embed base URL (privacy-enhanced: no cookies until user plays) */
const YOUTUBE_EMBED_BASE = 'https://www.youtube-nocookie.com/embed';

/** Thumbnail URL for placeholder; iframe loads only after user click (reduces unused JS) */
const thumbUrl = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

/**
 * Component for embedding a YouTube video
 * Uses youtube-nocookie.com. Loads iframe only on user click to avoid loading ~2MB of YouTube JS until needed.
 */
const YoutubeMovie: NextPage<Props> = ({ appNumber, width, isJa }) => {
  const videoId = myApp(width, isJa)[appNumber].link.youtube;
  const [embedLoaded, setEmbedLoaded] = useState(false);

  if (!videoId || videoId === '/' || videoId === '') {
    return <div style={{ height: isSP(width) ? '20px' : '40px' }} />;
  }

  const containerStyle: CSSProperties = {
    margin: isSP(width) ? '10px auto' : '20px auto',
    width: '100vw',
    maxWidth: isSP(width) ? '95%' : 600,
    padding: isSP(width) ? '0 10px' : '0',
    position: 'relative',
    aspectRatio: '16 / 9',
    backgroundColor: '#000',
  };

  const iframeStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  };

  const params = new URLSearchParams({
    controls: '0',
    rel: '0',
    loop: '1',
    playlist: videoId,
  });
  const embedSrc = `${YOUTUBE_EMBED_BASE}/${videoId}?${params.toString()}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setEmbedLoaded(true);
  };

  return (
    <div style={containerStyle} className="youtube">
      {embedLoaded ? (
        <iframe
          src={embedSrc}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={iframeStyle}
        />
      ) : (
        <button
          type="button"
          onClick={handleClick}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            padding: 0,
            border: 0,
            cursor: 'pointer',
            background: 'none',
          }}
          aria-label="Play YouTube video"
        >
          <img
            src={thumbUrl(videoId)}
            alt=""
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </button>
      )}
    </div>
  );
};

export default YoutubeMovie;
