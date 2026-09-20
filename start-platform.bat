@echo off
rem Oehler-Huang Platform - one-click classroom server.
rem Double-click before class, then open your lesson deck, click Selector
rem and sign in as teacher to see homework badges (trophy / turtle).
title Oehler-Huang Platform (classroom server)
cd /d "%~dp0"

rem Prefer node on PATH; fall back to the Kimi desktop runtime copy.
set "NODE=node"
where node >nul 2>nul
if errorlevel 1 set "NODE=C:\Users\oehle\AppData\Local\Programs\Kimi\resources\resources\runtime\node.exe"

echo Starting the Oehler-Huang platform at http://127.0.0.1:4173 ...
echo Keep this window open during class. Close it or press Ctrl+C to stop.
echo.
"%NODE%" apps\platform\scripts\serve.mjs
echo.
echo The platform server has stopped.
pause
