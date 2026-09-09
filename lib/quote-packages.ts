import { additionalServices } from '@/lib/expanded-content';
import { ceramicProPaintPackages } from '@/lib/ceramic-pro-data';
import {
  detailingQuoteTiers,
  mobileDetailingQuoteTiers,
} from '@/lib/quote-options';

export function resolveQuotePackage(
  service: string,
  choice: string | undefined,
) {
  if (!choice) return null;

  if (service === 'ceramic') {
    const offering = ceramicProPaintPackages.find((item) => item.id === choice);
    return offering
      ? {
          id: offering.id,
          label: `Ceramic Pro ${offering.name}`,
        }
      : null;
  }

  const configuredTier =
    service === 'detailing'
      ? detailingQuoteTiers.find((tier) => tier.id === choice)
      : service === 'mobile-detailing'
        ? mobileDetailingQuoteTiers.find((tier) => tier.id === choice)
        : undefined;

  if (configuredTier) {
    return {
      id: configuredTier.id,
      label: `${configuredTier.name} — ${configuredTier.label}`,
    };
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
