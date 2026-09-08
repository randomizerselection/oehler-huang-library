param(
  [string]$SshHost = "118.31.107.119",
  [string]$SshUser = "ecs-user",
  [string]$IdentityFile = "$env:USERPROFILE\.ssh\oehlerhuang-prod.pem",
  [ValidateSet("staging", "production")][string]$Environment = "staging",
  [string]$ReleaseId = (Get-Date -Format "yyyyMMdd-HHmmss")
)

$ErrorActionPreference = "Stop"
if ($ReleaseId -notmatch '^[A-Za-z0-9._-]{3,120}$') { throw "Invalid release id" }
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$archive = Join-Path $env:TEMP "oehler-huang-platform-$ReleaseId.tar.gz"
$fileList = Join-Path $env:TEMP "oehler-huang-platform-$ReleaseId.files.txt"
if (-not $archive.StartsWith([IO.Path]::GetFullPath($env:TEMP))) { throw "Unsafe archive path: $archive" }
Push-Location $root
try {
  npm run build:content
  if ($LASTEXITCODE -ne 0) { throw "Content build failed" }
  npm run check
  if ($LASTEXITCODE -ne 0) { throw "Project checks failed" }
  npm test
  if ($LASTEXITCODE -ne 0) { throw "Tests failed" }
  node deploy/release-files.mjs --output $fileList
  if ($LASTEXITCODE -ne 0) { throw "Release planning failed" }
  tar.exe -czf $archive -T $fileList
  if ($LASTEXITCODE -ne 0) { throw "Archive creation failed" }
  scp -i $IdentityFile $archive "${SshUser}@${SshHost}:/tmp/oehler-huang-platform-$ReleaseId.tar.gz"
  if ($LASTEXITCODE -ne 0) { throw "Archive upload failed" }
  scp -i $IdentityFile (Join-Path $PSScriptRoot "install-release.sh") "${SshUser}@${SshHost}:/tmp/install-oehler-huang-release.sh"
  if ($LASTEXITCODE -ne 0) { throw "Installer upload failed" }
  ssh -i $IdentityFile "${SshUser}@${SshHost}" "sudo bash /tmp/install-oehler-huang-release.sh /tmp/oehler-huang-platform-$ReleaseId.tar.gz $ReleaseId $Environment"
  if ($LASTEXITCODE -ne 0) { throw "Release installation failed" }
} finally {
  Pop-Location
  if (Test-Path -LiteralPath $archive) { Remove-Item -LiteralPath $archive -Force }
  if (Test-Path -LiteralPath $fileList) { Remove-Item -LiteralPath $fileList -Force }
}

if ($Environment -eq "staging") {
  Write-Host "Open an SSH tunnel: ssh -i `"$IdentityFile`" -L 8790:127.0.0.1:8790 ${SshUser}@${SshHost}"
  Write-Host "Then browse http://127.0.0.1:8790/. Public DNS was not changed."
}
