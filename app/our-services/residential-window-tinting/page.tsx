import type { Metadata } from 'next';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';

const service = additionalServices.find(
  (item) => item.slug === 'residential-window-tinting',
)!;

export const metadata: Metadata = {
  title: {
    absolute: 'Residential Window Tint Northern Virginia | PRO Detailing',
  },
  description: service.description,
  alternates: { canonical: '/our-services/residential-window-tinting' },
};

export default function ResidentialWindowTintPage() {
  return <AdditionalServicePage service={service} />;
}
