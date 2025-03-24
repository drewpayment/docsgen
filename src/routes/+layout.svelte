<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
	import '../app.css';
	import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
	import DocSidebar from '$lib/components/DocSidebar.svelte';
	import * as Resizable from '$lib/components/ui/resizable';
	
	let { children, data } = $props();
	const { config, menu } = data;
	console.log(data)
	
	let wikiTitle = config?.title || 'Docsgen Wiki';
</script>

<ModeWatcher />

<div>
	<nav class="flex justify-between items-center min-h-10 p-4">
		<div class="flex-1 grow px-4">
			<h1 class="text-3xl">
				<a href="/docs">{wikiTitle}</a>
			</h1>
		</div>
		
		<Button on:click={toggleMode} variant="ghost">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</nav>
	
	<div class="p-4">
		<Resizable.PaneGroup direction="horizontal" class="rounded-lg border">
			<Resizable.Pane defaultSize={20}>
				<DocSidebar {menu} />
			</Resizable.Pane>
			<Resizable.Handle />
			<Resizable.Pane defaultSize={80}>
				<main class="flex-1 p-6">
					{@render children()}
				</main>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</div>
</div>

