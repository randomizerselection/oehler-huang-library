param([Parameter(Mandatory=$true)][string]$ImagePath)
# On-device fallback. No network, model calls, or changes to original evidence.
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Storage.FileAccessMode, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapFrame, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapPixelFormat, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapAlphaMode, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrResult, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime]

function Await-WinRt($Operation, [Type]$ResultType) {
    $asTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
        $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and
        $_.GetParameters().Count -eq 1 -and
        $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
    } | Select-Object -First 1
    $task = $asTaskMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
    if (-not $task.Wait(10000)) { throw 'Windows OCR operation timed out' }
    return $task.Result
}

$resolvedPath = (Resolve-Path -LiteralPath $ImagePath).ProviderPath
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage(
    [Windows.Globalization.Language]::new('en-US'))
if ($null -eq $engine) { throw 'Windows English OCR is unavailable; no language installation attempted' }
$file = Await-WinRt ([Windows.Storage.StorageFile]::GetFileFromPathAsync($resolvedPath)) ([Windows.Storage.StorageFile])
$stream = Await-WinRt ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
$animation = $null
try {
    $decoder = Await-WinRt ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    if ($decoder.PixelWidth -gt [Windows.Media.Ocr.OcrEngine]::MaxImageDimension -or
        $decoder.PixelHeight -gt [Windows.Media.Ocr.OcrEngine]::MaxImageDimension) {
        throw 'Image exceeds Windows OCR dimensions; original image preserved'
    }
    if ($decoder.FrameCount -gt 64) { throw 'More than 64 image frames; preserve for manual review' }
    # WinRT's raw GIF frames can be palette/delta images rather than the visible
    # composited frame. Render those frames through the Windows image decoder.
    if ($decoder.DecoderInformation.CodecId -eq [Windows.Graphics.Imaging.BitmapDecoder]::GifDecoderId) {
        $animation = [System.Drawing.Image]::FromFile($resolvedPath)
    }
    $allLines = @()
    for ($frameIndex = 0; $frameIndex -lt $decoder.FrameCount; $frameIndex++) {
        if ($animation) {
            $null = $animation.SelectActiveFrame([System.Drawing.Imaging.FrameDimension]::Time, $frameIndex)
            $rendered = [System.Drawing.Bitmap]::new($animation.Width, $animation.Height)
            $canvas = [System.Drawing.Graphics]::FromImage($rendered)
            $framePath = Join-Path ([System.IO.Path]::GetTempPath()) ('homework-ocr-' + [guid]::NewGuid().ToString('N') + '.png')
            try {
                $canvas.Clear([System.Drawing.Color]::White)
                $canvas.DrawImageUnscaled($animation, 0, 0)
                $rendered.Save($framePath, [System.Drawing.Imaging.ImageFormat]::Png)
                $frameFile = Await-WinRt ([Windows.Storage.StorageFile]::GetFileFromPathAsync($framePath)) ([Windows.Storage.StorageFile])
                $frameStream = Await-WinRt ($frameFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
                try {
                    $frameDecoder = Await-WinRt ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($frameStream)) ([Windows.Graphics.Imaging.BitmapDecoder])
                    $bitmap = Await-WinRt ($frameDecoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
                } finally { if ($frameStream) { $frameStream.Dispose() } }
            } finally {
                $canvas.Dispose()
                $rendered.Dispose()
                if (Test-Path -LiteralPath $framePath) { Remove-Item -LiteralPath $framePath -Force }
            }
        } else {
            $frame = Await-WinRt ($decoder.GetFrameAsync($frameIndex)) ([Windows.Graphics.Imaging.BitmapFrame])
            $bitmap = Await-WinRt ($frame.GetSoftwareBitmapAsync(
                [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
                [Windows.Graphics.Imaging.BitmapAlphaMode]::Ignore)) ([Windows.Graphics.Imaging.SoftwareBitmap])
        }
        try {
            $result = Await-WinRt ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
            $allLines += @($result.Lines | ForEach-Object { $_.Text })
        } finally { if ($bitmap) { $bitmap.Dispose() } }
    }
    @{text=($allLines -join "`n"); lineCount=$allLines.Count; provider='windows-ocr';
      language='en-US'; frameCount=[int]$decoder.FrameCount; allFrames=$true; decoderVersion=2} |
        ConvertTo-Json -Compress -Depth 3
} finally {
    if ($animation) { $animation.Dispose() }
    if ($stream) { $stream.Dispose() }
}
