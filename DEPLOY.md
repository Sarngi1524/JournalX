## Deployment Guide — JournalX

This consolidated guide explains how to deploy the frontend to Vercel and the backend to Render, including required environment variables and quick tests.

### Backend — Render

- Service type: Web Service (Node)
- Start command: `npm start`
- Important Env vars (Render → Service → Environment):
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — JWT signing secret
  - `FRONTEND_URL` — Vercel origin(s), comma-separated (e.g. `https://journalx.vercel.app`)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (if used)

Notes:
- `FRONTEND_URL` must exactly match the Vercel origin (scheme + host), no trailing slash.
- After changing env vars, redeploy the Render service.

Health check (replace host):

```bash
curl -i https://<your-render-service>.onrender.com/
# Expect HTTP 200 and 'JournalX API Running...'
```

Register test:

```bash
curl -i -X POST https://<your-render-service>.onrender.com/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test+deploy@example.com","password":"password123"}'
```

### Frontend — Vercel

- Build command: `npm run build` (Vite)
- Env vars (Vercel → Project → Settings → Environment Variables):
  - `VITE_API_BASE_URL` = `https://<your-render-service>.onrender.com`
    - IMPORTANT: Do NOT append `/api` here. The client app appends `/api` itself.

- Add the env var for Production and Preview (if you use previews) and redeploy.

### Common troubleshooting

- CORS blocked in browser → ensure `FRONTEND_URL` on Render matches Vercel origin.
- Network/DNS errors → verify `VITE_API_BASE_URL` is correct and reachable.
- 400/401 responses → check request payload and server validation.
- 500 responses → inspect Render logs for stack traces.
- Image URLs broken → `VITE_API_BASE_URL` should be backend root (no `/api`). Consider Cloudinary/S3 for uploads.

### Quick automated check (optional)

Create `deploy-check.sh` and run locally to exercise health and auth endpoints:

```bash
echo "Health check"
curl -i https://<your-render-service>.onrender.com/

echo "Register test"
curl -i -X POST https://<your-render-service>.onrender.com/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"DeployCheck","email":"deploycheck+test@example.com","password":"password123"}'
```

---

If you'd like a README restored in `client/` or a different markdown filename, tell me and I'll create it with your preferred content.
