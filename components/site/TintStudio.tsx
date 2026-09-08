'use client';

import { Check, Copy, RotateCcw, SunMedium } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { filmLines } from '@/lib/site-data';

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

export function TintStudio({ compact = false }: { compact?: boolean }) {
  const [vehicle, setVehicle] = useState<(typeof vehicles)[number][0]>('sedan');
  const [lineId, setLineId] = useState('irx');
  const [shadeId, setShadeId] = useState('irx-35');
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
  const darkness = Math.max(0.08, Math.min(0.82, (100 - shade.vlt) / 112));
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
          <span>VLT {shade.vlt}%</span>
        </div>
        <div className={`vehicle-stage ${before ? 'show-before' : ''}`}>
          <div className="stage-light" aria-hidden="true" />
          <Image
            className="vehicle-base"
            src={`/vehicles/${vehicle}.webp`}
            alt={`${vehicles.find(([id]) => id === vehicle)?.[1]} tint appearance preview`}
            width="1536"
            height="1024"
            sizes="(max-width: 780px) 112vw, 62vw"
            priority={!compact}
          />
          {zones.frontSides ? (
            <span
              className="tint-mask"
              style={{
                opacity: before ? 0 : darkness,
                WebkitMaskImage: `url(/vehicles/masks/${vehicle}-glass-frontSides.png)`,
                maskImage: `url(/vehicles/masks/${vehicle}-glass-frontSides.png)`,
              }}
            />
          ) : null}
          {zones.rearSides && vehicle !== 'coupe' ? (
            <span
              className="tint-mask"
              style={{
                opacity: before ? 0 : darkness,
                WebkitMaskImage: `url(/vehicles/masks/${vehicle}-glass-rearSides.png)`,
                maskImage: `url(/vehicles/masks/${vehicle}-glass-rearSides.png)`,
              }}
            />
          ) : null}
          {zones.windshield ? (
            <span
              className="tint-mask"
              style={{
                opacity: before ? 0 : Math.min(darkness, 0.58),
                WebkitMaskImage: `url(/vehicles/masks/${vehicle}-strip-windshield.png)`,
                maskImage: `url(/vehicles/masks/${vehicle}-strip-windshield.png)`,
              }}
            />
          ) : null}
          <div className="stage-floor" aria-hidden="true" />
        </div>
        <button
          className="before-button"
          type="button"
          onPointerDown={() => setBefore(true)}
          onPointerUp={() => setBefore(false)}
          onPointerLeave={() => setBefore(false)}
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
          <label>
            <span>03 · Shade / measured VLT</span>
            <select
              value={shadeId}
              onChange={(event) => setShadeId(event.target.value)}
            >
              {line.shades.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} · {item.vlt}% VLT
                </option>
              ))}
            </select>
          </label>
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
