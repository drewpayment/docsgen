

export interface DocsConfigPageConfig {
  title: string;
  path: string;
  slug: string;
  children: DocsConfigPageConfig[];
}

export interface DocsConfig {
  title: string;
  docsRenderType: 'local' | 'remote';
  docsBaseUrl: string;
  content: DocsConfigPageConfig[];
}