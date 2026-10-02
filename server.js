/* global PhusionPassenger */
'use strict';

const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');

const dir = __dirname;
const buildId = path.join(dir, '.next', 'BUILD_ID');
const port = process.env.PORT || 3000;

if (!fs.existsSync(buildId)) {
  console.error(
    "Missing Next.js production build (.next). In cPanel Terminal run:\n" +
      "  source ~/nodevenv/gulf-estates/gulf-frontend/24/bin/activate\n" +
      "  cd ~/gulf-estates/gulf-frontend && npm install && npm run build"
  );
  process.exit(1);
}

if (typeof PhusionPassenger !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
}

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    if (typeof PhusionPassenger !== 'undefined') {
      server.listen('passenger');
    } else {
      server.listen(port, '0.0.0.0', (err) => {
        if (err) throw err;
        console.log(`> Server running on port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.error('Failed to start Next.js:', err);
    process.exit(1);
  });
