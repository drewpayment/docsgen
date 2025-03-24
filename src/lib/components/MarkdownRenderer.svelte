<!-- src/lib/components/MarkdownRenderer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import { currentDoc } from '$lib/stores/docs';
  
  interface Props {
    content: string;
  }
  
  let props: Props = $props();
  const { content } = props;
  
  let renderedContent = $derived(marked(content));
  
  // Configure marked with extended features
  marked.setOptions({
    gfm: true,
    // highlight: (code, lang) => {
    //   if (lang && hljs.getLanguage(lang)) {
    //     return hljs.highlight(lang, code).value;
    //   }
    //   return hljs.highlightAuto(code).value;
    // },
    // headerIds: true,
    // mangle: false
  });
</script>

<div class="prose dark:prose-invert max-w-none">
  {@html renderedContent}
</div>