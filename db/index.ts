import { env } from 'cloudflare:workers';

export function getD1() {
  if (!env.DB) {
    throw new Error(
      'Cloudflare D1 binding `DB` is unavailable. Set `d1` to `DB` in .openai/hosting.json.',
    );
  }
  return env.DB;
}

export function getPrivateFiles() {
  if (!env.FILES) {
    throw new Error(
      'Cloudflare R2 binding `FILES` is unavailable. Set `r2` to `FILES` in .openai/hosting.json.',
    );
  }
  return env.FILES;
}
