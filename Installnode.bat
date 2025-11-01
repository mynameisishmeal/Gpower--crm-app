@echo off
setlocal

REM Check if Node.js is installed
node -v >nul 2>nul
if %errorlevel% equ 0 (
    echo Node.js is already installed.
) else (
    echo Node.js is not installed. Installing...
    REM Install Node.js using Chocolatey
    choco install nodejs -y
)

pause
endlocal
