function featureEnabled(value: string | undefined, fallback: boolean) {
  if (value === undefined || value === '') return fallback;
  return !['0', 'false', 'off', 'no'].includes(value.toLowerCase());
}

export const siteFeatures = {
  mobileDetailing: featureEnabled(
    process.env.NEXT_PUBLIC_MOBILE_DETAILING_ENABLED,
    true,
  ),
} as const;
