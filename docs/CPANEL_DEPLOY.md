# cPanel deployment — Gulf Estates frontend

Production path: `/home/putdfhal/gulf-estates/gulf-frontend`  
Git remote: `https://github.com/gulfdeve/gulfwebsite_frontend.git`

## 1. Connect Git in cPanel

1. Log in to **cPanel** → **Git™ Version Control**.
2. If an old repository is linked to this path, either:
   - **Edit** the existing clone and set **Repository URL** to  
     `https://github.com/gulfdeve/gulfwebsite_frontend.git`, then **Update**, or
   - **Remove** the old clone and **Create** a new clone:
     - Clone URL: `https://github.com/gulfdeve/gulfwebsite_frontend.git`
     - Repository Path: `gulf-estates/gulf-frontend`
     - Branch: `main`
3. Enable **Pull on deployment** (or use **Deploy HEAD Commit** after each push to GitHub).

## 2. Configure the Node.js application

1. cPanel → **Setup Node.js App**.
2. Create or edit the app for this site with:

| Setting | Value |
|--------|--------|
| **Node.js version** | **24** (matches `nodevenv/.../24`) |
| **Application mode** | Production |
| **Application root** | `gulf-estates/gulf-frontend` |
| **Application URL** | Your live domain (or subdomain) |
| **Application startup file** | `server.js` |

3. **Environment variables** (add in the Node.js app UI — use production values, not localhost):

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `https://backend.gulfestates.ae` (or your live API) |
| `NEXT_PUBLIC_BASE_URL` | `https://gulfestates.ae` |
| `NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID` | Your GTM ID |
| `NEXT_PUBLIC_LIVEAVATAR_ENABLED` | `false` or `true` |
| `LIVEAVATAR_*` | Only if Live Avatar is enabled |

`PORT` is usually set automatically by cPanel; do not hard-code it unless support asks you to.

4. Click **Run NPM Install**, then **Restart** the application.

## 3. Deploy from Terminal (one-time or manual)

In **cPanel → Terminal**:

```bash
bash /home/putdfhal/gulf-estates/gulf-frontend/scripts/cpanel-deploy.sh
```

If the script is not on the server yet, run once after updating Git:

```bash
cd /home/putdfhal/gulf-estates/gulf-frontend
git remote set-url origin https://github.com/gulfdeve/gulfwebsite_frontend.git
git fetch origin && git checkout main && git reset --hard origin/main
source /home/putdfhal/nodevenv/gulf-estates/gulf-frontend/24/bin/activate
npm install && npm run build
mkdir -p tmp && touch tmp/restart.txt
```

## 4. Automatic deploy on push (`.cpanel.yml`)

After Git is pointed at `gulfwebsite_frontend`, cPanel runs `.cpanel.yml` on deploy: install, build, and `tmp/restart.txt` to restart the app.

## 5. Verify

- Node.js app status: **Running**
- Build log: `/tmp/gulf_deploy.log` (if using `.cpanel.yml` background task)
- Site loads with correct API and canonical URL from env vars
