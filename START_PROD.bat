@echo off
title Zefanya Zulian - Executive Platform (Production Server)
color 0a
echo ===================================================================
echo   ZEFANYA ZULIAN - LUXURY EXECUTIVE PLATFORM
echo   Building and Starting Production Server on http://localhost:3000...
echo ===================================================================
echo.
cd /d "%~dp0"

echo [1/2] Mengompilasi build produksi Next.js...
call npm.cmd run build

echo [2/2] Menjalankan server produksi teroptimasi...
echo.
echo Website Publik : http://localhost:3000
echo Executive CMS  : http://localhost:3000/admin (Password: ZefanyaExecutive2026!)
echo.
echo Server siap dan berjalan! Tekan CTRL + C untuk menghentikan.
echo ===================================================================
echo.
call npm.cmd run start
pause
