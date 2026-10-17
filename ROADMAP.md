# Roadmap

Plans for the next twelve months, in rough order. Nothing here is a promise of a date.

1. **Public demo with real video.** Deploy the Cloudflare Worker in `worker/` so the demo plays the aerials over https.
2. **Storage hardening.** Flush pending writes when the file stream fails, and report write errors from the durable file.
3. **Telemetry.** Support every Datadog site and flush the queue when the app exits or hides.
4. **Release trust.** Pin the signing identity in the verification steps and publish a verification recipe with every release.
5. **Tizen compatibility.** Test on new Samsung models as they appear and keep the app on the Tizen 6.0 baseline.
6. **Not planned:** a build step, runtime dependencies, or any bundled Apple footage.

Out-of-scope ideas can be opened as issues; see [CONTRIBUTING.md](CONTRIBUTING.md).
