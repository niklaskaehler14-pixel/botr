# GalaxyBot Live Sync Script
# This script watches your local folder and pushes changes to the server automatically.

# Load settings from .env if it exists
$envPort = "11501"
$envSecret = "galaxy_sync_safe_2026"

if (Test-Path ".env") {
    $envFile = Get-Content ".env"
    foreach ($line in $envFile) {
        if ($line -match "^PORT=(.*)") { $envPort = $matches[1].Trim() }
        if ($line -match "^SYNC_SECRET=(.*)") { $envSecret = $matches[1].Trim() }
    }
}

$serverUrl = "http://meine-domain.de:$envPort/api/sync"
$syncSecret = $envSecret
$localPath = Get-Location
$excludeList = @("node_modules", "UPLOAD_ME", ".git", "database.sqlite", "database.sqlite-shm", "database.sqlite-wal", "live_sync.ps1", ".env.example")

Write-Host "Starting GalaxyBot Live Sync..." -ForegroundColor Cyan
Write-Host "Server: $serverUrl" -ForegroundColor Gray
Write-Host "Watching: $($localPath.Path)" -ForegroundColor Gray


$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $localPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

function Sync-File($fullPath) {
    $relativePath = $fullPath.Replace($localPath.Path, "").TrimStart("\").Replace("\", "/")
    
    if ($relativePath -eq "") { return }

    # Check exclude list
    foreach ($exclude in $excludeList) {
        if ($relativePath.StartsWith($exclude) -or $relativePath -eq $exclude) { return }
    }


    if (Test-Path $fullPath -PathType Container) { return } # Skip directories

    Write-Host "Syncing: $relativePath..." -ForegroundColor Yellow
    
    try {
        $headers = @{
            "x-sync-secret" = $syncSecret
            "x-file-path"   = $relativePath.Replace("\", "/")
        }
        
        Invoke-RestMethod -Uri $serverUrl -Method Post -InFile $fullPath -Headers $headers -ContentType "application/octet-stream" | Out-Null
        Write-Host "Successfully synced: $relativePath" -ForegroundColor Green
    } catch {
        Write-Host "Failed to sync $($relativePath): $($_.Exception.Message)" -ForegroundColor Red
    }
}

$action = {
    $path = $Event.SourceEventArgs.FullPath
    Sync-File $path
}

Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
Register-ObjectEvent $watcher "Created" -Action $action | Out-Null

Write-Host "Live Sync is ACTIVE. Press Ctrl+C to stop." -ForegroundColor Green

# Keep script running
while ($true) { Start-Sleep -Seconds 1 }
