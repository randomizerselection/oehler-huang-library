param(
  [string]$SshHost = "118.31.107.119",
  [string]$SshUser = "ecs-user",
  [string]$IdentityFile = "$env:USERPROFILE\.ssh\oehlerhuang-prod.pem",
  [ValidateSet("staging", "production")][string]$Environment = "staging",
  [string]$ReleaseId = (Get-Date -Format "yyyyMMdd-HHmmss")
)

$ErrorActionPreference = "Stop"
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$archive = Join-Path $env:TEMP "oehler-huang-platform-$ReleaseId.tar.gz"
if (-not $archive.StartsWith([IO.Path]::GetFullPath($env:TEMP))) { throw "Unsafe archive path: $archive" }
Push-Location $root
try {
  npm run check
  npm test
  tar.exe --exclude=node_modules --exclude=.git --exclude=.env --exclude=.platform-data --exclude=test-results --exclude=playwright-report --exclude=apps/platform/output --exclude=apps/platform/tmp -czf $archive package.json package-lock.json AGENTS.md README.md .env.example apps deploy
  scp -i $IdentityFile $archive "${SshUser}@${SshHost}:/tmp/oehler-huang-platform-$ReleaseId.tar.gz"
  scp -i $IdentityFile (Join-Path $PSScriptRoot "install-release.sh") "${SshUser}@${SshHost}:/tmp/install-oehler-huang-release.sh"
  ssh -i $IdentityFile "${SshUser}@${SshHost}" "sudo bash /tmp/install-oehler-huang-release.sh /tmp/oehler-huang-platform-$ReleaseId.tar.gz $ReleaseId $Environment"
} finally {
  Pop-Location
  if (Test-Path -LiteralPath $archive) { Remove-Item -LiteralPath $archive -Force }
}

if ($Environment -eq "staging") {
  Write-Host "Open an SSH tunnel: ssh -i `"$IdentityFile`" -L 8790:127.0.0.1:8790 ${SshUser}@${SshHost}"
  Write-Host "Then browse http://127.0.0.1:8790/. Public DNS was not changed."
}
