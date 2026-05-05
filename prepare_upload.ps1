# GalaxyBot Server Upload Preparation Script

$sourceDir = Get-Location
$targetDir = Join-Path $sourceDir "UPLOAD_ME"

Write-Host "Cleaning up previous UPLOAD_ME folder..." -ForegroundColor Cyan
if (Test-Path $targetDir) {
    Remove-Item -Path $targetDir -Recurse -Force
}

Write-Host "Creating clean upload directory..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path $targetDir | Out-Null

$excludeList = @("node_modules", "UPLOAD_ME", ".git", "database.sqlite-shm", "database.sqlite-wal", "prepare_upload.ps1", "DEPLOYMENT.md")

Write-Host "Copying files..." -ForegroundColor Cyan
Get-ChildItem -Path $sourceDir -Exclude $excludeList | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $targetDir -Recurse -Force
}

Write-Host "`nDone! The folder 'UPLOAD_ME' is now ready to be zipped and uploaded." -ForegroundColor Green
Write-Host "IMPORTANT: Do NOT include 'node_modules' in your ZIP file." -ForegroundColor Yellow
Write-Host "On the server, run 'npm install' to install dependencies." -ForegroundColor Cyan
