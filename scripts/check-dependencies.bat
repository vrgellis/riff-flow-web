
@echo off
setlocal

:: Function to check if a command exists
where python > nul 2>&1
if %errorlevel% equ 0 (
    echo Python is installed:
    python --version
) else (
    echo Python is NOT installed. Please install Python 3.
)

where pip > nul 2>&1
if %errorlevel% equ 0 (
    echo pip is installed:
    pip --version
) else (
    echo pip is NOT installed. Please install pip.
)

where git > nul 2>&1
if %errorlevel% equ 0 (
    echo Git is installed:
    git --version
) else (
    echo Git is NOT installed. Please install git.
)

where node > nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is installed:
    node --version
) else (
    echo Node.js is NOT installed. Please install Node.js.
)

where npm > nul 2>&1
if %errorlevel% equ 0 (
    echo npm is installed:
    npm --version
) else (
    echo npm is NOT installed. Please install npm.
)
