import { BeforeAfterComparison } from '@/components/site/BeforeAfterComparison';

export function TintCoverageComparison() {
  return (
    <BeforeAfterComparison
      className="coverage-car tint-coverage-comparison"
      beforeSrc="/gallery/local-tint-white-sedan-night-clear.webp"
      afterSrc="/gallery/local-tint-white-sedan-night.webp"
      beforeAlt="Interactive comparison of clear and tinted side glass on the same white sedan at night"
      beforeLabel="Clear glass"
      afterLabel="Tinted glass"
      ariaLabel="Adjust the clear and tinted glass comparison"
      note="Same vehicle and view. Actual shade varies with factory glass, lighting and interior color."
      sizes="(max-width: 780px) 100vw, 54vw"
    />
  );
}
