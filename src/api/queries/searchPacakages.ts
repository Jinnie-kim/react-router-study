import type { PackageSummary } from '../types/packageSummary';

interface SearchResponse {
  objects: {
    packages: {
      name: string;
      description: string;
      version: string;
      keywords: string[];
    };
  }[];
}

export async function SearchPackages(term: string): Promise<PackageSummary[]> {
  const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${term}`);

  const data: SearchResponse = await res.json();
  return data.objects.map(({ packages: { name, description, version, keywords } }) => {
    return {
      name,
      description,
      version,
      keywords,
    };
  });
}
