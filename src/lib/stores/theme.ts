import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const theme = writable(browser ? localStorage.getItem('theme') || 'system' : 'system');

theme.subscribe((value) => {
  if (browser) {
    localStorage.setItem('theme', value);
    updateTheme(value);
  }
});

function updateTheme(theme: string) {
  if (!browser) return;
  
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  document.documentElement.classList.toggle('dark', isDark);
}

// Initialize theme on client
export function initTheme() {
  if (browser) {
    updateTheme(localStorage.getItem('theme') || 'system');
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      updateTheme(localStorage.getItem('theme') || 'system');
    });
  }
}