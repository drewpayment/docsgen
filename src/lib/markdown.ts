import { marked } from 'marked';
import markedAlert from 'marked-alert';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import mermaid from 'mermaid';

// Add GFM support
marked.use(gfmHeadingId());

// Add alert/admonition support
marked.use(markedAlert());

// Configure mermaid diagrams
marked.use({
  renderer: {
    codespan(code) {
      return `<div class="mermaid">${code}</div>`;
    },
  }
});

// Initialize mermaid on client
export function initMermaid() {
  if (typeof window !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    });
  }
}