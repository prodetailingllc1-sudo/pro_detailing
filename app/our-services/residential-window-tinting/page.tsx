import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find(
  (item) => item.slug === 'residential-window-tinting',
)!;

export const metadata = createPageMetadata({
  title: 'Residential Window Tint Northern Virginia | PRO Detailing',
  description:
    'Plan residential window film for heat, glare, UV, privacy or decorative goals in Northern Virginia, starting with a glass compatibility assessment.',
  path: '/our-services/residential-window-tinting',
});

export default function ResidentialWindowTintPage() {
  return <AdditionalServicePage service={service} />;
}
