'use client';

import { useEffect } from 'react';

type FamilyMoviePlayerProps = {
  url: string;
};

/** Opens the configured family album URL (Google Photos does not allow reliable iframe embeds). */
export default function FamilyMoviePlayer({ url }: FamilyMoviePlayerProps) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#fff',
      }}
    >
      <div>
        <p>Opening the family album…</p>
        <p>
          <a href={url} style={{ color: '#9cf' }}>
            Open album
          </a>
        </p>
      </div>
    </main>
  );
}
