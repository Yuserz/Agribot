#!/usr/bin/env bash
# AgriBot one-shot setup for macOS / Linux / Git Bash.
# Usage: ./scripts/setup.sh [--start] [--tunnel]
#   --start   start the Expo dev server after installing
#   --tunnel  start with a tunnel (use when phone and computer are on different networks)
set -euo pipefail

cd "$(dirname "$0")/.."

PNPM_VERSION="11.8.0"
MIN_NODE_MAJOR=20
MIN_NODE_MINOR=19

START=false
TUNNEL=false
for arg in "$@"; do
  case "$arg" in
    --start) START=true ;;
    --tunnel) START=true; TUNNEL=true ;;
    -h|--help) sed -n '2,6p' "$0"; exit 0 ;;
    *) echo "Unknown option: $arg"; exit 1 ;;
  esac
done

step() { printf '\n\033[1;32m==> %s\033[0m\n' "$1"; }
fail() { printf '\033[1;31mError: %s\033[0m\n' "$1"; exit 1; }

step "Checking Node.js"
command -v node >/dev/null 2>&1 || fail "Node.js not found. Install Node ${MIN_NODE_MAJOR}.${MIN_NODE_MINOR}+ (LTS) from https://nodejs.org"
NODE_VERSION="$(node -p 'process.versions.node')"
NODE_MAJOR="${NODE_VERSION%%.*}"
NODE_MINOR="$(echo "$NODE_VERSION" | cut -d. -f2)"
if [ "$NODE_MAJOR" -lt "$MIN_NODE_MAJOR" ] || { [ "$NODE_MAJOR" -eq "$MIN_NODE_MAJOR" ] && [ "$NODE_MINOR" -lt "$MIN_NODE_MINOR" ]; }; then
  fail "Node $NODE_VERSION is too old. Expo SDK 54 needs Node ${MIN_NODE_MAJOR}.${MIN_NODE_MINOR}+."
fi
echo "Node $NODE_VERSION OK"

step "Checking pnpm"
if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found, installing pnpm@${PNPM_VERSION} globally via npm..."
  npm install -g "pnpm@${PNPM_VERSION}"
fi
echo "pnpm $(pnpm -v) OK"

step "Installing dependencies"
pnpm install --frozen-lockfile

step "Setup complete"
cat <<'EOF'
Run the app:
  pnpm start           # dev server; scan the QR code with Expo Go (same Wi-Fi)
  pnpm start:tunnel    # phone on a different network
  pnpm android         # Android emulator / USB device
  pnpm ios             # iOS simulator (macOS only)
  pnpm web             # browser
EOF

if [ "$START" = true ]; then
  if [ "$TUNNEL" = true ]; then pnpm start:tunnel; else pnpm start; fi
fi
