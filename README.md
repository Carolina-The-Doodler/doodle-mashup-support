# Doodle Mashup — Support Site

Use with GitHub Pages at `https://lovingartandcompany.github.io/doodle-mashup-support/`.

## Visual Regression Testing

This project includes automated visual regression testing using Playwright. Reference screenshots are stored in the `images/` folder and tests compare current page renders against these references.

### Quick Start
```bash
npm install
npm test                    # Run visual regression tests
npm run test:ui            # Interactive test mode
npm run serve              # Start local development server
```

See [VISUAL_TESTING.md](VISUAL_TESTING.md) for detailed documentation.

## Deploy
1. Create a public repo named `doodle-mashup-support` under the `lovingartandcompany` account.
2. Commit the files at repo root.
3. GitHub → Settings → Pages → Deploy from a branch → Branch: `main` → Folder: `/` (root).
4. Wait for the Pages build to finish.
5. Verify HTTP 200 at `https://lovingartandcompany.github.io/doodle-mashup-support/`.
6. In App Store Connect → App Information → Support URL, paste that exact URL.