'use client';

import { useEffect } from 'react';

export function FaqScripts() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLDivElement>('.bc-dash-page .faq-item');
    const handlers: Array<[HTMLButtonElement, () => void]> = [];
    items.forEach((item) => {
      const q = item.querySelector<HTMLButtonElement>('.faq-q');
      if (!q) return;
      const onClick = () => item.classList.toggle('open');
      q.addEventListener('click', onClick);
      handlers.push([q, onClick]);
    });
    return () => {
      handlers.forEach(([btn, fn]) => btn.removeEventListener('click', fn));
    };
  }, []);

  return null;
}
