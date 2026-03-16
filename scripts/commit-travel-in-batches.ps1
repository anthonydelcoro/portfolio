# Commit travel photos in smaller batches (one commit per album) to avoid push/commit failures.
# Run from repo root: .\scripts\commit-travel-in-batches.ps1

$ErrorActionPreference = "Stop"
$travelRoot = "src/assets/travel"

# Check for files that would cause GitHub push to fail (> 100 MB)
$big = Get-ChildItem -Path $travelRoot -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 100MB }
if ($big) {
  Write-Host "ERROR: These files exceed GitHub's 100 MB limit and will cause push to fail:" -ForegroundColor Red
  $big | ForEach-Object { Write-Host "  $($_.FullName) ($([math]::Round($_.Length/1MB, 1)) MB)" }
  exit 1
}

# 0. Stage everything then unstage only travel, so we can commit the rest in one go
Write-Host "Staging all changes, then separating travel from other files..." -ForegroundColor Cyan
git add -A
git reset -- $travelRoot

# 1. Commit any non-travel changes first (content, config, etc.)
$nonTravel = git diff --cached --name-only
if ($nonTravel) {
  Write-Host "Committing non-travel changes ($($nonTravel.Count) files)..." -ForegroundColor Cyan
  git commit -m "Update content and project assets"
  Write-Host "Done." -ForegroundColor Green
} else {
  Write-Host "No non-travel changes to commit." -ForegroundColor Yellow
}

# 2. Commit travel_thumbnails first (needed for album grid)
Write-Host "`nCommitting travel_thumbnails..." -ForegroundColor Cyan
git add "$travelRoot/travel_thumbnails"
$thumb = git diff --cached --name-only
if ($thumb) {
  git commit -m "Add travel: thumbnails"
  Write-Host "Done." -ForegroundColor Green
}

# 3. One commit per album folder (alphabetical)
$albums = @(
  "arches", "bryce", "ecuador", "glacier", "iceland", "ireland", "morocco",
  "mt_washington", "portugal", "sea_base", "spain", "teton", "tremblant", "tulum",
  "yellowstone", "zion"
)

foreach ($album in $albums) {
  $path = "$travelRoot/$album"
  if (-not (Test-Path $path)) { continue }
  Write-Host "`nCommitting $album..." -ForegroundColor Cyan
  git add $path
  $staged = git diff --cached --name-only
  if ($staged) {
    git commit -m "Add travel album: $album"
    Write-Host "Done." -ForegroundColor Green
  }
}

Write-Host "`nAll batches committed. Run 'git push' when ready." -ForegroundColor Green
