# Push commits one at a time to avoid HTTP 500 / RPC failed on large pushes.
# Run from repo root: .\scripts\push-one-by-one.ps1

$ErrorActionPreference = "Stop"

# Ensure we're on main and have a remote
$branch = git rev-parse --abbrev-ref HEAD 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "Not a git repo." -ForegroundColor Red; exit 1 }
if ($branch -ne "main") { Write-Host "Current branch is '$branch'. Switch to main or edit this script." -ForegroundColor Yellow }

$remote = "origin"
$commits = git rev-list --reverse "$remote/main..HEAD" 2>$null
if (-not $commits) {
  Write-Host "Nothing to push (local main is not ahead of origin/main)." -ForegroundColor Green
  exit 0
}

$list = @($commits)
$total = $list.Count
Write-Host "Pushing $total commit(s) one at a time to $remote/main..." -ForegroundColor Cyan

$n = 0
foreach ($rev in $list) {
  $n++
  $msg = (git log -1 --format="%s" $rev 2>$null).Trim()
  if ($msg.Length -gt 50) { $msg = $msg.Substring(0, 47) + "..." }
  Write-Host "[$n/$total] Pushing: $msg" -ForegroundColor Gray
  git push $remote "${rev}:refs/heads/main"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed at commit $n. Fix the error and run this script again to continue." -ForegroundColor Red
    exit 1
  }
  Start-Sleep -Milliseconds 500
}

Write-Host "All $total commit(s) pushed successfully." -ForegroundColor Green
