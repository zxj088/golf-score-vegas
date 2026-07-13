param(
  [string]$SupabaseUrl = "https://opifvihhnaqrroneqbhb.supabase.co",
  [string]$AnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waWZ2aWhobmFxcnJvbmVxYmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjQxNTgsImV4cCI6MjA5ODg0MDE1OH0.eFNZ1OqyAN__JmYlT3OXQS306o0I27ONaGCnC5c9SiE",
  [string]$SyncKey = "default",
  [string]$SeedPath = "data/shared-courses.seed.json"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $SeedPath)) {
  throw "Seed file not found: $SeedPath"
}

$courses = Get-Content -LiteralPath $SeedPath -Raw | ConvertFrom-Json
$rows = foreach ($course in $courses) {
  [ordered]@{
    id        = "$SyncKey`:course:$($course.id)"
    sync_key  = $SyncKey
    course_id = $course.id
    name      = $course.name
    pars      = [ordered]@{
      values   = @($course.pars)
      indexes  = @($course.indexes)
      editCode = "00"
      country  = $course.country
      region   = $course.region
      club     = $course.club
      course   = $course.course
      source   = "shared"
    }
  }
}

$headers = @{
  apikey        = $AnonKey
  Authorization = "Bearer $AnonKey"
  "Content-Type" = "application/json"
  Prefer        = "resolution=merge-duplicates,return=minimal"
}

$uri = "$($SupabaseUrl.TrimEnd('/'))/rest/v1/vegas_courses?on_conflict=id"
$body = $rows | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body | Out-Null

Write-Host "Imported $($rows.Count) shared courses into vegas_courses for sync key '$SyncKey'."
