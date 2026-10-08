# বাজার দর / BazarDor

প্রয়োজনীয় পণ্যের দাম এক নজরে — বাংলাদেশের বিভিন্ন বাজারের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের দর দেখুন এবং তুলনা করুন।

## Technologies used

- **Next.js (App Router)** — pages, routing, and deployment-ready rendering
- **TypeScript** — typed product, category, and auth flows
- **Tailwind CSS v4** — responsive layout (`max-w-6xl`, mobile-first grids)
- **HeroUI** — buttons, form fields, and the সাজান select
- **Better Auth** — email/password, Google, GitHub, and `updateUser`
- **MongoDB** — Better Auth user/session store
- **react-hot-toast** — login, signup, logout, validation, and protected-route toasts

## Key features

1. **Live market ticker** — infinite marquee of emoji, product name, Bangla price, and ▲/▼ %
2. **Home market board** — top 6 risers, top 6 fallers, and all products as responsive cards
3. **Category browsing with sort** — সাজান: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম (numeric sort, not string)
4. **Protected product details** — login required; min/max/average plus বাজারভিত্তিক আজকের দাম
5. **Better Auth** — সাইন ইন / সাইন আপ, Google & GitHub, profile name update, and toast feedback
6. **Responsive Bangla UI** — mobile, tablet, and desktop; skeletons and friendly 404 pages

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero, risers, fallers, সব পণ্য (`#সব-পণ্য`) |
| `/category/[slug]` | Category products + sort |
| `/product/[slug]` | Product details (protected) |
| `/signin` `/signup` | Email/password + social login |
| `/profile` `/profile/update` | Profile and name update (protected) |

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` with `BETTER_AUTH_SECRET`, MongoDB URI, and (for social login) Google/GitHub OAuth credentials. Set `BETTER_AUTH_URL` to your deployed URL on Vercel.

Product data is loaded from:

- `https://api.api-store.workers.dev/api/bazardor`
- fallback `https://api.abcz.workers.dev/api/bazardor`

## Scripts

```bash
npm run dev
npm run build
npm start
```
