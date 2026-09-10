'use client';

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  RotateCcw,
  SunMedium,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import Link from '@/components/site/SafeLink';
import { filmLines } from '@/lib/site-data';

const vehicles = [
  ['sedan', 'Sedan'],
  ['coupe', 'Coupe'],
  ['suv', 'SUV'],
  ['tesla', 'EV'],
  ['truck', 'Truck'],
  ['van', 'Van'],
] as const;

type VehicleId = (typeof vehicles)[number][0];
const defaultVehicleId: VehicleId = 'sedan';

type RegisteredTintPair = {
  clearSrc: string;
  tintedSrc: string;
  alt: string;
  width: number;
  height: number;
};

const registeredTintPairs = {
  sedan: {
    clearSrc: '/generated/pro-tints-c63-side-clear-v1.webp',
    tintedSrc: '/generated/pro-tints-c63-side-tinted-v1.webp',
    alt: "the owner's white Mercedes-AMG C63",
    width: 1448,
    height: 1086,
  },
  coupe: {
    clearSrc: '/generated/pro-tints-coupe-clear-v1.webp',
    tintedSrc: '/generated/pro-tints-coupe-tinted-v1.webp',
    alt: 'a white performance coupe',
    width: 1448,
    height: 1086,
  },
  suv: {
    clearSrc: '/generated/pro-tints-suv-clear-v1.webp',
    tintedSrc: '/generated/pro-tints-suv-tinted-v1.webp',
    alt: 'a white three-row performance SUV',
    width: 1448,
    height: 1086,
  },
  tesla: {
    clearSrc: '/generated/pro-tints-ev-clear-v1.webp',
    tintedSrc: '/generated/pro-tints-ev-tinted-v1.webp',
    alt: 'a white electric fastback',
    width: 1448,
    height: 1086,
  },
  truck: {
    clearSrc: '/generated/pro-tints-truck-clear-v1.webp',
    tintedSrc: '/generated/pro-tints-truck-tinted-v1.webp',
    alt: 'a white crew-cab pickup truck',
    width: 1448,
    height: 1086,
  },
  van: {
    clearSrc: '/generated/pro-tints-van-clear-v1.webp',
    tintedSrc: '/generated/pro-tints-van-tinted-v1.webp',
    alt: 'a white premium passenger van',
    width: 1448,
    height: 1086,
  },
} as const satisfies Record<VehicleId, RegisteredTintPair>;

const sedanAngles = [
  {
    id: 'rear',
    label: 'Rear three-quarter',
    shortLabel: 'Rear',
    src: '/generated/pro-tints-c63-rear-three-quarter-v1.webp',
  },
  {
    id: 'side',
    label: 'Side profile',
    shortLabel: 'Side',
    src: '/generated/pro-tints-c63-side-tinted-v1.webp',
  },
  {
    id: 'front',
    label: 'Front three-quarter',
    shortLabel: 'Front',
    src: '/generated/pro-tints-c63-front-three-quarter-v1.webp',
  },
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
  const initialLine =
    filmLines.find((item) => item.id === initialLineId) ?? filmLines[1];
  const initialShade =
    initialLine.shades.find((item) => item.id === `${initialLine.id}-35`) ??
    initialLine.shades[Math.min(4, initialLine.shades.length - 1)];
  const [vehicle, setVehicle] = useState<VehicleId>(defaultVehicleId);
  const [lineId, setLineId] = useState(initialLine.id);
  const [shadeId, setShadeId] = useState(initialShade.id);
  const [state, setState] = useState('Virginia');
  const [zones, setZones] = useState<Record<Zone, boolean>>({
    frontSides: true,
    rearSides: true,
    windshield: false,
  });
  const [comparisonSplit, setComparisonSplit] = useState(50);
  const [sedanAngleIndex, setSedanAngleIndex] = useState(1);
  const [copied, setCopied] = useState(false);

  const line = filmLines.find((item) => item.id === lineId) ?? filmLines[1];
  const shade =
    line.shades.find((item) => item.id === shadeId) ?? line.shades[0];
  const tintOpacity = Math.max(0, Math.min(0.95, 1 - shade.vlt / 100));
  const tintTone = tintTones[line.id];
  const tintClip = `inset(0 0 0 ${comparisonSplit}%)`;
  const sedanAngle = sedanAngles[sedanAngleIndex];
  const isSedanAngleView = vehicle === 'sedan' && sedanAngle.id !== 'side';
  const registeredTintPair = registeredTintPairs[vehicle];
  const hasFullSideSelection =
    zones.frontSides &&
    (vehicle === 'coupe' || zones.rearSides) &&
    !zones.windshield;
  const usesRegisteredTintPair = !isSedanAngleView && hasFullSideSelection;
  const registeredTintStrength = Math.max(
    0.04,
    Math.min(1, (84 - shade.vlt) / 78),
  );
  const activeZoneLabel = [
    zones.frontSides ? 'front' : null,
    zones.rearSides && vehicle !== 'coupe' ? 'rear' : null,
    zones.windshield ? 'brow' : null,
  ]
    .filter(Boolean)
    .join(' + ');
  const hasActiveZone = Boolean(activeZoneLabel);
  const showTintComparison = hasActiveZone && !isSedanAngleView;
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
    setSedanAngleIndex(1);
  }

  function selectVehicle(nextVehicle: VehicleId) {
    setVehicle(nextVehicle);
    setSedanAngleIndex(1);
    if (nextVehicle === 'coupe') {
      setZones((current) => ({ ...current, rearSides: false }));
    } else if (vehicle === 'coupe') {
      setZones((current) => ({ ...current, rearSides: true }));
    }
  }

  function reset() {
    setVehicle(defaultVehicleId);
    setLineId('irx');
    setShadeId('irx-35');
    setState('Virginia');
    setZones({ frontSides: true, rearSides: true, windshield: false });
    setComparisonSplit(50);
    setSedanAngleIndex(1);
    setCopied(false);
  }

  function stepSedanAngle(direction: -1 | 1) {
    setSedanAngleIndex((current) =>
      Math.max(0, Math.min(sedanAngles.length - 1, current + direction)),
    );
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
            {isSedanAngleView
              ? `${sedanAngle.label} · angle preview`
              : `${activeZoneLabel || 'no zones'} · VLT ${shade.vlt}%`}
          </span>
        </div>
        <div className="vehicle-stage tint-comparison-stage">
          <div className="stage-light" aria-hidden="true" />
          <div
            className={`vehicle-composite ${
              usesRegisteredTintPair || isSedanAngleView
                ? 'is-registered-photo-comparison'
                : 'has-showroom-background'
            }`}
          >
            {isSedanAngleView ? (
              <Image
                className="vehicle-base registered-angle-photo"
                src={sedanAngle.src}
                alt={`${sedanAngle.label} view of the owner's white Mercedes-AMG C63 inside the PRO Tints showroom`}
                width="1448"
                height="1086"
                sizes="(max-width: 780px) 100vw, 62vw"
                priority={!compact}
                draggable={false}
              />
            ) : usesRegisteredTintPair ? (
              <>
                <Image
                  className="vehicle-base registered-tint-photo"
                  src={registeredTintPair.clearSrc}
                  alt={`Photo-registered ${shade.label} tint service visualization featuring ${registeredTintPair.alt} inside the PRO Tints showroom`}
                  width={registeredTintPair.width}
                  height={registeredTintPair.height}
                  sizes="(max-width: 780px) 100vw, 62vw"
                  priority={!compact}
                  draggable={false}
                />
                <span
                  className="registered-tint-after"
                  aria-hidden="true"
                  style={{
                    opacity: registeredTintStrength,
                    clipPath: tintClip,
                    WebkitClipPath: tintClip,
                  }}
                >
                  <Image
                    src={registeredTintPair.tintedSrc}
                    alt=""
                    width={registeredTintPair.width}
                    height={registeredTintPair.height}
                    sizes="(max-width: 780px) 100vw, 62vw"
                    draggable={false}
                  />
                </span>
              </>
            ) : (
              <>
                <Image
                  className="vehicle-base"
                  src={`/vehicles/${vehicle}.webp`}
                  alt={`${vehicles.find(([id]) => id === vehicle)?.[1]} tint appearance preview`}
                  width="1536"
                  height="1024"
                  sizes="(max-width: 780px) 112vw, 62vw"
                  priority={!compact}
                  draggable={false}
                />
                {zones.frontSides ? (
                  <span
                    className="tint-mask"
                    aria-hidden="true"
                    style={{
                      opacity: tintOpacity,
                      background: `linear-gradient(145deg, ${tintTone.highlight}, ${tintTone.core} 58%, ${tintTone.lowlight})`,
                      clipPath: tintClip,
                      WebkitClipPath: tintClip,
                      WebkitMaskImage: `url(/vehicles/masks/${vehicle}-glass-frontSides.png)`,
                      maskImage: `url(/vehicles/masks/${vehicle}-glass-frontSides.png)`,
                    }}
                  />
                ) : null}
                {zones.rearSides && vehicle !== 'coupe' ? (
                  <span
                    className="tint-mask"
                    aria-hidden="true"
                    style={{
                      opacity: tintOpacity,
                      background: `linear-gradient(145deg, ${tintTone.highlight}, ${tintTone.core} 58%, ${tintTone.lowlight})`,
                      clipPath: tintClip,
                      WebkitClipPath: tintClip,
                      WebkitMaskImage: `url(/vehicles/masks/${vehicle}-glass-rearSides.png)`,
                      maskImage: `url(/vehicles/masks/${vehicle}-glass-rearSides.png)`,
                    }}
                  />
                ) : null}
                {zones.windshield ? (
                  <span
                    className="tint-mask"
                    aria-hidden="true"
                    style={{
                      opacity: tintOpacity,
                      background: `linear-gradient(145deg, ${tintTone.highlight}, ${tintTone.core} 58%, ${tintTone.lowlight})`,
                      clipPath: tintClip,
                      WebkitClipPath: tintClip,
                      WebkitMaskImage: `url(/vehicles/masks/${vehicle}-strip-windshield.png)`,
                      maskImage: `url(/vehicles/masks/${vehicle}-strip-windshield.png)`,
                    }}
                  />
                ) : null}
              </>
            )}
            <span className="registered-showroom-mark" aria-hidden="true">
              <Image
                src="/brand/pro-tints-optimized.webp"
                alt=""
                width="1100"
                height="204"
                draggable={false}
              />
            </span>
            {showTintComparison ? (
              <>
                <span
                  className="tint-comparison-label tint-comparison-label-clear"
                  aria-hidden="true"
                >
                  Before · base glass
                </span>
                <span
                  className="tint-comparison-label tint-comparison-label-tinted"
                  aria-hidden="true"
                >
                  Tinted · {shade.vlt}% VLT
                </span>
                <span
                  className="tint-comparison-divider"
                  aria-hidden="true"
                  style={{ left: `${comparisonSplit}%` }}
                />
              </>
            ) : isSedanAngleView ? (
              <span className="tint-angle-view-label" aria-hidden="true">
                {sedanAngle.label}
              </span>
            ) : (
              <span className="tint-comparison-label tint-comparison-empty">
                Select a glass area to preview
              </span>
            )}
          </div>
          {showTintComparison ? (
            <input
              className="tint-comparison-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value={comparisonSplit}
              aria-label="Compare the base glass with the selected tint"
              aria-describedby="tint-studio-preview-note"
              aria-valuetext={`${comparisonSplit}% base glass, ${100 - comparisonSplit}% ${shade.vlt}% VLT tint preview`}
              onInput={(event) =>
                setComparisonSplit(Number(event.currentTarget.value))
              }
            />
          ) : null}
          <div className="stage-floor" aria-hidden="true" />
        </div>
        {vehicle === 'sedan' ? (
          <fieldset className="tint-angle-toolbar">
            <legend className="sr-only">
              Rotate the Mercedes-AMG C63 preview
            </legend>
            <button
              className="tint-angle-step"
              type="button"
              aria-label="Show previous car angle"
              disabled={sedanAngleIndex === 0}
              onClick={() => stepSedanAngle(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <label className="tint-angle-scrubber">
              <span className="tint-angle-title">
                <span>Drag to rotate</span>
                <strong>{sedanAngle.label}</strong>
              </span>
              <input
                className="tint-angle-range"
                type="range"
                min="0"
                max={sedanAngles.length - 1}
                step="1"
                value={sedanAngleIndex}
                aria-label="Mercedes-AMG C63 viewing angle"
                aria-valuetext={sedanAngle.label}
                onInput={(event) =>
                  setSedanAngleIndex(Number(event.currentTarget.value))
                }
              />
              <span className="tint-angle-ticks" aria-hidden="true">
                {sedanAngles.map((angle) => (
                  <span key={angle.id}>{angle.shortLabel}</span>
                ))}
              </span>
            </label>
            <button
              className="tint-angle-step"
              type="button"
              aria-label="Show next car angle"
              disabled={sedanAngleIndex === sedanAngles.length - 1}
              onClick={() => stepSedanAngle(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </fieldset>
        ) : showTintComparison ? (
          <p className="tint-comparison-help" aria-hidden="true">
            <span>↔</span> Drag to compare base and tinted glass
          </p>
        ) : null}
        <p className="preview-note" id="tint-studio-preview-note">
          {isSedanAngleView
            ? 'Angle preview only. Return to Side to compare the selected VLT; a full smooth 360° requires a complete multi-frame photo capture.'
            : usesRegisteredTintPair
              ? `Photo-matched clear and tinted ${vehicles.find(([id]) => id === vehicle)?.[1]} showroom views. Drag the divider on the car to compare; actual measured VLT varies with factory glass, lighting and interior color.`
              : 'Body-style appearance preview. Actual shade varies with factory glass, lighting and interior color.'}
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
          <div className="vehicle-selector-footer">
            <p>
              <span>Default</span> Your white Mercedes-Benz C 63 AMG
            </p>
            <Link href="/vehicle-visualizer">
              Choose more 3D vehicles <ChevronRight aria-hidden="true" />
            </Link>
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
                      onChange={() => {
                        setShadeId(item.id);
                        setSedanAngleIndex(1);
                      }}
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
                  onChange={(event) => {
                    setZones((current) => ({
                      ...current,
                      [id]: event.target.checked,
                    }));
                    setSedanAngleIndex(1);
                  }}
                />
                <span>
                  <Check aria-hidden="true" /> {label}
                  {id === 'rearSides' && vehicle === 'coupe'
                    ? ' · included in side-glass preview'
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
