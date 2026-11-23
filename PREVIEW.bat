@echo off
REM Tayyib Malik & Co. - one-click local preview (Windows).
REM Serves the built site from this folder and opens it in the browser.
REM Requires Node.js (https://nodejs.org). Close this window to stop the server.
title Tayyib Malik Website Preview
cd /d "%~dp0"
echo.
echo  Tayyib Malik ^& Co. - website preview
echo  Opening http://localhost:3000 in your browser...
echo  Close this window to stop the preview server.
echo.
start "" http://localhost:3000
npx --yes serve -s -l 3000 .
pause
