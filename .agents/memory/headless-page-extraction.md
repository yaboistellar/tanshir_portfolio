---
name: Headless page extraction
description: Browser flags that make remote visual-source extraction reliable in this workspace.
---

When extracting a remote page for a visual recreation, use Chromium's newer headless mode together with `--no-sandbox`, `--disable-dev-shm-usage`, and `--no-first-run`; classic headless can disconnect before writing output.

**Why:** The workspace Chromium process disconnected during the first remote-page dump, while the newer headless mode completed the same navigation and rendered DOM successfully.

**How to apply:** Prefer these flags for future remote-page DOM dumps and screenshots; keep the command timeout generous enough for client-side rendering.