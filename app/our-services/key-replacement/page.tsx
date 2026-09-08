import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find(
  (item) => item.slug === 'key-replacement',
)!;

export const metadata = createPageMetadata({
  title: 'Car Key Replacement Manassas, VA | PRO Detailing',
  description:
    'Request car-key replacement, duplication or programming from PRO Detailing in Manassas. Compatibility and proof requirements are confirmed first.',
  path: '/our-services/key-replacement',
});

export default function KeyReplacementPage() {
  return <AdditionalServicePage service={service} />;
}
