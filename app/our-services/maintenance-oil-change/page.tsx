import type { Metadata } from 'next';

import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';

const service = additionalServices.find(
  (item) => item.slug === 'maintenance-oil-change',
)!;

export const metadata: Metadata = {
  title: {
    absolute: 'Oil Change & Auto Maintenance Manassas, VA | PRO Detailing',
  },
  description: service.description,
  alternates: { canonical: '/our-services/maintenance-oil-change' },
};

export default function MaintenancePage() {
  return <AdditionalServicePage service={service} />;
}
