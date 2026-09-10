# PRO Detailing website

This repository contains the PRO Detailing website, service directory,
interactive tint and wrap visualizers, quote router, and booking-assessment
preview.

## Local preview

Requirements: Node.js 22.13 or newer.

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000/`. Stop the preview with `Ctrl+C` in the terminal
that is running it.

## Validation

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## Docker

Build and run the same production output in a local container:

```powershell
docker build -t pro-detailing:local .
docker run --rm --name pro-detailing-test -p 3001:3000 pro-detailing:local
```

Open `http://localhost:3001/`. Stop the foreground container with `Ctrl+C`.
If it is running in the background, use:

```powershell
docker stop pro-detailing-test
```

Booking submissions remain disabled unless the private database, photo storage,
and approved CRM destination are configured explicitly.
