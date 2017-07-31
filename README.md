# Nicholas Adamou's Starter Kit

![Project Preview](https://cloud.githubusercontent.com/assets/7629661/9838465/89626e74-5a5e-11e5-9b7d-e0ce76856732.gif)
![Alt text](http://www.kolszewski.com/images/vendors_v2.png)

![license](https://img.shields.io/apm/l/vim-mode.svg)
[![Say Thanks](https://img.shields.io/badge/say-thanks-ff69b4.svg)](https://saythanks.io/to/NicholasAdamou)

## About
Starter Kit is a simple, responsive boilerplate to kickstart any responsive project.
It is built on [Skeleton](https://github.com/dhg/Skeleton), to provide a simplistic start to any web development project. This kit is built to be used in conjunction with [gulp](http://gulpjs.com/) to automate different tasks as a web developer.

## Technologies

- [**NodeJS**](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [**Gulp**](http://gulpjs.com) - Automate and enhance your workflow.
- [**Yarn**](https://yarnpkg.com/en/docs/install) - Fast, Reliable, and secure dependency management.
- [**BabelJS**](https://babeljs.io/) - Babel puts a soft cushion between a web application and the many cool new file formats developed for use with node.js such as CoffeeScript, SASS, and Jade.
- [**Surge**](https://surge.sh) - Simple, single-command web publishing. Publish HTML, CSS, and JS for free, without leaving the command line.
- [**GitHub Pages**](https://pages.github.com/) - Websites for you and your projects. Hosted directly from your GitHub repository. Just edit, push, and your changes are live.
- [**PostCSS**](http://postcss.org/) - A tool for transforming CSS with JavaScript.
- [**CSScomb**](csscomb.com) - Beautifies CSS syntax
- [**Pug**](https://pugjs.org) - Simple language for writing HTML templates.
- [**SASS**](http://sass-lang.com) - CSS with superpowers.
- [**Rucksack**](https://simplaio.github.io/rucksack/) - A little bag of CSS superpowers.
- [**Skeleton**](https://github.com/dhg/Skeleton) - A simple, responsive boilerplate to kickstart any responsive project.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com)
- [Yarn](https://yarnpkg.com/en/docs/install)

```bash
npm install -g gulp yarn bower
```

Gulp is the process that will run all the task of compilation, watchers, and others. Bower will get the dependencies for the client-side like jQuery. Yarn is an alternative to npm for dependency managment. It is much more reliable when compared to npm, so we will use yarn for dependency management instead of npm. Those are the only requirements to run this project.

## Install
In order to start using this project, you need to clone/download it to your machine.

## Set Up
Now after you have cloned/downloaded the kit to a desirable location, you will need to navigate to the `Starter Kit` folder using terminal and execute the following commands to gather all the dependencies and open the `Gulp Help` screen.

```
yarn install
gulp help
```
After the two processes finish, you can now proceed into the `How to Use` section to understand each option the kit presents to you.

## How to use
To start using the kit, open the project on the code editor of your choice and start coding.

To compile and live-preview all of your changes, you have some commands that will help you. Here is a list of commands you should know.

Every command has to be executed on the root directory of the project using the gulp command like `gulp clean` or `gulp build`.

* **start**: Compile and watch for changes (For development)
* **clean**: Removes all the compiled files on ./dist
* **ftp**: Deploy ./dist to an FTP/SFTP server
* **surge**: Deploy ./dist to a Surge.sh domain
* **ghpages**: Deploy to Github Pages
* **js**: Compile the JavaScript files
* **pug**: Compile the Pug templates
* **sass**: Compile the Sass styles
* **images**: Copy the newer to the dist folder
* **favicon**: Copy the favicon to the dist folder
* **vendors**: Copy the vendors to the dist folder
* **build**: build the project
* **watch**: Watch for any changes on the each section
* **pagespeed**: Run Google PageSpeed Insights
* **help**: Print this message
* **browserSync**: Start the browser-sync server

If you are in the development process, the `gulp start` command is the best option for you. Go to the project folder in the console and execute `gulp start`, it will compile the project and start server that will refresh every time you change something in the code. The command will be waiting for changes and will tell you how to access the project from local and public url. Every browser that points to that url will be auto refreshed. As an extra feature for testing purpose any interaction on one browser will be reflected on any others. Try it on a phone, tablet, and pc at the same time.

## Structure
The project has a very simple and flexible structure. If the default place for any file or directory needs to be moved, be sure to update the new position on the config file.

```
├───gulp -> The containing folder for all things 'gulp'
│   ├───tasks -> All of the different gulp tasks used in 'gulpfile.js'
│   │   ├───base -> basic tasks, such as 'help' and 'watch'
│   │   ├───build -> tasks used for compiling 'pug' or 'sass'
│   │   ├───deploy -> tasks used for deploying to servers such as 'surge' or 'GitHub pages'
│   │   ├───util -> utility tasks, such as 'Google PageSpeed Insights'
│   ├───config.js -> Project configuration
│   ├───error_handler.js -> Used for handling any error that arises in the gulp process.
│   ├───paths.js -> Contains routes to different paths, such as the 'sass' path.
├───dist -> All of the compiled files will be placed here (Distribution)
│   ├───assets -> Compiled Assets
│   ├───index.html -> Compiled Pug files
│   ├───vendors -> Project dependencies
├───src -> All of the un-compiled files will be placed here (Development)
│   ├───assets -> Assets for the project
│   │   ├───images -> Images
│   │   └───js ->  Uncompiled Javascript directory
├───sass/ -> Uncompiled SASS directory
│   ├───partials/ -> Tools/Frameworks
│   ├───index.sass -> Uncompiled sass file
│   │   index.sass -> Main sass file, where all other sass files should be included.
│   ├───vendors -> Vendors folder for all the dependencies (Managed by Bower)
├───views/ -> Uncompiled Pug directory
│   ├───includes/ -> Un-Compiled Pug files to be included inside the `index.pug` file
│   │   └───partials/ -> Contains the main `_head.pug` and `_scripts.pug` file(s)
│   ├───layouts/ -> Contains the main '_layout.pug' file to be added as an 'extension' to the 'index.pug' file
│   ├───index.pug -> Un-Compiled Pug file
├───.bowerrc -> Defines where the dependencies will be installed
├───bower.json -> Bower configuration file for managing bower dependencies
├───.csscomb.json -> CSSComb style guide configuration file
├───.babelrc -> Babel configuration file\
├───.travis.yml -> travis CLI configuration file
├───package.json -> NodeJS configuration file for managing node dependencies
├───gulpfile.js -> Gulp tasks
```
All the files in the dist folder will be auto-generated by the different tasks when you compile the project. Be sure to not modify any files manually in the dist folder because changes will be replaced in the compilation process.

## Configuration
This project has some nice configuration options to meet all you needs. To configure, you will need to edit the `./gulp/config.js` file and change any value you need. Every aspect of this configuration is described in the file so that you can understand their functions.

## Inspiration

- [**carloscuesta/starterkit**](https://github.com/carloscuesta/starterkit) - A Front End development Gulp.js based workflow. 🚀
