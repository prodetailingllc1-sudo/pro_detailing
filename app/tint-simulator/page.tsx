import type { Metadata } from 'next';
import { ArrowRight, Eye, Gauge, Info, Layers3 } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { TintStudio } from '@/components/site/TintStudio';

export const metadata: Metadata = {
  title: {
    absolute: 'Window Tint Simulator: LLumar CTX, IRX & AIR | PRO Tints',
  },
  description:
    'Preview LLumar CTX, IRX and AIR shades on your vehicle, compare measured film data and check Virginia, Maryland and DC guidance before requesting a quote.',
  alternates: { canonical: '/tint-simulator' },
  openGraph: {
    title: 'Window Tint Simulator: LLumar CTX, IRX & AIR | PRO Tints',
    description:
      'Build a tint appearance preview, compare measured VLT and continue to a vehicle-specific recommendation.',
    url: '/tint-simulator',
  },
};

const simulatorFaqs = [
  [
    'Why can the preview differ from my vehicle?',
    'The render cannot reproduce your exact factory glass, interior color, ambient light or viewing angle. It is a useful visual reference, not a calibrated photograph.',
  ],
  [
    'What is measured VLT?',
    'Visible light transmission is the percentage of visible light passing through the test assembly. The measured values shown here come from LLumar’s current published data for its stated reference glass.',
  ],
  [
    'Why does factory glass affect the result?',
    'Film is applied to glass that already transmits less than 100% of visible light. The completed glass-and-film system is therefore different from the film value by itself.',
  ],
  [
    'Does this tool provide legal advice?',
    'No. It does not certify compliance. Vehicle classification, window position, exemptions, current law and a finished-window meter reading determine the analysis.',
  ],
  [
    'Can I send this configuration with a quote request?',
    'Use Copy Build, then paste the configuration into the vehicle request. We will confirm it against your actual vehicle.',
  ],
] as const;

export default function TintSimulatorPage() {
  return (
    <main id="main-content" className="simulator-page">
      <section className="simulator-hero">
        <div className="simulator-grid-bg" aria-hidden="true" />
        <div className="shell simulator-intro">
          <div>
            <Image
              src="/brand/pro-tints-optimized.webp"
              alt="PRO Tints"
              width="1100"
              height="204"
            />
            <p className="eyebrow">
              <span /> Interactive window-film lab
            </p>
            <h1>PRO Tints Studio</h1>
            <p className="simulator-subhead">
              A window-tint visualization experience from PRO Detailing LLC.
            </p>
          </div>
          <div className="simulator-intro-copy">
            <p>
              Preview shade and coverage, compare confirmed LLumar film choices
              and bring a clearer starting point to your tint consultation.
            </p>
            <Link className="text-link" href="/our-services/window-tinting">
              Compare CTX, IRX & AIR <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-full-section">
        <div className="shell">
          <TintStudio />
        </div>
      </section>

      <section className="section simulator-explain">
        <div className="shell">
          <div className="explain-grid">
            <article>
              <Eye aria-hidden="true" />
              <span>01</span>
              <h2>Appearance, approximated</h2>
              <p>
                The studio helps you compare relative darkness and coverage. It
                cannot reproduce every glass, interior or lighting condition.
              </p>
            </article>
            <article>
              <Gauge aria-hidden="true" />
              <span>02</span>
              <h2>Measured VLT, separated</h2>
              <p>
                The product name and published measured VLT are shown
                separately. The completed window still needs a meter reading.
              </p>
            </article>
            <article>
              <Layers3 aria-hidden="true" />
              <span>03</span>
              <h2>Factory glass, combined</h2>
              <p>
                Your vehicle’s existing glass changes the final transmission and
                appearance once film is installed.
              </p>
            </article>
          </div>
          <div className="simulator-advisory">
            <Info aria-hidden="true" />
            <p>
              <strong>Important:</strong> Appearance preview only. Actual shade
              varies with factory glass, lighting and interior color. This tool
              does not certify legal compliance. Final window readings and
              vehicle classification govern.
            </p>
          </div>
        </div>
      </section>

      <section className="section faq-section simulator-faq">
        <div className="shell faq-layout">
          <div className="section-intro">
            <p className="eyebrow">
              <span /> Studio FAQ
            </p>
            <h2>What the preview can—and cannot—tell you.</h2>
          </div>
          <div className="faq-list">
            {simulatorFaqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Save the preview. Confirm it on the vehicle."
        title="Bring your build to the Manassas studio."
        copy="Your quote will confirm the glass, selected LLumar film, measured shade, coverage, availability and installation scope."
        service="tint"
      />
    </main>
  );
}
