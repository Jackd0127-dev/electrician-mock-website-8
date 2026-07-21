# JD Electrical

Novas Agency electrical website concept. Its canonical workspace location is `sites/jd-electrical`.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run build
```

## Structure

- `src/` — React application code and styles.
- `public/` — static images, identity assets and icons.
- `docs/` — retained design QA evidence.
- `vite.config.ts` and `vercel.json` — build and `/Demo-J-D` routing configuration.

## Deployment

Vercel builds the site with `npm run build` and serves `dist/`. Non-production branches use preview deployments; the public route remains `/Demo-J-D`.
