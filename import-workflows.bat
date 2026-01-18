@echo off
title AutoFlow Hub - Import Workflows
echo AutoFlow Hub - Workflow Import Tool
echo ====================================
echo.
cd backend
npm run import-workflows
echo.
echo Import complete! Press any key to exit...
pause >nul
