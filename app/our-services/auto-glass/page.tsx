import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find((item) => item.slug === 'auto-glass')!;

export const metadata = createPageMetadata({
  title: 'Windshield & Auto Glass Manassas, VA | PRO Detailing',
  description:
    'Request windshield, side-glass or rear-glass service planning from PRO Detailing in Manassas, Virginia. Compatibility and calibration needs are confirmed first.',
  path: '/our-services/auto-glass',
});

export default function AutoGlassPage() {
  return <AdditionalServicePage service={service} />;
}
