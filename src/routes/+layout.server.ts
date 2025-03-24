import type { DocsConfig, DocsConfigPageConfig } from '$lib/types/docs-config';
import path from 'node:path';
import fs from 'node:fs/promises';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
  const response = await fetch('/config.json');
    
    // TODO: need validation here
  const config = (await response.json()) as DocsConfig;
  
  // TODO: search docsBaseUrl recursively for markdown files to build DocSidebar.svelte and render it if the user hasn't specified their own
  if (config && config.docsRenderType === 'local') {
    const baseUrl = config.docsBaseUrl;
    
    if (!baseUrl) return { config: config, menu: null, };
    
    // read directory from baseUrl
    try {
      const menu = await buildMenuFromDirectory(baseUrl);
      return { config, menu };
    } catch (error) {
      console.error('Error building menu:', error);
      return { config, menu: null, error: 'Failed to build menu from directory' };
    }
  }
};

// Function to recursively scan directory and build menu
async function buildMenuFromDirectory(basePath: string, relativePath: string = ''): Promise<DocsConfigPageConfig[]> {
  const fullPath = path.join(`static/${basePath}`.replace('//', '/'), relativePath);
  const dirEntries = await fs.readdir(fullPath, { withFileTypes: true });
  
  const menuItems: DocsConfigPageConfig[] = [];
  
  // Process directories first for ordering
  const dirs = dirEntries.filter(entry => entry.isDirectory());
  const files = dirEntries.filter(entry => !entry.isDirectory() && entry.name.endsWith('.md'));
  
  // Add directories
  for (const dir of dirs) {
    // Skip hidden directories
    if (dir.name.startsWith('.')) continue;
    
    const dirRelativePath = path.join(relativePath, dir.name);
    const children = await buildMenuFromDirectory(basePath, dirRelativePath);
    const slugParts = dirRelativePath.split('/');
    const slug = slugParts[slugParts.length - 1];
    
    // Only add directories that have markdown files inside (directly or nested)
    if (children.length > 0) {
      menuItems.push({
        title: formatTitle(dir.name),
        slug,
        path: dirRelativePath,
        children
      });
    }
  }
  
  // Add files
  for (const file of files) {
    const fileRelativePath = path.join(relativePath, file.name);
    const slugParts = relativePath.split('/');
    const slug = slugParts[slugParts.length - 1];
    
    menuItems.push({
      title: formatTitle(file.name.replace('.md', '')),
      slug,
      path: fileRelativePath,
      children: []
    });
  }
  
  return menuItems;
}

// Format title from filename (convert-this-file to "Convert This File")
function formatTitle(filename: string): string {
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}