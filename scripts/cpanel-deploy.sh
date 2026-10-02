#!/bin/bash
# Run from cPanel Terminal (or SSH) as user putdfhal.
set -euo pipefail

APP_DIR="/home/putdfhal/gulf-estates/gulf-frontend"
REPO_URL="https://github.com/gulfdeve/gulfwebsite_frontend.git"
VENV_ACTIVATE="/home/putdfhal/nodevenv/gulf-estates/gulf-frontend/24/bin/activate"

echo "==> App directory: ${APP_DIR}"
cd "${APP_DIR}"

echo "==> Pointing origin at ${REPO_URL}"
git remote set-url origin "${REPO_URL}"
git fetch origin
git checkout main
git reset --hard origin/main

echo "==> Installing dependencies and building"
# shellcheck disable=SC1090
source "${VENV_ACTIVATE}"
npm install
npm run build

if [ ! -f "${APP_DIR}/.next/BUILD_ID" ]; then
  echo "ERROR: next build did not produce .next/BUILD_ID. Passenger cannot start the app."
  exit 1
fi

echo "==> Restarting Passenger / Node app"
mkdir -p tmp
touch tmp/restart.txt

echo "==> Deploy finished. Check the Node.js app in cPanel if the site does not update."
echo "    App root: ${APP_DIR}"
echo "    Domain:   gulfestates.ae (Setup Node.js App → Application URL)"
echo "    Verify:   https://gulfestates.ae/en/contact (352 1833 / Bayswater address)"
