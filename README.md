# Barangay iSERVE prototype

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-mzdvcnrc)

This repository contains the browser-based Barangay iSERVE functional prototype. It uses fictional demonstration data and browser-session state. It does not provide production authentication, persistent storage, official government submission, accounting, or fund processing.

## Local quality gate

Use Node.js 20 and install from the lockfile:

```bash
npm ci
npm run quality
```

The gate runs regression tests, validates quality contracts, type-checks, creates the production build, and checks the generated JavaScript bundle.

## Prototype quality targets

- Every route screen is loaded on demand; AppShell and route authorization remain in the initial entry path.
- A visible disclosure identifies fictional data, browser-session changes, and capabilities that are simulated or unavailable.
- No generated JavaScript chunk may exceed 350 KiB.
- Total generated JavaScript may not exceed 1,024 KiB.
- Pull requests and pushes to `mod-01` run the same checks in GitHub Actions.

These are prototype delivery gates, not production service-level objectives. The later Laravel/PostgreSQL implementation must define production performance, security, persistence, observability, backup, and recovery targets separately.
