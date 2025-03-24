export const ssr = false;
import { fetchDocument, initDocsStore } from '$lib/stores/docs';

export const load = async ({ params }) => {
  await initDocsStore();
  const slug = params.slug;
  const content = await fetchDocument(slug);
  
  return {
    slug,
    content
  };
};