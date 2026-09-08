import type { Metadata } from 'next';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';

const service = additionalServices.find((item) => item.slug === 'auto-glass')!;

export const metadata: Metadata = {
  title: {
    absolute:
      'Auto Glass & Windshield Replacement Manassas, VA | PRO Detailing',
  },
  description: service.description,
  alternates: { canonical: '/our-services/auto-glass' },
};

export default function AutoGlassPage() {
  return <AdditionalServicePage service={service} />;
}
