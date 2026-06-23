'use client';

import { useState } from 'react';
import Image from 'next/image';

// Poster image + click-to-play YouTube (privacy-friendly youtube-nocookie). Matches the live's
// Elementor video widget with image overlay — the iframe loads only after the user clicks play.
export function VideoEmbed({ youtube, poster, title }: { youtube: string; poster: string; title?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-cardHover">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label="Play video">
          {poster && <Image src={poster} alt={title || ''} fill sizes="(min-width:1024px) 56rem, 100vw" className="object-cover" />}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#1742E7" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
