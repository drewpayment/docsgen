<!-- src/lib/components/DocSidebar.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { docsConfig } from '$lib/stores/docs';
  import { Button } from '$lib/components/ui/button';
  import * as Collapsible from "$lib/components/ui/collapsible";
	import { get } from 'svelte/store';
	import type { DocsConfigPageConfig } from '$lib/types/docs-config';
  
  interface Props {
    menu: DocsConfigPageConfig[];
  }
  
  const { menu }: Props = $props();
  
  const doc = get(docsConfig);
  
  // Determine active page
  let currentPath = $derived($page.params.slug || '');
  
  // Check if a link is active
  function isActive(path: string) {
    return currentPath === path;
  }
  
  // Build section expanded state tracking
  let expandedSections: any = $state({});
  
  function toggleSection(sectionPath: string) {
    expandedSections[sectionPath] = !expandedSections[sectionPath];
  }
</script>

<aside class="w-64 border-r border-border h-screen overflow-y-auto p-4 bg-card">
  <div class="mb-6">
    <h2 class="text-xl font-bold mb-2">Documentation</h2>
  </div>
  
  {#if menu && menu.length > 0}
    <nav>
      {#each menu as section}
        <div class="mb-4">
          {#if section.children && section.children.length > 0}
            <Collapsible.Root>
              <Collapsible.Trigger class="flex items-center justify-between w-full text-left font-medium gap-2 cursor-pointer" on:click={() => toggleSection(section.path)}>
                {section.title}
                <span>{expandedSections[section.path] ? '−' : '+'}</span>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <ul class="pl-4 mt-2 space-y-2">
                  {#each section.children as item}
                    <li>
                      <a 
                        href="/docs/{section.path}/{item.path}" 
                        class="block py-1 {isActive(`${section.path}/${item.path}`) ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}"
                      >
                        {item.title}
                      </a>
                    </li>
                  {/each}
                </ul>
              </Collapsible.Content>
            </Collapsible.Root>
          {:else}
            <a 
              href="/docs/{section.path}" 
              class="block py-1 {isActive(section.path) ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}"
            >
              {section.title}
            </a>
          {/if}
        </div>
      {/each}
    </nav>
  {:else}
    <div class="text-muted-foreground">Loading navigation...</div>
  {/if}
</aside>