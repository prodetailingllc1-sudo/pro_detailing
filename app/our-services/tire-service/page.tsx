import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find(
  (item) => item.slug === 'tire-service',
)!;

export const metadata = createPageMetadata({
  title: 'Tire Service Manassas, VA | PRO Detailing',
  description:
    'Request tire inspection, rotation, flat-repair assessment or tire-and-brake safety service from PRO Detailing in Manassas, Virginia.',
  path: '/our-services/tire-service',
});

export default function TireServicePage() {
  return <AdditionalServicePage service={service} />;
}
