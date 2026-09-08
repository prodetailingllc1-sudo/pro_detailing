import { additionalServices } from '@/lib/expanded-content';

const detailingPackageLabels: Record<string, string> = {
  'tier-1': 'Detailing Tier 1',
  'tier-2': 'Detailing Tier 2',
  'tier-3': 'Detailing Tier 3',
  'tier-4': 'Detailing Tier 4',
};

export function resolveQuotePackage(
  service: string,
  choice: string | undefined,
) {
  if (!choice) return null;

  if (service === 'detailing' && detailingPackageLabels[choice]) {
    return { id: choice, label: detailingPackageLabels[choice] };
  }

  const match = /^path-(\d+)$/.exec(choice);
  const serviceDefinition = additionalServices.find(
    (item) => item.quoteService === service,
  );
  const pathway = match
    ? serviceDefinition?.pathways[Number(match[1]) - 1]
    : undefined;

  return pathway ? { id: choice, label: pathway.name } : null;
}
