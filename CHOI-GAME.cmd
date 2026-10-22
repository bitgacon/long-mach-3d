@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
 start "" http://127.0.0.1:8788
 node serve.cjs
 goto end
)
where python >nul 2>nul
if %errorlevel%==0 (
 start "" http://127.0.0.1:8788
 python -m http.server 8788 --bind 127.0.0.1 --directory dist
 goto end
)
echo Can cai Node.js hoac Python 3 va them vao PATH.
:end
pause
