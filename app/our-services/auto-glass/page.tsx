import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find((item) => item.slug === 'auto-glass')!;

export const metadata = createPageMetadata({
  title: 'Auto Glass Repair & Replacement Manassas, VA | PRO Detailing',
  description:
    'Request windshield chip or crack repair assessment and front, side or rear auto-glass replacement in Manassas, Virginia.',
  path: '/our-services/auto-glass',
});

export default function AutoGlassPage() {
  return <AdditionalServicePage service={service} />;
}
