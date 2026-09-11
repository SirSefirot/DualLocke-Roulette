@echo off
setlocal

rem ============================================================
rem  Recompensas Dual-Locke - servidor local
rem  Deja este archivo en la MISMA carpeta que index.html
rem ============================================================

rem Puerto por defecto; se puede pasar otro:  iniciar.bat 3000
set PUERTO=8080
if not "%~1"=="" set PUERTO=%~1
if not "%~1"=="" set PUERTO=%~1

cd /d "%~dp0"

if not exist "index.html" (
    echo.
    echo  ERROR: no encuentro index.html
    echo  Deja iniciar.bat en la misma carpeta que index.html
    echo.
    pause
    exit /b 1
)

echo.
echo  ============================================
echo   Recompensas Dual-Locke
echo   Sirviendo en http://localhost:%PUERTO%
echo  ============================================
echo.
echo  Para parar el servidor: cierra esta ventana o pulsa Ctrl+C
echo.

rem --- Abre el navegador dos segundos despues, cuando el servidor ya escucha
start "" /b cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:%PUERTO%"

rem --- Intenta Python (py, luego python), y si no hay, Node
where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server %PUERTO%
    goto fin
)

where python >nul 2>nul
if %errorlevel%==0 (
    python -m http.server %PUERTO%
    goto fin
)

where npx >nul 2>nul
if %errorlevel%==0 (
    npx --yes serve -l %PUERTO%
    goto fin
)

echo.
echo  No tienes Python ni Node instalados.
echo  Instala Python desde https://www.python.org/downloads/
echo  y marca la casilla "Add python.exe to PATH".
echo.
pause
exit /b 1

:fin
echo.
echo  Servidor detenido.
pause