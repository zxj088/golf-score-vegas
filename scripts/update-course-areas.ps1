param(
  [string]$SeedPath = "data/course-areas.seed.json",
  [string]$AppPath = "app.js"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $SeedPath)) {
  throw "Seed file not found: $SeedPath"
}

if (-not (Test-Path -LiteralPath $AppPath)) {
  throw "App file not found: $AppPath"
}

$areas = Get-Content -LiteralPath $SeedPath -Raw | ConvertFrom-Json

$normalized = @(
  foreach ($area in $areas) {
    $country = [string]$area.country
    if ([string]::IsNullOrWhiteSpace($country)) {
      throw "Every area must have a country."
    }

    $regions = @($area.regions) |
      ForEach-Object { [string]$_ } |
      Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
      Sort-Object -Unique

    [pscustomobject]@{
      country = $country
      regions = $regions
    }
  }
) | Sort-Object country

$seenCountries = @{}
foreach ($area in $normalized) {
  if ($seenCountries.ContainsKey($area.country)) {
    throw "Duplicate country: $($area.country)"
  }
  $seenCountries[$area.country] = $true
}

$json = $normalized | ConvertTo-Json -Depth 5
$constant = "const COURSE_SEARCH_AREAS = $json;"

$app = Get-Content -LiteralPath $AppPath -Raw
$pattern = "(?s)const COURSE_SEARCH_AREAS = .*?;\r?\n\r?\nconst defaultCourses ="
$replacement = "$constant`r`n`r`nconst defaultCourses ="
if (-not [regex]::IsMatch($app, $pattern)) {
  throw "Could not find COURSE_SEARCH_AREAS in $AppPath"
}
$updated = [regex]::Replace($app, $pattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($match) $replacement }, 1)

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path -LiteralPath $AppPath), $updated, $utf8NoBom)
Write-Host "Updated COURSE_SEARCH_AREAS in $AppPath from $SeedPath with $($normalized.Count) countries."
