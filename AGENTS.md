<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Pre-publish verification

- Run `npm run verify:publish` immediately before committing or pushing UI changes.
- Do not claim that a development or production server is active from an earlier observation. Recheck the configured port immediately before reporting current server state.
- Treat `EADDRINUSE` plus a current listening PID as evidence of an active listener. Treat an `EPERM` lock on `.next/trace` only as evidence of a file lock; inspect current listeners and processes before naming the cause.
- If the verification command is blocked, resolve or accurately report the current blocker before pushing. Do not carry a transient blocker into the final status after external state may have changed.
