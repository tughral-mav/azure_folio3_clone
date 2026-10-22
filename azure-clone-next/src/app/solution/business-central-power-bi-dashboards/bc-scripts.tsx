'use client';

import { useEffect } from 'react';

export function BcDashboardScripts() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.bc-page');
    if (!root) return;

    const tabs = root.querySelectorAll<HTMLElement>('.tabs .tab');
    const panels = root.querySelectorAll<HTMLElement>('.tab-panel');
    const listeners: Array<[HTMLElement, EventListener]> = [];

    tabs.forEach((tab) => {
      const handler: EventListener = () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach((t) => t.classList.toggle('active', t === tab));
        panels.forEach((p) => p.classList.toggle('active', p.id === `panel-${target}`));
      };
      tab.addEventListener('click', handler);
      listeners.push([tab, handler]);
    });

    return () => {
      listeners.forEach(([el, h]) => el.removeEventListener('click', h));
    };
  }, []);

  return null;
}
