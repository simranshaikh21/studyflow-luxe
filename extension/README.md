# StudyFlow The Guard (Chrome Extension)

## What it does
- Watches `localStorage["studyflow-timer-active"]` from the StudyFlow app.
- Blocks YouTube and Instagram while the value is `true`.
- Unblocks automatically when the value becomes `false`.

## Local install
1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `extension` folder.
5. Keep the StudyFlow app open at `http://localhost:5173`.

## Notes
- If you deploy StudyFlow on a custom domain, add that domain to `content_scripts.matches` and `host_permissions` in `manifest.json`.
