// src/lib/stores/docs.js
import type { DocsConfig } from '$lib/types/docs-config';
import { writable, get } from 'svelte/store';

export const docsConfig = writable<DocsConfig | null>(null);
export const currentDoc = writable<string>('');
export const isLoading = writable(true);

// Initialize by fetching config
export async function initDocsStore() {
  try {
    const response = await fetch('/config.json');
    
    // TODO: need validation here
    const config = (await response.json()) as DocsConfig;
    
    docsConfig.set(config);
    return config;
  } catch (error) {
    console.error('Failed to load docs configuration:', error);
  }
}

// Fetch a specific document
export async function fetchDocument(path: string) {
  isLoading.set(true);
  
  try {
    const config = get(docsConfig);
    if (!config) return null;
    
    const response = await fetch(`${config.docsBaseUrl}/${path}.md`);
    const markdown = await response.text();
    
    currentDoc.set(markdown);
    return markdown;
  } catch (error) {
    console.error(`Failed to load document at path ${path}:`, error);
  } finally {
    isLoading.set(false);
  }
}