$ErrorActionPreference = 'Stop'
$videoRepo = (Resolve-Path (Join-Path $PSScriptRoot '../../../..')).Path
& python (Join-Path $PSScriptRoot 'synthesize.py')
if ($LASTEXITCODE -ne 0) { throw 'Neural narration synthesis failed.' }
