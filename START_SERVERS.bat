@echo off
echo Starting AutoFlow Hub Servers...
echo.

REM Start Backend
start "AutoFlow Backend" cmd /k "cd /d C:\Users\David\Desktop\Genspark\autoflow-hub\backend && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start Frontend
start "AutoFlow Frontend" cmd /k "cd /d C:\Users\David\Desktop\Genspark\autoflow-hub\frontend && npm run dev"

echo.
echo ✅ Servers are starting!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit (servers will continue running)...
pause >nul
