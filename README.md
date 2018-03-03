# Nicholas Adamou's Starter Kit [![Build Status](https://travis-ci.org/nicholasadamou/Starter-Kit.svg?branch=master)](https://travis-ci.org/nicholasadamou/Starter-Kit)

![Project Preview](https://cloud.githubusercontent.com/assets/7629661/9838465/89626e74-5a5e-11e5-9b7d-e0ce76856732.gif)

![license](https://img.shields.io/apm/l/vim-mode.svg)
[![Say Thanks](https://img.shields.io/badge/say-thanks-ff69b4.svg)](https://saythanks.io/to/NicholasAdamou)

Starter Kit is an opinionated build automation for front-end web development based on [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/), [Bower](http://bower.io/), [Babel](https://babeljs.io/), [SASS](http://sass-lang.com/), and [Pug](https://pugjs.org/).

*Note: Starter Kit is simply a guideline and it doesn't solve everything. It is up to you to modify whatever necessary to achieve your project goals.*

1. [About](#about)
1. [Technologies](#technologies)
1. [Requirements](#requirements)
1. [Install](#install)
1. [Set Up/Workflow](#set-upworkflow)
1. [How to Use](#how-to-use)
1. [Build](#build)
    1. [Environments](#environments)
        1. [Development](#development)
        1. [Production](#production)
1. [Browsersync](#browsersync)
    1. [Local URLs](#local-urls)
    1. [Options](#options)
1. [Assets](#assets)
    1. [Data](#data)
	1. [Docs](#docs)
    1. [Fonts](#fonts)
    1. [Images](#images)
    1. [Media](#media)
    1. [Miscellaneous](#miscellaneous)
    1. [Vendors](#vendors)
1. [JS](#js)
1. [SASS](#sass)
    1. [BEM Structure](#bem-structure)
1. [Pug](#pug)
    1. [Pug Structure](#pug-structure)
    1. [Environment Variables](#environment-variables)
1. [Configuration](#configuration)
1. [Inspiration](#inspiration)
1. [License](#license)

## About
Starter Kit is a simple, responsive boilerplate to kickstart any responsive project.
It is built on [Scotch\box](https://github.com/scotch-io/scotch-box), to provide a simplistic start to any web development project. This kit is built to be used in conjunction with [Gulp](http://gulpjs.com/) and [Vagrant](https://www.vagrantup.com/) to automate different tasks as a web developer.

## Technologies

- [**Vagrant**](https://www.vagrantup.com/) - Development Environments Made Easy
- [**Scotch\box**](https://box.scotch.io/) - The Perfect / Easiest Local Dev Environment
- [**NodeJS**](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [**Gulp**](http://gulpjs.com) - Automate and enhance your workflow.
- [**Yarn**](https://yarnpkg.com/en/docs/install) - Fast, Reliable, and secure dependency management.
- [**Surge**](https://surge.sh) - Simple, single-command web publishing. Publish HTML, CSS, and JS for free, without leaving the command line.
- [**GitHub Pages**](https://pages.github.com/) - Websites for you and your projects. Hosted directly from your GitHub repository. Just edit, push, and your changes are live.
- [**PostCSS**](http://postcss.org/) - A tool for transforming CSS with JavaScript.
- [**Pug**](https://pugjs.org) - Simple language for writing HTML templates.
- [**SASS**](http://sass-lang.com) - CSS with superpowers.
- [**Rucksack**](https://simplaio.github.io/rucksack/) - A little bag of CSS superpowers.
- [**Skeleton**](https://github.com/dhg/Skeleton) - A simple, responsive boilerplate to kickstart any responsive project.
- [**Babel**](https://babeljs.io/) - Babel is a JavaScript compiler; use next generation JavaScript, today.

## Requirements

- [Virtualbox](https://www.virtualbox.org/)
- [Vagrant](https://www.vagrantup.com/)
- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Bower](https://bower.io/)
- [localtunnel](https://github.com/localtunnel/localtunnel)

```bash
npm install -g yarn bower gulp localtunnel
```

To install `Virtualbox` and `Vagrant`:

1. if on `Windows`, use [Chocolatey](https://chocolatey.org/):
    ```powershell
    cinst -y virtualbox virtualbox.extensionpack vagrant vagrant-manager
    ```
2. if on `MacOS`, use [homebrew](https://brew.sh/):
    ```bash
    brew cask install virtualbox virtualbox-extension-pack vagrant vagrant-manager
    ```

**Note**: **(`Windows` Users)** In order for **`localtunnel`** to work properly, please configure `Windows Firewall` to *allow* `port 3000, 3001` to *allow* **in-bound** and **out-bound** connections (`port 3000, 3001` is **Browsersync**'s default port allocation). For *Security* reasons, only *allow* **in-bound** and **out-bound** connections on `port 3000, 3001` on your home network.

Gulp is the process that will run all the task of compilation, watchers, and others. Bower will get the dependencies for the client-side like jQuery. Yarn is an alternative to npm for dependency managment. It is much more reliable when compared to npm, so we will use yarn for dependency management instead of npm. Virtualbox and Vagrant are used for the spin-up development environment. Those are the only requirements to run this project.

## Install
In order to start using this project, you need to clone/download it to your machine.

## Set Up/Workflow
Now after you have cloned/downloaded the kit to a desirable location, you will need to navigate to the `Starter Kit` folder using terminal and execute the following commands to gather all the dependencies, bring up the vagrant box and open `Gulp Help`.

```
vagrant up
vagrant ssh
cd /var/www
gem install travis
yarn install-dependencies
gulp help
```
**Note**: **(`Windows` Users)** If after running `vagrant ssh` you are presented with the below error, please follow [How to use vagrant on windows](http://tech.osteel.me/posts/2015/01/25/how-to-use-vagrant-on-windows.html) guide for connecting to the VM via SSH.

```
The `ssh` executable found in the PATH is a PuTTY Link SSH client.
Vagrant is only compatible with OpenSSH SSH clients. Please install
an OpenSSH SSH client or manually SSH in using your existing client
using the information below.

Host: 127.0.0.1
Port: 2222
Username: vagrant
Private key: C:/dev/Starter-Kit/.vagrant/machines/default/virtualbox/private_key
```

After the processes finish, you can now proceed into the `How to Use` section to understand each option the kit presents to you.

## How to Use
To start using the kit, open the project on the code editor of your choice and start coding.

To compile and live-preview all of your changes, you have some commands that will help you. Here is a list of commands you should know.

Every command has to be executed on the root directory of the project using the gulp command like `gulp clean` or `gulp build`.

* **start**: Compile and watch for changes (For dev.)
* **clean**: Removes all the compiled files in public/
* **ftp**: Deploy to an FTP/SFTP server
* **surge**: Deploy to a Surge.sh domain
* **ghpages**: Deploy to Github-Pages
* **js**: Compile the JavaScript files
* **pug**: Compile the Pug templates
* **sass**: Compile the SASS styles
* **assets**: copy static files from src/assets to public/assets
* **images**: copy and optomize image files from src/assets/images to public/assets/images
* **data**: copy data files from src/assets/data to public/assets/data
* **docs**: copy (.pdf) files from src/assets/docs to public/assets/docs
* **fonts**: copy font files from src/assets/fonts to public/assets/fonts
* **media**: copy media files from src/assets/media to public/assets/media
* **misc**: copy misc files from src/assets/misc to ./public
* **build**: build the project
* **pagespeed**: Run Google PageSpeed Insights
* **help**: Print a list of available Gulp tasks
* **browserSync**: Start the browser-sync server

If you are in the development process, the `gulp start` command is the best option for you. Go to the project folder in the console and execute `gulp start`, it will compile the project and start server that will refresh every time you change something in the code. The command will be waiting for changes and will tell you how to access the project from local and public url. Every browser that points to that url will be auto refreshed. As an extra feature for testing purpose any interaction on one browser will be reflected on any others. Try it on a phone, tablet, and pc at the same time.

## Build

Generate a fresh build of your project. Task will run several individual tasks on files within `./src` and then output them to `./public`.

Run: `gulp build`

### Environments

You can specify which environment you want to build in [`config.js`](gulp/config.js). By default, `config.environment` is set to `development`.

#### Development

`environment: development`

#### Production

`environment: production`

## Browsersync

Start a local dev server. Additionally, gulp will watch for any changes to files and reload browser while server is running.

Run: `gulp browsersync`

### Local URLs

* Local - http://localhost:3000
* UI - Set to `false` by default

### Options

You can modify port, proxy, tunnel, and many other settings in [`config.js`](gulp/config.js). For more information about BrowserSync go to [http://www.browsersync.io/](http://www.browsersync.io/).

## Assets

Run several individual tasks to copy static files from `src/assets` to `public/assets`.

Run: `gulp assets`

### Data

Copy data files to `public/assets/data`.

Run: `gulp data`

### Docs

Copy (.pdf) files to `public/assets/docs`.

Run: `gulp data`

### Fonts

Copy font files to `public/assets/fonts`.

Run: `gulp fonts`

### Images

Copy images to `public/assets/images`. As a personal preference Starter Kit uses [imagemin](https://github.com/sindresorhus/gulp-imagemin) and [`imagemin-pngquant`](https://github.com/imagemin/imagemin-pngquant) to automate image optimization. However, it is strongly recommended to use services like [TinyPNG](https://tinypng.com/) and [TinyJPG](https://tinyjpg.com/) to optimize images manually.

Run: `gulp images`

### Media

Copy media files to `public/assets/media`.

Run: `gulp media`

### Miscellaneous

Copy miscellaneous files, such as `.htaccess` or `robots.txt`, to the root of `./public`.

### Vendors

Bundle vendor files to `public/vendors`. You can install new client-side vendors using [`Bower`](https://bower.io/search/) or [`yarn`](https://yarnpkg.com/en/packages), then reference appropriate files in `./src/vendors/bundle.js` and in `src/sass/settings/_vendors.scss`. Follow the guidelines for [`gulp-include`](https://www.npmjs.com/package/gulp-include) to properly add the plugins to your project. 

Starter Kit comes with the following tools by default.

1. [`jQuery`](https://jquery.com/)
1. [`animate-css`](https://daneden.github.io/animate.css/)
1. [`brand-colors`](https://github.com/Reimertz/brand-colors.git) 
1. [`colors`](https://github.com/mrmrs/colors.git)
1. [`normalize-css`](https://github.com/necolas/normalize.css.git)
1. [`skeleton`](https://github.com/dhgamache/Skeleton.git)

Run: `gulp vendors`

## js

Run a series of sub-tasks to generate final JavaScript files. See `gulp/tasks/build/js.js` for reference.

*Note: Each file on the root of `src/js` will be compiled to its own file in `public/assets/js`. Each file can have own includes, just like Sass with `@import` functionality. See [`src/js/index.js`](src/js/index.js) as an example.*

Run: `gulp js`

## SASS

Run a series of sub-tasks to generate final CSS files. See [`gulp/tasks/build/sass.js`](gulp/tasks/build/sass.js) for reference.

*Note: Each file on the root of `src/sass` will be compiled to its own file in `public/assets/css`.*

Run: `gulp sass`

### BEM Structure

Starter Kit follows a strict naming convention using [BEM](https://en.bem.info/) methodology.

Directory structure and selector names are divided into namespaces based on [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) article by Harry Roberts.

## Pug

Run a series of sub-tasks to generate final HTML files. See [`gulp/tasks/build/pug.js`](gulp/tasks/build/pug.js) for reference.

Run: `gulp pug`

### Pug Structure

Starter Kit follows an opinionated directory structure. To learn more about Pug go to [https://pugjs.org/api/getting-started.html/](https://pugjs.org/api/getting-started.html/).

### Environment Variables

Every Pug file has access to global `env` variable. You can use it to conditionally load unminified/minified assets. See [`src/views/includes/head.pug`](src/views/includes/head.pug) as an example.

## Configuration
This project has some nice configuration options to meet all your needs. To configure, you will need to edit the [`gulp/config.js`](gulp/config.js) file and change any value you need. Every aspect of this configuration is described in the file so that you can understand their functions.

## Inspiration

- [**carloscuesta/starterkit**](https://github.com/carloscuesta/starterkit) - A Front End development Gulp.js based workflow. 🚀

## License

© 2018 Nicholas Adamou.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: LICENSE
