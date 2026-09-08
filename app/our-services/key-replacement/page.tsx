import type { Metadata } from 'next';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';

const service = additionalServices.find(
  (item) => item.slug === 'key-replacement',
)!;

export const metadata: Metadata = {
  title: { absolute: 'Car Key Replacement Manassas, VA | PRO Detailing' },
  description: service.description,
  alternates: { canonical: '/our-services/key-replacement' },
};

export default function KeyReplacementPage() {
  return <AdditionalServicePage service={service} />;
}
