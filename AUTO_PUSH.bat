@echo off
title Auto Push to GitHub - Zefanya Executive Portfolio
echo ======================================================================
echo   ZEFANYA ZULIAN - AUTO SYNC & PUSH TO GITHUB (Zefanya86)
echo ======================================================================
echo.

cd /d "%~dp0"

echo [1/3] Menambahkan seluruh berkas dan perubahan terbaru...
git add .

echo.
echo [2/3] Menyimpan perubahan ke riwayat git (commit)...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$d = Get-Date -Format 'yyyy-MM-dd HH:mm'; git commit -m \"chore(sync): update executive platform [$d]\""

echo.
echo [3/3] Mem-push perubahan ke GitHub (Zefanya86/zefanya-executive-portfolio)...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$token = (gh auth token).Trim(); git -c credential.helper= -c credential.https://github.com.helper= push \"https://Zefanya86:$token@github.com/Zefanya86/zefanya-executive-portfolio.git\" main"

echo.
echo ======================================================================
echo   SUKSES! Kode terbaru telah ter-push ke:
echo   https://github.com/Zefanya86/zefanya-executive-portfolio
echo.
echo   * Jika sudah terhubung ke Vercel, website Anda akan otomatis
echo     ter-update dalam waktu ~30-60 detik.
echo ======================================================================
echo.
pause
