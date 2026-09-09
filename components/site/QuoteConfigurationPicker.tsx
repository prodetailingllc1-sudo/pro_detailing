'use client';

import { Check } from 'lucide-react';

import {
  ceramicProPaintPackages,
  ceramicProSurfaceOfferings,
} from '@/lib/ceramic-pro-data';
import {
  detailingAddOns,
  quoteTierOptionsForService,
  resolveTintLine,
  tintCoverageOptions,
} from '@/lib/quote-options';
import { filmLines } from '@/lib/site-data';

type QuoteConfigurationPickerProps = {
  service: string;
  packageChoice: string;
  selectedAddOnIds: readonly string[];
  tintLineId: string;
  tintShadeId: string;
  selectedTintCoverageIds: readonly string[];
  selectedCeramicSurfaceIds: readonly string[];
  onPackageChange: (choice: string) => void;
  onToggleAddOn: (id: string) => void;
  onTintLineChange: (lineId: string) => void;
  onTintShadeChange: (shadeId: string) => void;
  onToggleTintCoverage: (id: string) => void;
  onToggleCeramicSurface: (id: string) => void;
};

function TintConfigurationPicker({
  lineId,
  shadeId,
  selectedCoverageIds,
  onLineChange,
  onShadeChange,
  onToggleCoverage,
}: {
  lineId: string;
  shadeId: string;
  selectedCoverageIds: readonly string[];
  onLineChange: (lineId: string) => void;
  onShadeChange: (shadeId: string) => void;
  onToggleCoverage: (id: string) => void;
}) {
  const selectedLine = resolveTintLine(lineId) ?? filmLines[1];

  return (
    <section
      className="lead-configuration"
      aria-labelledby="tint-config-heading"
    >
      <div className="lead-configuration-head">
        <span>02 · LLUMAR FILM FAMILY</span>
        <strong id="tint-config-heading">Choose CTX, IRX or AIR.</strong>
        <p>
          Every current shade is shown with its measured VLT. The installed
          reading also depends on your factory glass.
        </p>
      </div>

      <fieldset className="lead-tier-fieldset">
        <legend className="sr-only">Choose a LLumar film family</legend>
        <div className="lead-tier-options lead-film-options">
          {filmLines.map((line) => (
            <label
              className={
                lineId === line.id
                  ? 'lead-tier-option is-selected'
                  : 'lead-tier-option'
              }
              key={line.id}
            >
              <input
                className="lead-choice-input"
                type="radio"
                name="tintLine"
                value={line.id}
                checked={lineId === line.id}
                onChange={() => onLineChange(line.id)}
              />
              <span className="lead-tier-topline">
                <strong>LLumar {line.name}</strong>
                <small>{line.category}</small>
              </span>
              <span className="lead-tier-description">{line.summary}</span>
              <span className="lead-tier-meta">
                {line.shades.length} measured shade options
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="lead-addon-fieldset">
        <legend>03 · Shade / measured VLT</legend>
        <p>
          Product names and measured VLT are both shown because they are not the
          same number.
        </p>
        <div className="lead-addon-options lead-shade-options">
          {selectedLine.shades.map((shade) => {
            const selected = shadeId === shade.id;
            return (
              <label
                className={
                  selected
                    ? 'lead-addon-option is-selected'
                    : 'lead-addon-option'
                }
                key={shade.id}
              >
                <input
                  type="radio"
                  name="tintShade"
                  value={shade.id}
                  checked={selected}
                  onChange={() => onShadeChange(shade.id)}
                />
                <span>
                  <strong>{shade.label}</strong>
                  <small>{shade.vlt}% VLT</small>
                </span>
                <Check aria-hidden="true" />
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="lead-addon-fieldset">
        <legend>04 · Glass areas</legend>
        <p>
          Choose every area you want reviewed. Windshield availability and
          legality are confirmed for the vehicle and jurisdiction.
        </p>
        <div className="lead-addon-options">
          {tintCoverageOptions.map((option) => {
            const selected = selectedCoverageIds.includes(option.id);
            return (
              <label
                className={
                  selected
                    ? 'lead-addon-option is-selected'
                    : 'lead-addon-option'
                }
                key={option.id}
              >
                <input
                  type="checkbox"
                  name="tintCoverageIds"
                  value={option.id}
                  checked={selected}
                  onChange={() => onToggleCoverage(option.id)}
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>Request</small>
                </span>
                <Check aria-hidden="true" />
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}

function CeramicConfigurationPicker({
  packageChoice,
  selectedSurfaceIds,
  onPackageChange,
  onToggleSurface,
}: {
  packageChoice: string;
  selectedSurfaceIds: readonly string[];
  onPackageChange: (choice: string) => void;
  onToggleSurface: (id: string) => void;
}) {
  return (
    <section
      className="lead-configuration"
      aria-labelledby="ceramic-config-heading"
    >
      <div className="lead-configuration-head">
        <span>02 · CERAMIC PRO PAINT PACKAGE</span>
        <strong id="ceramic-config-heading">
          Choose a package—or ask for a recommendation.
        </strong>
        <p>
          These are the Ceramic Pro offerings confirmed for PRO Detailing.
          Preparation, registration and current warranty terms are reviewed
          before work begins.
        </p>
      </div>

      <fieldset className="lead-tier-fieldset">
        <legend className="sr-only">Choose a Ceramic Pro paint package</legend>
        <div className="lead-tier-options">
          {ceramicProPaintPackages.map((offering) => (
            <label
              className={
                packageChoice === offering.id
                  ? 'lead-tier-option is-selected'
                  : 'lead-tier-option'
              }
              key={offering.id}
            >
              <input
                className="lead-choice-input"
                type="radio"
                name="packageChoice"
                value={offering.id}
                checked={packageChoice === offering.id}
                onChange={() => onPackageChange(offering.id)}
              />
              <span className="lead-tier-topline">
                <strong>Ceramic Pro {offering.name}</strong>
                <small>{offering.warranty}</small>
              </span>
              <span className="lead-tier-description">{offering.summary}</span>
              <span className="lead-tier-meta">{offering.category}</span>
            </label>
          ))}
          <label
            className={
              packageChoice
                ? 'lead-tier-option'
                : 'lead-tier-option is-selected'
            }
          >
            <input
              className="lead-choice-input"
              type="radio"
              name="packageChoice"
              value=""
              checked={!packageChoice}
              onChange={() => onPackageChange('')}
            />
            <span className="lead-tier-topline">
              <strong>Help me choose</strong>
              <small>Inspection-led</small>
            </span>
            <span className="lead-tier-description">
              Let the team inspect the paint and recommend the right starting
              point.
            </span>
            <span className="lead-tier-meta">
              No paint package assigned yet
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset className="lead-addon-fieldset">
        <legend>03 · Specialty surfaces</legend>
        <p>
          Select any additional surfaces you want assessed with the paint
          package.
        </p>
        <div className="lead-addon-options">
          {ceramicProSurfaceOfferings.map((offering) => {
            const selected = selectedSurfaceIds.includes(offering.id);
            return (
              <label
                className={
                  selected
                    ? 'lead-addon-option is-selected'
                    : 'lead-addon-option'
                }
                key={offering.id}
              >
                <input
                  type="checkbox"
                  name="ceramicSurfaceIds"
                  value={offering.id}
                  checked={selected}
                  onChange={() => onToggleSurface(offering.id)}
                />
                <span>
                  <strong>{offering.name}</strong>
                  <small>{offering.category}</small>
                </span>
                <Check aria-hidden="true" />
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}

function DetailingConfigurationPicker({
  service,
  packageChoice,
  selectedAddOnIds,
  onPackageChange,
  onToggleAddOn,
}: {
  service: string;
  packageChoice: string;
  selectedAddOnIds: readonly string[];
  onPackageChange: (choice: string) => void;
  onToggleAddOn: (id: string) => void;
}) {
  const tiers = quoteTierOptionsForService(service);
  const mobile = service === 'mobile-detailing';
  const tierHeadingId = 'quote-tier-heading-' + service;

  return (
    <section className="lead-configuration" aria-labelledby={tierHeadingId}>
      <div className="lead-configuration-head">
        <span>{mobile ? '02 · MOBILE PACKAGE' : '02 · DETAILING PACKAGE'}</span>
        <strong id={tierHeadingId}>
          {mobile
            ? 'Choose a mobile detailing tier.'
            : 'Choose a detailing tier.'}
        </strong>
        <p>
          {mobile
            ? 'Select the closest service level. Final mobile scope and price are confirmed after the address and vehicle are reviewed.'
            : 'Published starting prices are shown. Vehicle size and condition can change the final quote.'}
        </p>
      </div>

      <fieldset className="lead-tier-fieldset">
        <legend className="sr-only">
          {mobile
            ? 'Choose a mobile detailing tier'
            : 'Choose a detailing tier'}
        </legend>
        <div className="lead-tier-options">
          {tiers.map((tier) => (
            <label
              className={
                packageChoice === tier.id
                  ? 'lead-tier-option is-selected'
                  : 'lead-tier-option'
              }
              key={tier.id}
            >
              <input
                className="lead-choice-input"
                type="radio"
                name="packageChoice"
                value={tier.id}
                checked={packageChoice === tier.id}
                onChange={() => onPackageChange(tier.id)}
              />
              <span className="lead-tier-topline">
                <strong>{tier.name}</strong>
                <small>{tier.label}</small>
              </span>
              <span className="lead-tier-description">{tier.description}</span>
              <span className="lead-tier-meta">{tier.meta}</span>
            </label>
          ))}
          <label
            className={
              packageChoice
                ? 'lead-tier-option'
                : 'lead-tier-option is-selected'
            }
          >
            <input
              className="lead-choice-input"
              type="radio"
              name="packageChoice"
              value=""
              checked={!packageChoice}
              onChange={() => onPackageChange('')}
            />
            <span className="lead-tier-topline">
              <strong>Help me choose</strong>
              <small>Recommendation</small>
            </span>
            <span className="lead-tier-description">
              Share the condition and let the team recommend the right starting
              point.
            </span>
            <span className="lead-tier-meta">No tier assigned yet</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="lead-addon-fieldset">
        <legend>03 · Optional add-ons</legend>
        <p>
          {mobile
            ? 'Request any add-ons that may be needed. Mobile availability and pricing are confirmed after the location review.'
            : 'Add-ons are requests, not automatic charges. The team confirms whether they are already included or actually needed.'}
        </p>
        <div className="lead-addon-options">
          {detailingAddOns.map((addOn) => {
            const selected = selectedAddOnIds.includes(addOn.id);
            return (
              <label
                className={
                  selected
                    ? 'lead-addon-option is-selected'
                    : 'lead-addon-option'
                }
                key={addOn.id}
              >
                <input
                  type="checkbox"
                  name="addOnIds"
                  value={addOn.id}
                  checked={selected}
                  onChange={() => onToggleAddOn(addOn.id)}
                />
                <span>
                  <strong>{addOn.name}</strong>
                  <small>{mobile ? 'Request' : '+$' + addOn.price}</small>
                </span>
                <Check aria-hidden="true" />
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}

export function QuoteConfigurationPicker({
  service,
  packageChoice,
  selectedAddOnIds,
  tintLineId,
  tintShadeId,
  selectedTintCoverageIds,
  selectedCeramicSurfaceIds,
  onPackageChange,
  onToggleAddOn,
  onTintLineChange,
  onTintShadeChange,
  onToggleTintCoverage,
  onToggleCeramicSurface,
}: QuoteConfigurationPickerProps) {
  if (service === 'tint') {
    return (
      <TintConfigurationPicker
        lineId={tintLineId}
        shadeId={tintShadeId}
        selectedCoverageIds={selectedTintCoverageIds}
        onLineChange={onTintLineChange}
        onShadeChange={onTintShadeChange}
        onToggleCoverage={onToggleTintCoverage}
      />
    );
  }

  if (service === 'ceramic') {
    return (
      <CeramicConfigurationPicker
        packageChoice={packageChoice}
        selectedSurfaceIds={selectedCeramicSurfaceIds}
        onPackageChange={onPackageChange}
        onToggleSurface={onToggleCeramicSurface}
      />
    );
  }

  if (service === 'detailing' || service === 'mobile-detailing') {
    return (
      <DetailingConfigurationPicker
        service={service}
        packageChoice={packageChoice}
        selectedAddOnIds={selectedAddOnIds}
        onPackageChange={onPackageChange}
        onToggleAddOn={onToggleAddOn}
      />
    );
  }

  return null;
}

export function configurationStepCount(service: string) {
  if (service === 'tint') return 3;
  if (
    service === 'ceramic' ||
    service === 'detailing' ||
    service === 'mobile-detailing'
  ) {
    return 2;
  }
  return 0;
}
