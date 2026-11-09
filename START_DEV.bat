@echo off
title Zefanya Zulian - Executive Platform (Development Server)
color 0b
echo ===================================================================
echo   ZEFANYA ZULIAN - LUXURY EXECUTIVE PLATFORM
echo   Starting Next.js Development Server on http://localhost:3000...
echo ===================================================================
echo.
cd /d "%~dp0"

echo [1/2] Memeriksa instalasi dependensi...
if not exist "node_modules" (
    echo Menginstal dependencies...
    call npm.cmd install
)

echo [2/2] Menjalankan server Next.js...
echo.
echo Website Publik : http://localhost:3000
echo Executive CMS  : http://localhost:3000/admin (Password: ZefanyaExecutive2026!)
echo.
echo Tekan CTRL + C untuk menghentikan server.
echo ===================================================================
echo.
call npm.cmd run dev
pause
