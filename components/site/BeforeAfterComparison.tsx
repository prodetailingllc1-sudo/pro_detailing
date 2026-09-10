'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useId, useState } from 'react';

type ComparisonStyle = CSSProperties & {
  '--coverage-split': string;
};

type BeforeAfterComparisonProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  beforeLabel: string;
  afterLabel: string;
  ariaLabel: string;
  note: string;
  className?: string;
  afterOverlayClassName?: string;
  sizes?: string;
  initialSplit?: number;
};

export function BeforeAfterComparison({
  beforeSrc,
  afterSrc,
  beforeAlt,
  beforeLabel,
  afterLabel,
  ariaLabel,
  note,
  className = '',
  afterOverlayClassName,
  sizes = '(max-width: 780px) 100vw, 60vw',
  initialSplit = 50,
}: BeforeAfterComparisonProps) {
  const [comparisonSplit, setComparisonSplit] = useState(initialSplit);
  const noteId = useId();
  const comparisonStyle: ComparisonStyle = {
    '--coverage-split': `${comparisonSplit}%`,
  };

  return (
    <div
      className={`coverage-comparison ${className}`.trim()}
      style={comparisonStyle}
    >
      <div className="coverage-comparison-media">
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes={sizes}
          draggable={false}
        />
        <span className="coverage-comparison-after" aria-hidden="true">
          <Image src={afterSrc} alt="" fill sizes={sizes} draggable={false} />
          {afterOverlayClassName ? (
            <span className={afterOverlayClassName} />
          ) : null}
        </span>
      </div>

      <span
        className="coverage-comparison-label coverage-comparison-label-before"
        aria-hidden="true"
      >
        {beforeLabel}
      </span>
      <span
        className="coverage-comparison-label coverage-comparison-label-after"
        aria-hidden="true"
      >
        {afterLabel}
      </span>
      <span className="coverage-comparison-divider" aria-hidden="true" />
      <p className="coverage-comparison-note" id={noteId}>
        {note}
      </p>
      <input
        className="coverage-comparison-range"
        type="range"
        min="8"
        max="92"
        step="1"
        value={comparisonSplit}
        aria-label={ariaLabel}
        aria-describedby={noteId}
        aria-valuetext={`${comparisonSplit}% ${beforeLabel}, ${100 - comparisonSplit}% ${afterLabel}`}
        onChange={(event) =>
          setComparisonSplit(Number(event.currentTarget.value))
        }
      />
    </div>
  );
}
