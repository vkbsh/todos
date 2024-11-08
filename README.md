# To-Do List App

This project is a To-Do List application built with:

-   Next.js
-   Clerk - Auth
-   Cloudflare Pages - Provider
-   Cloudflare D1 - Database
-   Drizzle - ORM
-   React Query - Data fetching (client side)
-   ShadCN - simple UI components
-   framer-motion - animation

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

```env
CLOUDFLARE_D1_API_KEY=<your-cloudflare-api-key>
CLOUDFLARE_D1_DATABASE_ID=<your-database-id>
NEXT_PUBLIC_API_URL=<base-url-for-api>
```

## Running the Project

To start the development server, use the following command:

```bash
npm run dev
```

This will start the app on `http://localhost:3000`.

## Deployment

Cloudflare Pages

```bash
npm run deploy
```

[Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/get-started/)

## Checklist

| Requirement                             | Status  |
| --------------------------------------- | ------- |
| Responsive UI with Tailwind CSS         | ✅ Done |
| Add/Edit/Delete To-Do items             | ✅ Done |
| Mark To-Do items as completed           | ✅ Done |
| Client-side routing with Next.js        | ✅ Done |
| CRUD operations with Next.js API routes | ✅ Done |
| Data storage with Cloudflare D1         | ✅ Done |
| TypeScript usage                        | ✅ Done |
| Dark mode toggle                        | ✅ Done |
| README file                             | ✅ Done |
| Deployment                              | ✅ Done |

## Future Work

-   [ ] Keep local state in sync with Cloudflare D1 (for better UX)
-   [ ] Avoid name duplication of todos
-   [ ] Placeholders and loading states
-   [ ] Add search functionality
-   [ ] More validations and error handling
