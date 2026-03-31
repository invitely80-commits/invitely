# Invitely

Invitely is a production-oriented MVP for creating elegant wedding invitation websites with a companion SaaS dashboard.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- Prisma with PostgreSQL on Neon
- Auth.js credentials auth
- Cloudinary uploads
- Resend email notifications
- Framer Motion micro-interactions

## Core user flow

1. Visitors land on `/`
2. They sign up at `/sign-up`
3. They create an invite from `/dashboard/invite/new`
4. They share the generated `/{slug}` link
5. Guests RSVP on the public invite page

## Local setup

1. Install dependencies

```bash
npm install
```

2. Copy the environment file and fill in your credentials

```powershell
Copy-Item .env.example .env.local
Copy-Item .env.local .env
```

Next.js reads `.env.local`, while the Prisma CLI reads `.env` during commands like
`prisma migrate dev`. Keep both files aligned in local development.

3. Run Prisma migrations and generate the client

```bash
npx prisma migrate dev
```

4. Start the app

```bash
npm run dev
```

## Environment variables

Required values are listed in `.env.example`.

- `DATABASE_URL`: Neon pooled connection string
- `DIRECT_URL`: Neon direct connection string for Prisma migrations
- `AUTH_SECRET`: Random secret for Auth.js session encryption
- `APP_URL`: Canonical app URL, such as `http://localhost:3000` or your Vercel production URL
- `GOOGLE_CLIENT_ID`: OAuth client ID from Google Cloud
- `GOOGLE_CLIENT_SECRET`: OAuth client secret from Google Cloud
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## Database

The Prisma schema includes:

- `User`
- `Invite`
- `RSVP`

Invite content is stored as validated JSON so the template system stays flexible without over-engineering the schema.

## Deployment on Vercel

1. Create a Neon Postgres database and add `DATABASE_URL` and `DIRECT_URL`
2. Add the Auth.js, Google OAuth, Cloudinary, and Resend environment variables in Vercel
3. Set `APP_URL` to your production domain
4. If using Google sign-in, set the Google OAuth callback URL to `https://your-domain.com/api/auth/callback/google`
5. Deploy the project to Vercel
6. Run `npx prisma migrate deploy` against production before serving traffic

For a safe production build command, use:

```bash
prisma generate && next build
```

## Notes

- Public invite pages are marked `noindex`
- Dashboard routes are protected server-side
- Invite ownership is enforced in edit actions
- RSVP submissions are validated and stored before email delivery is attempted
