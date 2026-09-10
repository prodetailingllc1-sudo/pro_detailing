import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

import Link from '@/components/site/SafeLink';
import { createPageMetadata } from '@/lib/metadata';
import { quoteHref } from '@/lib/site-data';

const officialVisualizerUrl = 'https://ceramic-pro.com/us/visualizer/';
const embeddedVisualizerUrl = 'https://api.car-cover.net/shift-3d/';

export const metadata = createPageMetadata({
  title: 'Ceramic Pro 3D Vehicle Visualizer | PRO Detailing',
  description:
    'Explore the full vehicle catalog currently supported by the official Ceramic Pro SHIFT VISION 3D color-PPF visualizer.',
  path: '/vehicle-visualizer',
});

export default function VehicleVisualizerPage() {
  return (
    <main id="main-content" className="vehicle-visualizer-page">
      <section className="vehicle-visualizer-section">
        <div className="shell vehicle-visualizer-workspace">
          <header className="vehicle-visualizer-header">
            <div>
              <p className="overline">Official Ceramic Pro hosted tool</p>
              <h1>Explore the full supported 3D vehicle library.</h1>
              <p>
                Your branded PRO Tints Studio remains the main simulator and
                keeps your white Mercedes-Benz C 63 AMG as its default. Use this
                separate library to choose another supported make or model,
                rotate it through 360 degrees and compare Ceramic Pro SHIFT
                color-PPF finishes.
              </p>
            </div>
            <div className="vehicle-visualizer-actions">
              <Link className="button button-primary" href="/tint-simulator">
                Open the C 63 AMG tint studio <ArrowRight aria-hidden="true" />
              </Link>
              <a
                className="button button-ghost"
                href={officialVisualizerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open full screen <ExternalLink aria-hidden="true" />
              </a>
              <Link className="button button-ghost" href={quoteHref('ppf')}>
                Ask about PPF <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </header>

          <aside className="vehicle-visualizer-disclosure" role="note">
            <ShieldCheck aria-hidden="true" />
            <div>
              <strong>Preview scope</strong>
              <p>
                This third-party tool previews Ceramic Pro SHIFT color PPF. It
                is not a window-tint simulator, a ceramic-coating result, or a
                promise that a displayed finish is available from PRO Detailing.
                Our published PPF service remains LLumar-based; product
                availability is confirmed before booking.
              </p>
            </div>
          </aside>

          <div className="vehicle-visualizer-frame">
            <iframe
              src={embeddedVisualizerUrl}
              title="Official Ceramic Pro SHIFT VISION 3D vehicle visualizer"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
              allow="fullscreen; web-share"
              allowFullScreen
            />
          </div>

          <p className="vehicle-visualizer-fallback">
            If the interactive library is blocked by your browser’s privacy
            settings,{' '}
            <a
              href={officialVisualizerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              open the official Ceramic Pro visualizer in a new tab
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
