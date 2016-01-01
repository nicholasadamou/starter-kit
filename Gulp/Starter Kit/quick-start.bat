@echo off
TITLE Starter Kit
runas /noprofile /user:Administrator cmd
cls  

echo Note: this script will only work if you already ran, [setup.bat] first.
echo If you haven't please run it now.
set /p response="Would you like to continue? <y/n>"

if /i "%response%"=="y" (
  cls
  set "filePath=%~dp0"
  cd %filePath%

  gulp help
  cmd /k
)

if /i "%response%"=="n" (
  echo Starter Kit is Closing
  exit
)
