import { BeforeAfterComparison } from '@/components/site/BeforeAfterComparison';

export function PpfCoverageComparison() {
  return (
    <BeforeAfterComparison
      className="coverage-car ppf-coverage-comparison"
      beforeSrc="/generated/ppf-coverage.webp"
      afterSrc="/generated/ppf-finished-clear-v2.webp"
      beforeAlt="Interactive comparison of clear paint protection film installation and the completed finish on the same silver BMW coupe in a dark studio"
      beforeLabel="Film installation"
      afterLabel="After · clear PPF"
      ariaLabel="Compare paint protection film installation and the completed clear finish on the BMW"
      note="Same BMW and angle · drag to reveal the completed clear finish"
      sizes="(max-width: 780px) 100vw, 54vw"
    />
  );
}
