<!-- src/routes/docs/[...slug]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { currentDoc, isLoading } from '$lib/stores/docs';
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import { Button } from '$lib/components/ui/button';
  import DocSidebar from '$lib/components/DocSidebar.svelte';
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  
  const { data } = $props();
  const { slug, content: inputContent } = data;
  
  const content = inputContent || '';
</script>

{#if !content && $isLoading}
  <div class="flex justify-center items-center h-full">
    <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
{:else}
  <MarkdownRenderer content={content} />
{/if}