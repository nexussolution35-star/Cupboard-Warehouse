# Deploy — surge.sh preview

This folder is **tooling only** (not part of the website). Safe to delete.

## Why it exists
The site is plain static HTML/CSS/assets and can be served as-is. In the
Claude Code web sandbox, third-party hosts must be in the environment's
**egress allowlist**. Surge's API host (`surge.surge.sh`) was not allowlisted,
so deploys returned `403`. A running session's allowlist is fixed at creation,
so the fix is: add the hosts, then **start a fresh session** and run the script.

## One-time setup (egress allowlist)
Add to the environment's network egress allowlist:
- `surge.surge.sh` — surge auth/publish API (**required**)
- `surge.sh`, `*.surge.sh` — published-site host (so verification curls work too)

## Deploy (in a fresh session)
```bash
python3 deploy/surge-deploy.py
```
It copies the site to a clean temp dir (excluding `.git/.github/deploy/README`),
registers a throwaway `@mailinator.com` surge account over a pexpect PTY,
publishes to **cupboard-centrelowveld.surge.sh**, and curl-verifies the homepage,
inner pages, and assets (expects `200`).

> Temporary throwaway preview host, not tied to any of your accounts.
