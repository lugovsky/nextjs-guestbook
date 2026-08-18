# Kindred Guestbook

A small full-stack deployment demo built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui. Visitors can add a message through the UI, which calls a Next.js route handler and immediately adds the returned entry to the page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
PORT=3000 APP_ENV=demo APP_VERSION=1.0.0 npm start
```

Useful endpoints:

- `GET /api/health` — service status, environment, version, and server time
- `GET /api/entries` — current guestbook entries
- `POST /api/entries` — create an entry with `{ "name": "...", "message": "..." }`

Guestbook entries are stored in server memory for this demo and reset whenever the instance restarts. Replace `src/lib/guestbook.ts` with a database-backed implementation if durable or multi-instance storage is required.
