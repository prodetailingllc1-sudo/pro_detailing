'use client';

import { Copy, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useState } from 'react';

const vehicles = [
  ['wrap-coupe-v2', '2026 Coupe'],
  ['sedan', 'Sedan'],
  ['suv', 'SUV'],
  ['tesla', 'EV'],
  ['truck', 'Truck'],
  ['van', 'Van'],
] as const;

const wrapColors = [
  {
    id: 'obsidian',
    label: 'Obsidian',
    value: '#15191a',
    highlight: '#303638',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    value: '#596164',
    highlight: '#8d9699',
  },
  {
    id: 'racing-green',
    label: 'Racing green',
    value: '#063b29',
    highlight: '#174f38',
  },
  {
    id: 'velocity-blue',
    label: 'Velocity blue',
    value: '#0b4f96',
    highlight: '#2d73b7',
  },
  {
    id: 'carmine',
    label: 'Carmine',
    value: '#851627',
    highlight: '#b93343',
  },
  {
    id: 'satin-bronze',
    label: 'Bronze',
    value: '#795631',
    highlight: '#a97d49',
  },
] as const;

const finishes = [
  ['gloss', 'Gloss'],
  ['satin', 'Satin'],
  ['matte', 'Matte'],
] as const;

export function WrapStudio() {
  const [vehicle, setVehicle] =
    useState<(typeof vehicles)[number][0]>('wrap-coupe-v2');
  const [colorId, setColorId] =
    useState<(typeof wrapColors)[number]['id']>('racing-green');
  const [finish, setFinish] = useState<(typeof finishes)[number][0]>('satin');
  const [before, setBefore] = useState(false);
  const [copied, setCopied] = useState(false);

  const color =
    wrapColors.find((option) => option.id === colorId) ?? wrapColors[0];
  const vehicleLabel =
    vehicles.find(([id]) => id === vehicle)?.[1] ?? vehicles[0][1];
  const finishLabel =
    finishes.find(([id]) => id === finish)?.[1] ?? finishes[0][1];
  const buildText = `${vehicleLabel} · ${color.label} · ${finishLabel} color-wrap concept`;
  const vehicleImage = `/vehicles/${vehicle}.webp`;
  const maskStyle = {
    '--wrap-color': color.value,
    '--wrap-highlight': color.highlight,
    WebkitMaskImage: `url(/vehicles/masks/${vehicle}-paint.png)`,
    maskImage: `url(/vehicles/masks/${vehicle}-paint.png)`,
  } as CSSProperties & Record<'--wrap-color' | '--wrap-highlight', string>;

  async function copyBuild() {
    try {
      await navigator.clipboard.writeText(`PRO Wrap Studio: ${buildText}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setVehicle('wrap-coupe-v2');
    setColorId('racing-green');
    setFinish('satin');
    setBefore(false);
    setCopied(false);
  }

  return (
    <div className="tint-studio wrap-studio">
      <div className="studio-preview wrap-preview">
        <div className="studio-hud" aria-hidden="true">
          <span>REGISTERED BODY PREVIEW</span>
          <span>
            {color.label} · {finishLabel}
          </span>
        </div>
        <div className={`vehicle-stage ${before ? 'show-before' : ''}`}>
          <div className="stage-light" aria-hidden="true" />
          <div
            className={`vehicle-composite wrap-vehicle-composite wrap-finish-${finish} ${
              vehicle === 'wrap-coupe-v2' ? 'is-new-wrap-coupe' : ''
            }`}
          >
            <Image
              className="vehicle-base"
              src={vehicleImage}
              alt={`${vehicleLabel} color-wrap appearance preview`}
              width="1536"
              height="1024"
              sizes="(max-width: 780px) 112vw, 62vw"
            />
            <span
              className="wrap-paint-mask wrap-color-mask"
              aria-hidden="true"
              style={maskStyle}
            />
            <span
              className={`wrap-paint-mask wrap-finish-mask finish-${finish}`}
              aria-hidden="true"
              style={maskStyle}
            />
            <Image
              className="vehicle-detail-layer"
              src={vehicleImage}
              alt=""
              aria-hidden="true"
              width="1536"
              height="1024"
              sizes="(max-width: 780px) 112vw, 62vw"
              draggable={false}
            />
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
          Hold for original paint
        </button>
        <p className="preview-note">
          Concept preview only. Exact film, color, finish, seams, availability
          and service scope must be confirmed by the studio.
        </p>
      </div>

      <div className="studio-controls wrap-controls">
        <div className="control-block">
          <div className="control-heading">
            <span>01</span>
            <strong>Vehicle profile</strong>
          </div>
          <div
            className="vehicle-options"
            role="radiogroup"
            aria-label="Wrap vehicle profile"
          >
            {vehicles.map(([id, label]) => (
              <label className={vehicle === id ? 'is-active' : ''} key={id}>
                <input
                  type="radio"
                  name="wrap-vehicle"
                  value={id}
                  checked={vehicle === id}
                  onChange={() => setVehicle(id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="control-block">
          <div className="control-heading">
            <span>02</span>
            <strong>Color direction</strong>
          </div>
          <div
            className="wrap-color-options"
            role="radiogroup"
            aria-label="Wrap color direction"
          >
            {wrapColors.map((option) => (
              <label
                className={colorId === option.id ? 'is-active' : ''}
                key={option.id}
              >
                <input
                  type="radio"
                  name="wrap-color"
                  value={option.id}
                  checked={colorId === option.id}
                  onChange={() => setColorId(option.id)}
                />
                <span
                  className="wrap-swatch"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(135deg, ${option.highlight}, ${option.value})`,
                  }}
                />
                <strong>{option.label}</strong>
              </label>
            ))}
          </div>
        </div>

        <div className="control-block">
          <div className="control-heading">
            <span>03</span>
            <strong>Finish direction</strong>
          </div>
          <div
            className="wrap-finish-options"
            role="radiogroup"
            aria-label="Wrap finish direction"
          >
            {finishes.map(([id, label]) => (
              <label className={finish === id ? 'is-active' : ''} key={id}>
                <input
                  type="radio"
                  name="wrap-finish"
                  value={id}
                  checked={finish === id}
                  onChange={() => setFinish(id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="build-summary">
          <span>YOUR CONCEPT</span>
          <p>{buildText}</p>
          <div>
            <button type="button" onClick={copyBuild}>
              <Copy aria-hidden="true" /> {copied ? 'Copied' : 'Copy concept'}
            </button>
            <button type="button" onClick={reset}>
              <RotateCcw aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        <p className="wrap-brand-note">
          This original PRO Detailing concept tool is not the Ceramic Pro Shift
          visualizer. Ceramic Pro coatings protect and enhance the existing
          finish; they do not recolor the vehicle.
        </p>
      </div>
    </div>
  );
}
