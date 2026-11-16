# AgriBot one-shot setup for Windows PowerShell.
# Usage: powershell -ExecutionPolicy Bypass -File scripts\setup.ps1 [-Start] [-Tunnel]
#   -Start   start the Expo dev server after installing
#   -Tunnel  start with a tunnel (use when phone and computer are on different networks)
param(
    [switch]$Start,
    [switch]$Tunnel
)
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')

$PnpmVersion = '11.8.0'
$MinNode = [version]'20.19.0'

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Green }
function Fail($msg) { Write-Host "Error: $msg" -ForegroundColor Red; exit 1 }

Step 'Checking Node.js'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Fail "Node.js not found. Install Node $MinNode+ (LTS) from https://nodejs.org"
}
$nodeVersion = [version](node -p 'process.versions.node')
if ($nodeVersion -lt $MinNode) { Fail "Node $nodeVersion is too old. Expo SDK 54 needs Node $MinNode+." }
Write-Host "Node $nodeVersion OK"

Step 'Checking pnpm'
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm not found, installing pnpm@$PnpmVersion globally via npm..."
    npm install -g "pnpm@$PnpmVersion"
    if ($LASTEXITCODE -ne 0) { Fail 'Failed to install pnpm.' }
}
Write-Host "pnpm $(pnpm -v) OK"

Step 'Installing dependencies'
pnpm install --frozen-lockfile
if ($LASTEXITCODE -ne 0) { Fail 'pnpm install failed.' }

Step 'Setup complete'
Write-Host @'
Run the app:
  pnpm start           # dev server; scan the QR code with Expo Go (same Wi-Fi)
  pnpm start:tunnel    # phone on a different network
  pnpm android         # Android emulator / USB device
  pnpm ios             # iOS simulator (macOS only)
  pnpm web             # browser
'@

if ($Start -or $Tunnel) {
    if ($Tunnel) { pnpm start:tunnel } else { pnpm start }
}
