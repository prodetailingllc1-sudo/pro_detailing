'use client';

import { Check, Copy, RotateCcw, SunMedium } from 'lucide-react';
import Image from 'next/image';
import { useId, useMemo, useState } from 'react';

import { filmLines } from '@/lib/site-data';
import { tintWindowPaths } from '@/lib/tint-window-paths';

const vehicles = [
  ['sedan', 'Sedan'],
  ['coupe', 'Coupe'],
  ['suv', 'SUV'],
  ['tesla', 'EV'],
  ['truck', 'Truck'],
  ['van', 'Van'],
] as const;

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
] as const;

type Zone = 'frontSides' | 'rearSides' | 'windshield';

const tintTones = {
  ctx: {
    highlight: '#1a2320',
    core: '#020403',
    lowlight: '#111914',
  },
  irx: {
    highlight: '#111d19',
    core: '#010302',
    lowlight: '#0b1510',
  },
  air: {
    highlight: '#2c3734',
    core: '#101513',
    lowlight: '#202b27',
  },
} as const;

export function TintStudio({
  compact = false,
  initialLineId = 'irx',
}: {
  compact?: boolean;
  initialLineId?: string;
}) {
  const instanceId = useId().replace(/:/g, '');
  const initialLine =
    filmLines.find((item) => item.id === initialLineId) ?? filmLines[1];
  const initialShade =
    initialLine.shades.find((item) => item.id === `${initialLine.id}-35`) ??
    initialLine.shades[Math.min(4, initialLine.shades.length - 1)];
  const [vehicle, setVehicle] = useState<(typeof vehicles)[number][0]>('sedan');
  const [lineId, setLineId] = useState(initialLine.id);
  const [shadeId, setShadeId] = useState(initialShade.id);
  const [state, setState] = useState('Virginia');
  const [zones, setZones] = useState<Record<Zone, boolean>>({
    frontSides: true,
    rearSides: true,
    windshield: false,
  });
  const [before, setBefore] = useState(false);
  const [copied, setCopied] = useState(false);

  const line = filmLines.find((item) => item.id === lineId) ?? filmLines[1];
  const shade =
    line.shades.find((item) => item.id === shadeId) ?? line.shades[0];
  const tintOpacity = Math.max(
    0.04,
    Math.min(0.82, 1 - Math.sqrt(shade.vlt / 100)),
  );
  const tintTone = tintTones[line.id];
  const windowPaths = tintWindowPaths[vehicle];
  const tintGradientId = `tint-glass-${vehicle}-${instanceId}`;
  const activeZoneLabel = [
    zones.frontSides ? 'front' : null,
    zones.rearSides && vehicle !== 'coupe' ? 'rear' : null,
    zones.windshield ? 'brow' : null,
  ]
    .filter(Boolean)
    .join(' + ');
  const supportedState =
    state === 'Virginia' ||
    state === 'Maryland' ||
    state === 'District of Columbia';

  const buildText = useMemo(
    () =>
      `${vehicles.find(([id]) => id === vehicle)?.[1]} · ${line.name} · ${shade.label} (${shade.vlt}% measured VLT) · ${
        Object.entries(zones)
          .filter(([, selected]) => selected)
          .map(
            ([zone]) =>
              ({
                frontSides: 'front sides',
                rearSides: 'rear sides',
                windshield: 'windshield strip',
              })[zone],
          )
          .join(', ') || 'no zones'
      } · ${state}`,
    [vehicle, line.name, shade.label, shade.vlt, zones, state],
  );

  function selectLine(nextLine: string) {
    const next = filmLines.find((item) => item.id === nextLine) ?? filmLines[0];
    setLineId(next.id);
    setShadeId(next.shades[Math.min(4, next.shades.length - 1)].id);
  }

  function selectVehicle(nextVehicle: (typeof vehicles)[number][0]) {
    setVehicle(nextVehicle);
    if (nextVehicle === 'coupe') {
      setZones((current) => ({ ...current, rearSides: false }));
    }
  }

  function reset() {
    setVehicle('sedan');
    setLineId('irx');
    setShadeId('irx-35');
    setState('Virginia');
    setZones({ frontSides: true, rearSides: true, windshield: false });
    setBefore(false);
    setCopied(false);
  }

  async function copyBuild() {
    try {
      await navigator.clipboard.writeText(
        `PRO Tints Studio build: ${buildText}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`tint-studio ${compact ? 'is-compact' : ''}`}>
      <div className="studio-preview">
        <div className="studio-hud" aria-hidden="true">
          <span>LIVE PREVIEW</span>
          <span>
            {activeZoneLabel || 'no zones'} · VLT {shade.vlt}%
          </span>
        </div>
        <div className={`vehicle-stage ${before ? 'show-before' : ''}`}>
          <div className="stage-light" aria-hidden="true" />
          <div className="vehicle-composite">
            <Image
              className="vehicle-base"
              src={`/vehicles/${vehicle}.webp`}
              alt={`${vehicles.find(([id]) => id === vehicle)?.[1]} tint appearance preview`}
              width="1536"
              height="1024"
              sizes="(max-width: 780px) 112vw, 62vw"
              priority={!compact}
            />
            <svg
              className="tint-vector-overlay"
              viewBox="0 0 768 512"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              focusable="false"
              shapeRendering="geometricPrecision"
              style={{ opacity: before ? 0 : tintOpacity }}
            >
              <defs>
                <linearGradient id={tintGradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={tintTone.highlight} />
                  <stop offset="54%" stopColor={tintTone.core} />
                  <stop offset="100%" stopColor={tintTone.lowlight} />
                </linearGradient>
              </defs>
              <g
                fill={`url(#${tintGradientId})`}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="0.65"
              >
                {zones.rearSides && vehicle !== 'coupe'
                  ? windowPaths.rearSides.map((path, index) => (
                      <path d={path} key={`rear-${index}`} />
                    ))
                  : null}
                {zones.frontSides
                  ? windowPaths.frontSides.map((path, index) => (
                      <path d={path} key={`front-${index}`} />
                    ))
                  : null}
                {zones.windshield
                  ? windowPaths.windshield.map((path, index) => (
                      <path d={path} key={`windshield-${index}`} />
                    ))
                  : null}
              </g>
            </svg>
          </div>
          <div className="stage-floor" aria-hidden="true" />
        </div>
        <button
          className="before-button"
          type="button"
          onPointerDown={() => setBefore(true)}
          onPointerUp={() => setBefore(false)}
          onPointerCancel={() => setBefore(false)}
          onPointerLeave={() => setBefore(false)}
          onBlur={() => setBefore(false)}
          onKeyDown={(event) => {
            if (event.key === ' ' || event.key === 'Enter') setBefore(true);
          }}
          onKeyUp={() => setBefore(false)}
        >
          Hold for before
        </button>
        <p className="preview-note">
          Appearance preview only. Actual shade varies with factory glass,
          lighting and interior color.
        </p>
      </div>

      <div className="studio-controls">
        <div className="control-block">
          <div className="control-heading">
            <span>01</span>
            <strong>Vehicle profile</strong>
          </div>
          <div
            className="vehicle-options"
            role="radiogroup"
            aria-label="Vehicle profile"
          >
            {vehicles.map(([id, label]) => (
              <label className={vehicle === id ? 'is-active' : ''} key={id}>
                <input
                  type="radio"
                  name={`vehicle-${compact ? 'compact' : 'full'}`}
                  value={id}
                  checked={vehicle === id}
                  onChange={() => selectVehicle(id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="control-block control-grid">
          <label>
            <span>02 · Film family</span>
            <select
              value={lineId}
              onChange={(event) => selectLine(event.target.value)}
            >
              {filmLines.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {item.category}
                </option>
              ))}
            </select>
          </label>
          <div className="shade-control">
            <span className="control-label">03 · Shade / measured VLT</span>
            <div
              className="shade-options"
              role="radiogroup"
              aria-label="Shade and measured VLT"
            >
              {line.shades.map((item) => {
                const swatchDarkness = Math.max(
                  0,
                  Math.min(0.97, 1 - item.vlt / 100),
                );

                return (
                  <label
                    className={shadeId === item.id ? 'is-active' : ''}
                    key={item.id}
                  >
                    <input
                      type="radio"
                      name={`shade-${compact ? 'compact' : 'full'}`}
                      value={item.id}
                      checked={shadeId === item.id}
                      aria-label={`${item.label}, ${item.vlt}% measured VLT`}
                      onChange={() => setShadeId(item.id)}
                    />
                    <span
                      className="shade-option-swatch"
                      aria-hidden="true"
                      style={{
                        background: `linear-gradient(135deg, rgba(18, 22, 20, ${swatchDarkness}), rgba(0, 0, 0, ${swatchDarkness}))`,
                      }}
                    />
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.vlt}% VLT</small>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="control-block">
          <div className="control-heading">
            <span>04</span>
            <strong>Preview zones</strong>
          </div>
          <div className="zone-options">
            {(
              [
                ['frontSides', 'Front side glass'],
                ['rearSides', 'Rear side glass'],
                ['windshield', 'Windshield brow'],
              ] as const
            ).map(([id, label]) => (
              <label key={id}>
                <input
                  type="checkbox"
                  checked={zones[id]}
                  disabled={id === 'rearSides' && vehicle === 'coupe'}
                  onChange={(event) =>
                    setZones((current) => ({
                      ...current,
                      [id]: event.target.checked,
                    }))
                  }
                />
                <span>
                  <Check aria-hidden="true" /> {label}
                  {id === 'rearSides' && vehicle === 'coupe'
                    ? ' · included in side mask'
                    : ''}
                </span>
              </label>
            ))}
          </div>
        </div>

        {!compact ? (
          <div className="control-block guidance-block">
            <label>
              <span>05 · Registration jurisdiction</span>
              <select
                value={state}
                onChange={(event) => setState(event.target.value)}
              >
                {states.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <div
              className={`guidance-status ${supportedState ? 'has-guidance' : ''}`}
            >
              <SunMedium aria-hidden="true" />
              <div>
                <strong>
                  {supportedState
                    ? 'More vehicle details needed'
                    : 'Guidance unavailable'}
                </strong>
                <p>
                  {supportedState
                    ? 'Vehicle type, factory glass and a finished-window meter reading determine the result. We verify the configuration during your consultation.'
                    : 'We have not published reviewed guidance for this jurisdiction. Ask the studio and verify with your state authority before choosing a shade.'}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="build-summary">
          <span>YOUR PREVIEW</span>
          <p>{buildText}</p>
          <div>
            <button type="button" onClick={copyBuild}>
              <Copy aria-hidden="true" /> {copied ? 'Copied' : 'Copy build'}
            </button>
            <button type="button" onClick={reset}>
              <RotateCcw aria-hidden="true" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
