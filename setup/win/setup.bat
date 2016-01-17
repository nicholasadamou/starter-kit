@echo off
title Starter Kit
set "filePath=%~dp0"
cd %filePath%

cls

echo Note: this script will take a while [approx. 5 min] to complete.
set /p response="Would you like to continue? <y/n>"
if /i "%response%"=="y" (
goto :checkNodeVersion

:checkNodeVersion
  cls
  echo Current NodeJS version:
  call npm -v
  timeout 5
  if errorlevel 1 goto :installNode
  goto :updateNode

:installNode
  cls
  echo Installing NodeJS:
  powershell -Command "(New-Object Net.WebClient).DownloadFile('https://nodejs.org/dist/v5.3.0/node-v5.3.0-x64.msi', 'node-v5.3.0-x64.msi')"
  echo downloading file, node-v5.3.0-x64.msi, from https://nodejs.org/dist/v5.3.0/node-v5.3.0-x64.msi...
  set "fileName=node-v5.3.0-x64.msi"
  start %fileName%
  echo NodeJS was successfully installed.
  timeout 5
  goto :updateNode

:updateNode
  cls
  echo Updating NodeJS:
  call npm cache clean -f
  call npm install -g n
  call n stable
  cls
  echo NodeJS was successfully updated to version #:
  node -v
  timeout 5
  goto :installGulp

:installGulp
  cls
  echo Installing GulpJS:
  call npm install -g gulp
  echo GulpJS was successfully installed.
  timeout 5
  goto :installDependencies

:installDependencies
  cls
  echo Installing Project Dependencies:
  call npm install && bower install
  echo Project Dependencies were successfully installed.
  timeout 5
  goto :primaryFunction

:primaryFunction
  cls
  echo Starter Kit Log:
  echo NodeJS is installed.
  echo GulpJS is installed.
  echo Project Dependencies are installed.
  set /p response="Would you like to continue? <y/n>"

  if /i "%response%"=="y" (
    cls
    echo Setting Up Starter Kit:
    cmd /k gulp help
  )

  if /i "%response%"=="n" goto :exitFunction

:exitFunction
  cls
  echo Starter Kit is Closing
  exit
)

if /i "%response%"=="n" (
  echo Starter Kit is Closing
  timeout 5
  exit
)
