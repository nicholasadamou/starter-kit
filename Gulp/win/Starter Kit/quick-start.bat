@echo off
TITLE Starter Kit
cls

echo Note: this script will only work if you already ran, [setup.bat] first.
set /p response="Did you run [setup.bat] already? <y/n>"

if /i "%response%"=="y" (
goto :gainAdminRights

:gainAdminRights
  cls
  echo Give [setup.bat] Administrative Rights:
  runas /noprofile /user:Administrator cmd
  goto :setupKit

:setupKit
  cls
  echo Setting Up Starter Kit:
  set "filePath=%~dp0"
  cd %filePath%
  cmd /k gulp help
)

if /i "%response%"=="n" (
  call setup.bat
)
