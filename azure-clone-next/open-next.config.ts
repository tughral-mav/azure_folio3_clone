import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// OpenNext Cloudflare adapter config. The incremental cache serves the
// prerendered pages. We use the *static assets* cache (backed by the free
// Workers Assets binding) rather than R2/KV, so no paid storage or payment
// method is required. It is read-only: the blog's `revalidate: 3600` pages are
// served from the build-time render and refresh on each deploy, which is fine
// for a content-driven marketing site (content changes ship via a redeploy).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
