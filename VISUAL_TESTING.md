# Visual Regression Testing with Playwright

This project includes automated visual regression testing using Playwright. The tests compare screenshots of the current site against reference images stored in the `images/` folder to detect visual changes.

## Directory Structure

```
├── images/                          # Reference screenshots folder
│   ├── homepage-chromium-linux.png
│   ├── privacy-policy-chromium-linux.png
│   └── terms-of-service-chromium-linux.png
├── tests/                           # Test files
│   └── visual-regression.spec.ts
├── test-results/                    # Generated test results (gitignored)
├── playwright-report/               # HTML test reports (gitignored)
└── playwright.config.ts             # Playwright configuration
```

## How Visual Regression Testing Works

1. **Reference Images**: The `images/` folder contains reference screenshots that represent the "correct" visual state of each page
2. **Test Execution**: When tests run, Playwright takes new screenshots of each page
3. **Comparison**: New screenshots are automatically compared against the reference images in `tests/visual-regression.spec.ts-snapshots/`
4. **Results**: Tests pass if visual differences are below the threshold (20% by default), fail otherwise

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Generating Reference Screenshots

To generate or update reference screenshots:

### Initial Setup (first time)
```bash
npm run test:update-snapshots
```

This creates reference screenshots in the Playwright snapshots directory and copies them to the `images/` folder for easy access.

### Manual Generation
```bash
./generate-references.sh
```

## Running Visual Tests

Run all visual regression tests:
```bash
npm test
```

Run tests in headed mode (with visible browser):
```bash
npm run test:headed
```

Run tests with UI mode for debugging:
```bash
npm run test:ui
```

## Using Reference Images from the Images Folder

The `images/` folder serves as a centralized location for reference screenshots:

- **Storage**: All reference images are stored here with descriptive names
- **Version Control**: Reference images are committed to git so team members share the same visual baselines
- **Easy Access**: You can easily view, replace, or manage reference images
- **Backup**: Acts as a backup of your visual references

### Workflow for Visual Changes

1. Make changes to your HTML/CSS
2. Run tests: `npm test`
3. If visual changes are intentional:
   - Update references: `npm run test:update-snapshots`
   - Copy new references to images folder: `cp tests/visual-regression.spec.ts-snapshots/*.png images/`
   - Commit both the changes and updated reference images

## Pages Tested

The visual regression tests cover:
- **Homepage** (`index.html`) - Main support page
- **Privacy Policy** (`privacy.html`) - Privacy policy page  
- **Terms of Service** (`terms.html`) - Terms of service page

## Configuration

Visual comparison settings in `playwright.config.ts`:
- **threshold**: 0.2 (20% difference tolerance)
- **fullPage**: true (capture entire scrollable page)
- **screenshot**: 'only-on-failure' (screenshot on test failures)

## Troubleshooting

**Tests failing after legitimate changes?**
- Update reference images with: `npm run test:update-snapshots`
- Copy to images folder: `cp tests/visual-regression.spec.ts-snapshots/*.png images/`

**Need to see visual differences?**
- Run: `npm run test:ui` for interactive debugging
- Check `test-results/` for comparison images

**CI/CD Integration**
- Tests are configured for CI environments with automatic retries
- Reference images should be committed to version control
- Consider using `--update-snapshots` flag in CI only when intentionally updating baselines