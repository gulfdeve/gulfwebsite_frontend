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

echo "==> Restarting Passenger / Node app"
mkdir -p tmp
touch tmp/restart.txt

echo "==> Deploy finished. Check the Node.js app in cPanel if the site does not update."
