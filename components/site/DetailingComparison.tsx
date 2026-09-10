import { BeforeAfterComparison } from '@/components/site/BeforeAfterComparison';

export function DetailingComparison() {
  return (
    <BeforeAfterComparison
      className="detailing-service-comparison"
      beforeSrc="/generated/detailing-before-comparison.webp"
      afterSrc="/generated/detailing-completed-comparison.webp"
      beforeAlt="Interactive comparison of a neglected and professionally detailed version of the same luxury vehicle cabin"
      beforeLabel="Before detail"
      afterLabel="Detail completed"
      ariaLabel="Compare the cabin before detailing and after the completed detail"
      note="Same cabin and angle · results depend on material condition and the agreed service scope"
      sizes="(max-width: 780px) 100vw, 70vw"
    />
  );
}
