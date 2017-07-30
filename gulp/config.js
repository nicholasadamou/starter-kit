module.exports = function() {
    // Configuration Options
    var config = {
        /**
         * This is the environment in which you are working on
         * Options are:
         * - development
         * - production
         * - empty string
         * For the development build, the output will be verbose.
         * For the production build, the output will be compress and minified
         * If it is set to an empty string the environment will be extract from
         * the NODE_ENV environment var.
         */
        environment: 'development',
        FTP: {
            host: 'HOST',
            user: 'USER',
            password: 'PASSWORD',
            secure: true, //Set 'true' for secured FTP connections
            target: 'FTP-DIRECTORY'
        },
        SURGE: {
            project: './dist', // Path to your static build directory
            domain: 'YOURDOMAIN.surge.sh' // Your domain or Surge subdomain
        },
        // Google PageSpeed Insights URL Option
        URL: 'example.com',
        pkg: require('../package.json'),
        // Root dir
        root: require('path').dirname(__dirname),
        // Source code dir
        src: 'src/',
        // Build dir is where the compiled code will be outputted.
        dist: 'dist/',
        // Where the images are inside the src folder.
        // They will be copied to the same dir on the dist folder.
        iamges: 'assets/images',
        // Favicon
        favicon: 'favicon' + '.' + 'ico|png|jpg|jpeg|svg',
        /**
         * Views directory. This is the dir where all the Pug files should live
         * Important: only *.pug files will be compiled in this exact dir and not any sub dir.
         * you could use a subdir to include partials and use the include command in Pug to included them.
         */
        views: 'views/',
        /**
         * As this is a sass-based project, this is the dir for the sass files. Every file
         * under this dir will be watched for changes, but only the index file will be compiled.
         */
        sass: 'sass/index.s(a|c)ss',
         // Dir where the sass will be compiled to
        css: 'assets/css',
        // This are the options that will be passed to the sass compiler
        sassOptions: {
            /**
             * This is how the compiled version of sass will look like
             * Output style options are:
             * - expanded
             * - nested
             * - compact
             * - compressed
             */
            outputStyle: 'compressed',
            //Source Mapping Support
            sourceComments: 'map',
            // Relative path to the css where the images dir is.
            imagePath: '../images',
            // Sass precision
            precision: 3,
        },
        js: 'assets/js',
        /**
         * This is the relative to build dir for vendors assets like jQuery. Vendors are
         * managed by bower and if the directory should be changed, you should change the
         * .bowerrc file in the root directory as well.
         */
        vendors: 'vendors',
        // This is the browser sync options
        syncOptions: {
            // Entry point for the application
            index: 'index.html',
            // If this option is true, the project will be open in browser after compile.
            open: false,
            // Notify on all the browsers when the page updates.
            notify: true
        }
    }

    return config;
}