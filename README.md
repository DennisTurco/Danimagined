# Danimagined

Portfolio website for **Danimagined** - illustration and concept art. It showcases artworks, commission pricing and a contact form for requesting custom pieces. The site content is in Italian.

Content (works, packages, landing, about, contacts) is managed in [Sanity](https://www.sanity.io/) through the Studio embedded at `/studio`.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Sanity](https://www.sanity.io/) via [next-sanity](https://github.com/sanity-io/next-sanity) (headless CMS)

## Project structure

```
app/
  (site)/                     Public website (shares Nav, Footer, JSON-LD)
    page.tsx                  Home page
    opere/page.tsx            Works gallery
    opere/[slug]/page.tsx     Single work detail
    contatti/page.tsx         Contact page
  studio/[[...tool]]/         Embedded Sanity Studio (/studio)
  api/revalidate/route.ts     Webhook that refreshes pages when content is published
  sitemap.ts, robots.ts       SEO files generated from content
components/                   UI components (Hero, Nav, Pricing, ContactForm, ...)
lib/content.ts                Data layer: GROQ queries to Sanity
lib/defaults.ts               Sample content, used when Sanity is not configured
lib/types.ts                  Content types shared by components
lib/site.ts                   Site URL and name
lib/emailjs.ts                Sends the contact form with EmailJS
sanity/schemaTypes/           Sanity schemas (works, categories, packages, landing, about, settings)
sanity.config.ts              Studio configuration
scripts/seed-sanity.ts        Imports the sample content and images into Sanity
public/images/                Static images (logo, sample content)
```

## Local setup

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (bundled with Node.js)
- A [Sanity](https://www.sanity.io/) project (optional for local development)

### Install and run

1. Clone the repository and move into it:

   ```bash
   git clone https://github.com/DennisTurco/Danimagined.git danimagined
   cd danimagined
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create the environment file and fill in the Sanity project ID (see [Sanity setup](#sanity-setup)):

   ```bash
   cp .env.example .env.local
   ```

   Without a project ID the site still runs, using the sample content in `lib/defaults.ts`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

### Environment variables

| Variable                        | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (sanity.io/manage → project)               |
| `NEXT_PUBLIC_SANITY_DATASET`    | Dataset name, default `production`                           |
| `SANITY_REVALIDATE_SECRET`      | Shared secret for the publish webhook (any long random string) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service that sends the contact form (see [Contact form](#contact-form-emailjs)) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template for the contact form                       |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key (*Account → General*)                     |

### Available scripts

| Command               | Description                                     |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Start the development server on port 3000       |
| `npm run build`       | Create an optimized production build            |
| `npm run start`       | Serve the production build (run `build` first)  |
| `npm run lint`        | Run ESLint                                      |
| `npm run sanity:seed` | Import the sample content and images into Sanity |

## Sanity setup

1. **Project**: create a project at [sanity.io/manage](https://www.sanity.io/manage) (or use the existing one) and put its ID in `.env.local`.
2. **CORS**: in the project's *API → CORS origins*, add `http://localhost:3000` and the production URL (`https://www.danimagined.com`), both with *Allow credentials* checked. This lets the embedded Studio log in.
3. **Initial content** (optional): import the current sample works, packages and texts, including images:

   ```bash
   npx sanity login
   ```

   ```bash
   npm run sanity:seed
   ```

   Existing documents are not overwritten. To force it, run `npm run sanity:seed -- --replace`.
4. **Instant updates**: pages are cached and refreshed every hour. To publish changes immediately, create a webhook in *API → Webhooks*:
   - URL: `https://www.danimagined.com/api/revalidate`
   - Trigger on: create, update, delete
   - HTTP method: POST
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`

### What can be edited in the Studio

| Section         | Content                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------- |
| Landing (home)  | Hero image and texts, cover work, "Il lavoro" section and services, marquee words, pricing texts, final call to action |
| Chi sono        | Photo, title, paragraphs (the first letter becomes a drop cap), quote, link text              |
| Opere           | Title, image (with focal point and alt text), category, featured, description, year, technique, price, order |
| Categorie       | Name, filter label, order - gallery filters are generated from the categories in use          |
| Pacchetti       | Name, starting price, description, included items, "most requested" highlight, order - also used as options in the contact form |
| Impostazioni    | Email, social profiles, Google Calendar booking link, commissions open/closed, response time, SEO title, description and share image |

Featured works appear in the home carousel; if none is featured, the first eight are shown.

## Contact form (EmailJS)

The form on `/contatti` sends the request with [EmailJS](https://www.emailjs.com), without opening the visitor's mail app. Until the three `NEXT_PUBLIC_EMAILJS_*` variables are set, it falls back to opening the mail app.

1. **Service**: in *Email Services*, connect the mailbox that sends the emails and copy its Service ID.
2. **Template**: in *Email Templates*, create one with:
   - To Email: the address that receives the requests
   - Subject: `{{subject}}`
   - Reply To: `{{email}}`, so replying goes straight to the visitor
   - Content: e.g. `{{name}} ({{email}})` followed by `{{message}}`
3. **Public key**: copy it from *Account → General*.
4. **Security**: in *Account → Security*, restrict requests to `danimagined.com` and enable a rate limit.
5. Put the three values in `.env.local` and in the hosting environment variables, then redeploy.

## Notes

- The contact form opens the visitor's email client with a pre-filled message (`mailto:`); there is no backend.
- Call booking embeds the Google Calendar appointment schedule set in *Impostazioni*. When the link is empty, the panel falls back to an email request. Links to `/contatti#prenota` open the booking dialog directly.
- The site URL in [`lib/site.ts`](lib/site.ts) is used for canonical links, `sitemap.xml`, `robots.txt`, Open Graph tags and JSON-LD structured data, so update it if the domain changes.
- On npm 10.8 installing new packages may fail with `Cannot read properties of null (reading 'edgesOut')` (an npm bug). Use `npx npm@11 install <package>` instead.
