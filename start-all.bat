@echo off
echo Starting AutoFlow Hub - Full Stack Application
echo =============================================
echo.

echo Starting Backend Server...
start "AutoFlow Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "AutoFlow Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo =============================================
echo Both servers are starting in separate windows:
echo - Backend: http://localhost:3001
echo - Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
