import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find(
  (item) => item.slug === 'key-replacement',
)!;

export const metadata = createPageMetadata({
  title: 'Automotive Locksmith & Car Keys Manassas, VA | PRO Detailing',
  description:
    'Request automotive lockout help, car-key cutting, duplication, replacement or fob programming from PRO Detailing in Manassas.',
  path: '/our-services/key-replacement',
});

export default function KeyReplacementPage() {
  return <AdditionalServicePage service={service} />;
}
