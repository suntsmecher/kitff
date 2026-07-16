# KitFFA — Frontend (v1: UI with mock data)

This is stage 1 of the KitFFA site: a fully built, polished frontend running on **mock data**.
Nothing here talks to a real backend yet — buttons like "Buy", "Vote", "Redeem" update local
state only, so you can see and feel the whole UI before the backend exists.

## Stack
React + TypeScript + Vite + Tailwind v4 + Framer Motion + lucide-react + react-router-dom.

## Pages
- `/` — Hero (live kill-feed ticker, animated stats, parallax), Features, Updates, Voting
  preview, Store preview, Top supporters, Owner announcement
- `/store` — category filtering, cart drawer, coupon code (`SEASON9` for 10% off), checkout UI
- `/vote` — vote sites, streak tracker, vote leaderboard
- `/dashboard` — profile header, daily rewards, recent activity, redeem code, inventory tab,
  settings tab

All copy and data lives in `src/data/mock.ts` — edit that file to reskin content without
touching components.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
This is a static Vite build, so it deploys with zero config:

1. Push this folder to a GitHub repo.
2. Go to vercel.com -> Add New Project -> import the repo.
3. Vercel auto-detects Vite. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click Deploy.

Or from the CLI:
```bash
npm install -g vercel
vercel        # first deploy, follow prompts
vercel --prod # promote to production
```

## What's NOT here yet (needs a real backend)
Everything in the original brief that requires a server: auth (JWT/Google/Discord), Postgres +
Prisma models, Stripe checkout, rewarded-ad verification, the owner panel and reward/command
editor, real vote-site postback verification, and Cloudinary uploads. Those need your own
API keys/accounts (Stripe, Discord Developer Portal, Google Cloud, a Postgres instance) -- happy
to build that piece next and wire it into this same UI.
