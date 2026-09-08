import type { Metadata } from 'next';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';

const service = additionalServices.find(
  (item) => item.slug === 'tire-service',
)!;

export const metadata: Metadata = {
  title: { absolute: 'Tire Service Manassas, VA | PRO Detailing' },
  description: service.description,
  alternates: { canonical: '/our-services/tire-service' },
};

export default function TireServicePage() {
  return <AdditionalServicePage service={service} />;
}
