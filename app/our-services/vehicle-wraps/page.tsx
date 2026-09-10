import { AdditionalServicePage } from '@/components/site/AdditionalServicePage';
import { vehicleWrapService } from '@/lib/expanded-content';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Vehicle Wraps & Color Changes Manassas, VA | PRO Wraps',
  description:
    'Plan a full vehicle color change, accent wrap, chrome delete, commercial graphics or wrap-removal review with PRO Detailing in Manassas, Virginia.',
  path: '/our-services/vehicle-wraps',
});

export default function VehicleWrapsPage() {
  return <AdditionalServicePage service={vehicleWrapService} />;
}
