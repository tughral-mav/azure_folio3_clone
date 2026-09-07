'use client';

import { useEffect } from 'react';

/**
 * Ports the two inline <script> IIFEs that ship with the standalone CPQ
 * landing page HTML (tabs + lightbox), so they run after React hydrates.
 * Scripts injected via dangerouslySetInnerHTML do not execute — this
 * client component is what makes those UI bits interactive.
 */
export function CpqScripts() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.cpq-page');
    if (!root) return;

    // Tab switcher ------------------------------------------------------
    const tabButtons = root.querySelectorAll<HTMLElement>('.tab-btn');
    const tabPanels = root.querySelectorAll<HTMLElement>('.tab-panel');
    const tabListeners: Array<[HTMLElement, EventListener]> = [];
    tabButtons.forEach((btn) => {
      const handler: EventListener = () => {
        const target = btn.getAttribute('data-tab');
        tabButtons.forEach((b) => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        tabPanels.forEach((p) => {
          p.classList.toggle('active', p.getAttribute('data-panel') === target);
        });
      };
      btn.addEventListener('click', handler);
      tabListeners.push([btn, handler]);
    });

    // Lightbox ----------------------------------------------------------
    const lb = root.querySelector<HTMLElement>('#lightbox');
    const lbImg = root.querySelector<HTMLImageElement>('#lightbox-img');
    const closeBtn = root.querySelector<HTMLElement>('#lightbox-close');
    const shotFrames = root.querySelectorAll<HTMLElement>('.shot-frame');

    const closeLb = () => {
      if (!lb || !lbImg) return;
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      document.body.style.overflow = '';
    };

    const shotListeners: Array<[HTMLElement, EventListener]> = [];
    shotFrames.forEach((frame) => {
      const handler: EventListener = () => {
        const img = frame.querySelector('img');
        if (!img || !lb || !lbImg) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };
      frame.addEventListener('click', handler);
      shotListeners.push([frame, handler]);
    });

    const lbBgHandler: EventListener = (e) => {
      if (e.target === lb) closeLb();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lb?.classList.contains('open')) closeLb();
    };

    closeBtn?.addEventListener('click', closeLb);
    lb?.addEventListener('click', lbBgHandler);
    document.addEventListener('keydown', keyHandler);

    return () => {
      tabListeners.forEach(([el, h]) => el.removeEventListener('click', h));
      shotListeners.forEach(([el, h]) => el.removeEventListener('click', h));
      closeBtn?.removeEventListener('click', closeLb);
      lb?.removeEventListener('click', lbBgHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return null;
}
