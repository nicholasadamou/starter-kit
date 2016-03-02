@echo off
TITLE Starter Kit
cls

echo Note: this script will install the project dependencies.
set /p response="Do you want ot continue? <y/n>"

if /i "%response%"=="y" (
goto :installDependencies

:installDependencies
  cls
  echo Installing Project Dependencies:
  set "filePath=%~dp0"
  cd %filePath%
  cmd /k npm install && bower install
)

if /i "%response%"=="n" (
  call setup.bat
)
