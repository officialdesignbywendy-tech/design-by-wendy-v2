# Deploying Design by Wendy to Vercel

## 1. Upload to GitHub
Upload the contents of this folder to your repository (replace the old files). Do not upload `node_modules`.

## 2. Vercel project settings
Import the GitHub repo in Vercel. `vercel.json` already sets these, so you should not need to change anything:

| Setting | Value |
|---|---|
| Framework Preset | Other (set by `vercel.json`: `framework: null`) |
| Install Command | leave default (Vercel detects `bun.lock` and uses Bun) |
| Build Command | `npm run build` (runs `vite build`) |
| Output Directory | `.vercel/output` |
| Node.js version | 22.x (or the latest available) |

How it works: when Vercel builds, it sets `VERCEL=1`. `vite.config.ts` then tells Nitro to use its
`vercel` preset, which writes the server and static files in the format Vercel expects. Nothing
changes for the Lovable preview or local development.

## 3. Environment variables (Project Settings > Environment Variables)
| Name | Required | Value |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | Secret key from https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | No | Defaults to officialdesignbywendy@gmail.com |
| `CONTACT_FROM_EMAIL` | No | Sender, e.g. `Design by Wendy <hello@yourdomain.com>` |

Add them for Production **and** Preview, then redeploy. Without `RESEND_API_KEY` the form shows
visitors a message asking them to email you directly. It never pretends a message was sent.

Resend's free default sender (`onboarding@resend.dev`) can only deliver to the email address you
signed up to Resend with. To receive enquiries at officialdesignbywendy@gmail.com reliably, either
sign up to Resend with that Gmail address, or verify your own domain in Resend and set `CONTACT_FROM_EMAIL`.

## 4. Check after the first deploy
- Open the preview URL, then paste a deep link such as `/#project-divaluxe` into a new tab: it should open the project.
- Send a test message from the contact form and confirm it arrives.
- All images are included locally. See ASSETS-NEEDED.md for the hero portrait note.

## If the Vercel build fails
The Vercel setup could not be test-built where this package was prepared (no package installation was
possible), so this is the first place to look. Try, in order:
1. Read the build log's first error and send it to me.
2. In Vercel set Framework Preset to **TanStack Start** and clear the Output Directory override, or
3. Add the environment variable `NITRO_PRESET` = `vercel`.
