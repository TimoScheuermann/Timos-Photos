import store from '@/store';

export const mqDarkmode = window.matchMedia('(prefers-color-scheme: dark)');

function mediaListenerDarkmode(event: MediaQueryListEvent): void {
  store.commit('darkmode', event && event.matches);
}

export function registerMediaQueries(): void {
  mqDarkmode.addListener(mediaListenerDarkmode);
  store.commit('dark', mqDarkmode.matches);
}

export function unregisterMediaQueries(): void {
  mqDarkmode.removeListener(mediaListenerDarkmode);
}
