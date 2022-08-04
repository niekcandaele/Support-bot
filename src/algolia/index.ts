import algoliasearch, { SearchIndex } from "algoliasearch";

let cachedIndex: SearchIndex | null = null;

export async function getSearchIndex(): Promise<SearchIndex> {
  if (!cachedIndex) {
    const searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );
    cachedIndex = searchClient.initIndex("csmm");
  }

  return cachedIndex;
}
