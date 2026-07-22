param(
  [int]$Port = 3000
)

$ErrorActionPreference = "Stop"
$listeners = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)

if ($listeners.Count -gt 0) {
  Write-Error "Port $Port is currently in use. Stop the local server before the production build."
  $listeners |
    Select-Object LocalAddress, LocalPort, OwningProcess |
    Format-Table -AutoSize
  exit 2
}

Write-Host "Port $Port is free. Running lint..."
& npm.cmd run lint
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Running the production build..."
& npm.cmd run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Pre-publish verification passed."
