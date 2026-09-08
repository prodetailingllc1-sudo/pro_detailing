import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { additionalServices } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

const service = additionalServices.find(
  (item) => item.slug === 'maintenance-oil-change',
)!;

export const metadata = createPageMetadata({
  title: 'Oil Change & Auto Maintenance Manassas, VA | PRO Detailing',
  description:
    'Plan an oil change, fluid, filter, brake, diagnostic or routine maintenance visit with PRO Detailing in Manassas, Virginia.',
  path: '/our-services/maintenance-oil-change',
});

export default function MaintenancePage() {
  return <AdditionalServicePage service={service} />;
}
