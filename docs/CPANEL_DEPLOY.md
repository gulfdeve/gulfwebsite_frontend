# cPanel deployment — Gulf Estates frontend

| Item | Value |
|------|--------|
| **Server path** | `/home/putdfhal/gulf-estates/gulf-frontend` |
| **cPanel repo path** | `gulf-estates/gulf-frontend` |
| **Git remote** | `https://github.com/gulfdeve/gulfwebsite_frontend.git` |
| **Branch** | `main` |
| **Live domain** | `gulfestates.ae` (and usually `www.gulfestates.ae`) |
| **Startup file** | `server.js` |

---

## A. Fresh setup (new Git clone + new Node.js app)

Do this when the site shows a directory listing, 404 on `/en`, or an old repo is linked to the wrong GitHub URL.

### A1. Remove conflicting apps (if any)

1. **cPanel → Setup Node.js App** — stop and **Delete** any old app that used `gulfestates.ae` or the same folder (avoid two apps on one domain).
2. **cPanel → Git™ Version Control** — if an old clone exists at `gulf-estates/gulf-frontend`, open it → **Remove** (or **Delete** repository) only if you intend to re-clone cleanly.
3. **cPanel → File Manager** → `/home/putdfhal/gulf-estates/`  
   - If `gulf-frontend` is empty or only junk, delete its contents.  
   - Do **not** leave a huge zip (e.g. `gulf_backup20oct.zip`) in the **domain document root** that Apache serves instead of Node — move backups outside `public_html` / the live docroot.

### A2. Create a new Git clone

1. **cPanel → Git™ Version Control** → **Create**.
2. Fill in:

   | Field | Value |
   |-------|--------|
   | **Clone URL** | `https://github.com/gulfdeve/gulfwebsite_frontend.git` |
   | **Repository Path** | `gulf-estates/gulf-frontend` |
   | **Repository Name** | e.g. `gulf-frontend` |

3. Click **Create**. cPanel clones into `/home/putdfhal/gulf-estates/gulf-frontend`.
4. Open the new repository → set **Branch** to **`main`** if needed.
5. Click **Pull or Deploy** → **Update from Remote** (first pull), then **Deploy HEAD Commit** so `.cpanel.yml` runs (install + build in background).

If Git reports “dubious ownership”, run once in **Terminal**:

```bash
git config --global --add safe.directory /home/putdfhal/gulf-estates/gulf-frontend
```

### A3. Create the Node.js application (`gulfestates.ae`)

1. **cPanel → Setup Node.js App** → **Create Application**.
2. Use these settings:

   | Setting | Value |
   |---------|--------|
   | **Node.js version** | **20** or **24** (must satisfy `package.json`: `>=20.19.0`) |
   | **Application mode** | **Production** |
   | **Application root** | `gulf-estates/gulf-frontend` |
   | **Application URL** | **`gulfestates.ae`** (pick from domain list; path usually `/`) |
   | **Application startup file** | `server.js` |

3. **Environment variables** (Node.js app → **Edit** → **Environment variables**):

   | Variable | Suggested value |
   |----------|-----------------|
   | `NODE_ENV` | `production` |
   | `NEXT_PUBLIC_BASE_URL` | `https://gulfestates.ae` |
   | `NEXT_PUBLIC_API_URL` | Your live API (e.g. `https://backend.gulfestates.ae`) |
   | `NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID` | Your GTM ID, if used |
   | `NEXT_PUBLIC_LIVEAVATAR_ENABLED` | `false` unless you use Live Avatar |

   Leave **`PORT`** unset unless cPanel support tells you to set it — Passenger injects it.

4. Click **Create**.
5. On the app page, copy the **“Enter to the virtual environment”** command (looks like  
   `source /home/putdfhal/nodevenv/gulf-estates/gulf-frontend/24/bin/activate` — the version number may differ).
6. Click **Run NPM Install**, then **Restart**.

### A4. Build and restart (Terminal — recommended after first clone)

In **cPanel → Terminal**:

```bash
bash /home/putdfhal/gulf-estates/gulf-frontend/scripts/cpanel-deploy.sh
```

If the script is missing on the first pull, run manually:

```bash
cd /home/putdfhal/gulf-estates/gulf-frontend
git remote set-url origin https://github.com/gulfdeve/gulfwebsite_frontend.git
git fetch origin && git checkout main && git reset --hard origin/main
source /home/putdfhal/nodevenv/gulf-estates/gulf-frontend/24/bin/activate   # use path from Node.js app UI
npm install && npm run build
mkdir -p tmp && touch tmp/restart.txt
```

Then in **Setup Node.js App** → **Restart**. Status should be **Running**.

### A5. Domain, SSL, and `www`

1. **cPanel → Domains** — ensure **`gulfestates.ae`** and **`www.gulfestates.ae`** point at this account (A record to server IP when you cut over DNS).
2. **cPanel → SSL/TLS Status** or **AutoSSL** — run AutoSSL so HTTPS is valid (expired certs break browsers).
3. Prefer **one** Node app on **`gulfestates.ae`**, then add a **redirect** from `www` → apex (or the reverse), in **Domains → Redirects**, so both hostnames hit the same app.

### A6. Verify

- **https://gulfestates.ae/en** — homepage loads (Next.js, not “Index of /”).
- **https://gulfestates.ae/en/contact** — phone **+971 4 352 1833**, address **The Bayswater by Omniyat… Office 1508**.
- Node app: **Running**; build log: `tail -f /tmp/gulf_deploy.log` after **Deploy HEAD Commit**.

---

## B. Update existing Git (no new Node app)

1. **Git™ Version Control** → open `gulf-estates/gulf-frontend`.
2. Set **Clone URL** to `https://github.com/gulfdeve/gulfwebsite_frontend.git` → **Update**.
3. **Pull or Deploy** → **Deploy HEAD Commit**.
4. Or run: `bash /home/putdfhal/gulf-estates/gulf-frontend/scripts/cpanel-deploy.sh`
5. **Setup Node.js App** → **Restart**.

---

## C. Automatic deploy (`.cpanel.yml`)

On **Deploy HEAD Commit**, cPanel runs:

- `git fetch` / `reset --hard origin/main`
- background: `npm install`, `npm run build`, `tmp/restart.txt`

---

## D. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| **Index of /** with a `.zip` at `/` | Apache docroot, not Node | Create Node app on `gulfestates.ae`; remove/move files from wrong docroot |
| **404** on `/en` | No Passenger / app stopped | Restart Node app; confirm startup `server.js` and root path |
| **Passenger: “We're sorry, but something went wrong” / app could not be started** | No `.next` build (Git does not include it) or startup crash | See section E below |
| **`npm run build` fails** | Wrong Node version or missing deps | Use Node ≥ 20.19; run `npm install` inside cPanel venv |
| **Old phone/address** | Stale build | `git reset --hard origin/main`, rebuild, restart |
| Git safe.directory error | cPanel Git quirk | `git config --global --add safe.directory ...` (see A2) |

---

## E. Fix Passenger “application could not be started”

Creating the Node.js app only starts `server.js`. It does **not** compile Next.js. `.next/` is gitignored, so a clone is not enough.

In **cPanel → Terminal**:

```bash
# Use the activate path from Setup Node.js App if it is not /24/
source /home/putdfhal/nodevenv/gulf-estates/gulf-frontend/24/bin/activate
cd /home/putdfhal/gulf-estates/gulf-frontend

# Confirm files exist
ls -la server.js package.json
ls -la .next/BUILD_ID || echo "NO BUILD YET"

npm install
npm run build

# Confirm the build
test -f .next/BUILD_ID && echo BUILD_OK
mkdir -p tmp && touch tmp/restart.txt

# See the real crash reason if it still fails
tail -100 stderr.log 2>/dev/null
tail -100 /tmp/gulf_deploy.log 2>/dev/null
```

Then **Setup Node.js App → Restart**. Startup file must be `server.js`.

If `npm run build` errors, the Passenger page will keep showing until that build succeeds.
