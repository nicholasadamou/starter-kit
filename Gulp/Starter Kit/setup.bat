@echo off
TITLE Starter Kit
runas /noprofile /user:Administrator cmd
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
  echo downloading file, node-v5.3.0-x64.msi, from https://nodejs.org/dist/v5.3.0/node-v5.3.0-x64.msi....
  set "fileName=node-v5.3.0-x64.msi"
  %fileName%

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
  goto :installBower

:installBower
  cls
  echo Installing Bower:
  call npm install -g gulp bower

  echo Bower was successfully installed.
  goto :installGulp

:installGulp
  cls
  echo Installing GulpJS:
  call npm install -g gulp

  echo Gulp was successfully installed.
  timeout 5
  goto :installDependencies

:installDependencies
  cls
  echo Installing Project Dependencies:
  call npm install && bower install
  call npm install --save-dev gulp-rucksack
  call npm install --save-dev gulp-imagemin
  call npm install --save imagemin-pngquant

  echo Project Dependencies were successfully installed.
  timeout 5
  goto :primaryFunction

:primaryFunction
  cls
  echo Starter Kit Log:
  echo NodeJS is installed.
  echo GulpJS is installed.
  echo Gulp Dependencies are installed.
  set /p response="Would you like to continue? <y/n>"

  if /i "%response%"=="y" (
    cls
    set "filePath=%~dp0"
    cd %filePath%

    gulp help
    cmd /k
  )

  if /i "%response%"=="n" goto :exitFunction

:exitFunction
  cls
  echo Starter Kit is Closing
  exit
