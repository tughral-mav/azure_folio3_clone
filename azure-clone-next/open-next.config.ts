import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// OpenNext Cloudflare adapter config. The R2 incremental cache makes ISR
// (e.g. the blog pages' `revalidate: 3600`) persist across requests.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
