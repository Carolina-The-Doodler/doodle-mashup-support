#!/bin/bash

# Generate Reference Screenshots Script
# This script takes screenshots of all pages and saves them as reference images

echo "Starting reference screenshot generation..."

# Check if images directory exists, create if not
if [ ! -d "images" ]; then
    mkdir -p images
fi

echo "Installing dependencies..."
npm install

echo "Starting local server..."
npx http-server . -p 3000 &
SERVER_PID=$!

# Wait for server to start
sleep 3

echo "Generating reference screenshots with Playwright..."
npx playwright test --update-snapshots

echo "Stopping server..."
kill $SERVER_PID

echo "Reference screenshots have been generated and saved to test-results/"
echo "You can find the screenshots in the test-results directory."
echo ""
echo "To run visual regression tests, use: npm test"
echo "To update screenshots in the future, use: npm run test:update-snapshots"