# Starter Kit [Gulp]
![Project Preview](source/assets/images/thumbnail.png)

![status](https://img.shields.io/pypi/status/Django.svg)
![Build Passing](https://img.shields.io/scrutinizer/build/g/filp/whoops.svg)
![dependencies](https://img.shields.io/david/strongloop/express.svg)
![devDependencies](https://img.shields.io/david/dev/strongloop/express.svg)
![license](https://img.shields.io/apm/l/vim-mode.svg)

## About
Starter Kit is a simple, responsive boilerplate to kickstart any responsive project.
It is built on [Skeleton](https://github.com/dhg/Skeleton), to provide a simplistic start to any web development project.

## Requirements
This project does have some requirements that you will need to meet in order to compile it. First of all you need NodeJS in order to run javascript on the console, you can go to the [NodeJS](http://nodejs.rg) site and follow through the installation process. After you get the `npm` command on the console, you need to install Gulp and Bower globally with the following command:

```
npm install -g gulp bower
```

Gulp is the process that will run all the task of compilation, watchers, and others. Bower will get the dependencies for the client-side like jQuery. Those are the only requirements to run this project.

## Install
In order to start using this project, you need to clone/download it to your machine.

## Set Up
Now after you have cloned/downloaded the kit to a desirable location, you can choose one of the following methods of setting up the kit.

## Method One
After you have it on you machine, you will need to navigate to the project folder using terminal and execute the following command to gather all the dependencies.
```
npm install && bower install
npm install gulp-rucksack --save-dev
npm install --save-dev gulp-imagemin
npm install --save imagemin-pngquant
```

## Method Two
Additionally, you can use the custom `setup` script, which will automate the previously mentioned information.

There are two versions, one for Mac, and one for Windows.

Mac file extension: `.app`
Windows file extension: `.bat`

Choose the one that suits your OS.

*Mac Version Notes:*

Double click on the `setup.app` file to execute the setup process.

Note: When you first run the script, a dialog box will appear. Navigate to the `Starter Kit` directory and press `choose`. I am still working on a version, much like the Windows version, where you will not have to navigate to the `Starter Kit` directory.

*Windows Version Notes:*

Unlike the Mac version, the Windows version of the setup process doesn't require you to navigate to the `Starter Kit` directory. It autodetects the file path that the `setup.bat` file is located in.  

After the process finishes, you will be prompted with the `Gulp Help` screen. Once you've reached this point, you can proceed into the `How to Use` section to understand each option the kit gives you.

## How to use
To start using it, the only thing you will need to do is open the project on the code editor of your choice and start coding. To compile and live preview all of your changes, you have some commands that will help you. Here are the list of commands you should know.

Every command has to be executed on the root directory of the project using the gulp command like `gulp clean` or `gulp build`

* **start**: Compile and watch for changes (For development)
* **clean**: Removes all the compiled files on ./build
* **js**: Compile the JavaScript files
* **jade**: Compile the Jade templates
* **rucksack**: Compile the Rucksack styles
* **imagemin**: Minify PNG, JPEG, GIF and SVG images
* **sass**: Compile the Sass styles
* **images**: Copy the newer to the build folder
* **favicon**: Copy the favicon to the build folder
* **vendors**: Copy the vendors to the build folder
* **build**: Build the project
* **watch**: Watch for any changes on the each section
* **help**: Print this message
* **browsersync**: Start the browsersync server

If you are in the development process, the `gulp start` command is the best option for you. Go to the project folder in the console and execute `gulp start`, it will compile the project and start server that will refresh every time you change something in the code. The command will be waiting for changes and will tell you how to access the project from local and public url. Every browser that points to that url will be auto refreshed. As an extra feature for testing purpose any interaction on one browser will be reflected on any others. Try it on a phone, tablet and pc at the same time.

## Using Sass Command Line Tools (Source Mapping Sass -- WIP)

If you want to enable source mapping of this project, please type in the terminal the following:
`sass source/sass/index.sass:build/assets/css/index.css` (Note:`--sourcemap` command has been deprecated and is done automatically with the `sass` command.)

Please note that this function requires that the `sass command line tools` are installed.
If they are not, install them in the following way in the terminal:
`sudo gem install -n /usr/local/bin sass`

To update your `sass` version, do the following:
`sudo gem update sass`

Once source mapping is installed, please follow this tutorial below to get started:
[Using source maps with Sass 3.3](http://thesassway.com/intermediate/using-source-maps-with-sass)

## Structure
The project has a very simple and flexible structure. If the default place for any file or directory needs to be moved, be sure to update the new position on the config file.

```
├───build -> All the compiled files will be placed here (Distribution)
│   ├───assets -> Compiled Assets
│   ├───index.html -> Compiled Jade files
│   ├───vendors -> Project dependencies
├───source -> Source files for the project
│   ├───assets -> Assets for the project
│   │   ├───images -> Images
│   │   └───js -> Scripts
│   ├───sass  -> Sass styles
│   │   index.sass -> Main sass file, where all other sass files should be included.
│   ├───vendors -> Vendors 	folder for all the dependencies (Managed by Bower)
│   └───views -> Templates directory for Jade files
│   │   └───index.jade
├───.bowerrc -> Defines where the dependencies will be installed
├───bower.json -> Bower configuration file for managing project dependencies
├───package.json -> NodeJS configuration file for managing node dependencies
├───gulpfile.js -> Gulp Tasks
├───config.js -> Project configuration
```
All the files in the build folder will be auto-generated by the different tasks when you compile the project. Be sure to not modify any files manually in the build folder because changes will be replaced on the compilation process.

## Configuration
This project has some nice configuration options to meet all you needs. To configure, you will need to edit the `config.js` file and change any value you need. Every aspect of this configuration is described in the file so that you know the functions.
