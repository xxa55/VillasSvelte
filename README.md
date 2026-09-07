# Downtown Oasis Villas

A SvelteKit villa site with Supabase login and data, a public guest book, and manual booking requests. Guests submit preferred dates; the owner checks the Hotext calendar and then confirms the stay or contacts the guest if it cannot be honored.

## Local setup

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Copy `.env.example` to `.env` and add the Supabase credentials.
3. In Supabase Authentication, enable Email sign-in and add the local and production site URLs to the redirect allow list.
4. Install dependencies and start the app:

```sh
npm install
npm run dev
```

## Booking requests

Booking requests are saved in Supabase with the `requested` status. After the guest transfers the deposit, they upload a payment photo. The image is stored in the private `payment-proofs` bucket and SendGrid emails `oasis55168@gmail.com` a seven-day signed link to review it. The request then changes to `under_review`.

Run `supabase/schema.sql` in the Supabase SQL editor before deployment to create the private storage bucket and the payment-proof columns. Check the Hotext calendar and payment receipt before changing a request to `confirmed` in the Supabase `bookings` table. Only confirmed bookings block dates on the website calendar. Contact the guest using `guest_email` if the requested stay is unavailable.

`SENDGRID_FROM_EMAIL` must be a verified SendGrid sender so payment-proof notifications can be delivered.

## Availability management

`oasis55168@gmail.com` is the administrator account. After signing in, it can open `/admin/availability` to mark a Villa A or Villa B date range unavailable after checking Hotext. These manual blocks, along with confirmed bookings, appear as unavailable dates to guests. The administrator can remove a block when the dates are available again.

## Google sign-in

The sign-in page supports Google OAuth through Supabase. In Supabase, open **Authentication > Providers > Google**, enable Google, and add the Google OAuth client ID and client secret. In Google Cloud, add this Supabase callback URL to the OAuth client's authorized redirect URIs:

```
https://twfnvrdkwverjwckntvi.supabase.co/auth/v1/callback
```

In Supabase **Authentication > URL Configuration**, add the local URL and the GitHub Pages URL to the redirect allow list, including `https://YOUR-DOMAIN/auth/callback`.

## Deploying to GitHub Pages

Push to `main` to run the GitHub Pages workflow. This repository is the static public-site copy; server-side login, booking, payment, and admin actions belong in the Vercel repository. Set `PUBLIC_SITE_URL` to the final HTTPS origin.

## Verification


```sh
npm run check
npm run build
```
