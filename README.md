# JournalX

A modern MERN blogging platform (React + Vite frontend, Express + MongoDB backend) with authentication, image uploads, comments, bookmarks, and a responsive UI.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start (local development)](#quick-start-local-development)
- [Environment variables](#environment-variables)
- [Running in production (build)](#running-in-production-build)
- [Deploying (Vercel + Render)](#deploying-vercel--render)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- JWT authentication (register / login)
- Create, edit and delete blog posts
- Image uploads (Cloudinary or local uploads)
- Comments, likes, bookmarks
- Categories, search, and basic dashboard
- Responsive UI with Tailwind CSS

## Tech stack

- Frontend: React (Vite), Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Auth: JWT
- Deployment examples: Vercel (frontend) + Render (backend)

## Quick start (local development)

1. Clone the repo

```bash
git clone <repo-url> JournalX
cd "JournalX"
```

2. Install dependencies

```bash
# Server
cd server
npm install

# In a separate terminal: Client
cd ../client
npm install
```

3. Create environment files

- Create `server/.env` (see **Environment variables** below)
- Create `client/.env` (or `.env.local`) and set `VITE_API_BASE_URL` during production deploys. Leave blank for local dev (client proxies to local server)

4. Run servers

```bash
# Start backend (server)
cd server
npm run dev    # nodemon (development)

# Start frontend (client)
cd ../client
npm run dev    # Vite dev server
```

Open http://localhost:5173 in your browser (Vite will print the local & network URLs). The backend runs on port 5000 by default.

## Environment variables

Server (`server/.env`):

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=some_long_random_secret
FRONTEND_URL=https://your-frontend.example.com   # production only; comma-separated allowed
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Client (`client/.env` or Vercel env):

```
VITE_API_BASE_URL=https://your-backend.example.com
```

Note: For local development, leave `VITE_API_BASE_URL` empty so the client uses the local proxy or `http://localhost:5000` fallback.

## Running in production (build)

Build the frontend:

```bash
cd client
npm run build
```

Serve the built files from any static host or use Vercel.

Backend production start:

```bash
cd server
npm start
```

See `DEPLOY.md` (project root) for Vercel + Render-specific deployment instructions and environment variable guidance.

## Deploying (Vercel + Render)

We recommend the following setup:

- Frontend: Deploy `client` to Vercel. Add `VITE_API_BASE_URL` in Vercel project settings to point at your Render service (no `/api` suffix).
- Backend: Deploy `server` to Render as a Web Service. Set `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL` (the Vercel origin) in Render environment variables.

For detailed steps and curl-based checks, see `DEPLOY.md` in the repository root.

## Troubleshooting

- Browser shows CORS error: ensure `FRONTEND_URL` on the backend (Render) exactly matches the Vercel origin (scheme + host). Redeploy the backend after changes.
- `Failed to fetch` network errors: verify backend URL is reachable and HTTPS is used in production.
- Login/Register failing with 4xx: inspect request payload (missing fields) and server logs for validation messages.
- 500 errors: check backend logs on Render for stack traces.
- Uploaded images not visible after deploy: Render's filesystem is ephemeral — use Cloudinary/S3 for persistent uploads.

## Contributing

Contributions welcome — open issues or PRs for bugs and enhancements. Follow standard GitHub flow:

1. Fork the repo
2. Create a feature branch
3. Make changes and test locally
4. Open a PR with a clear description

## License

This project is provided as-is. Add a license file if you want to change terms (MIT recommended for open source).

---

If you want specific README wording, a short project description for GitHub, or to include screenshots/gifs, tell me and I'll update `README.md` accordingly.
