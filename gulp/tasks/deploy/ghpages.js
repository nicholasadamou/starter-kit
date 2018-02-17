'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    argv = require('argv');

var paths = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('ghpages', ['build'], function() {
    console.log('->  Deploying to Github Pages');
    // To deploy with Travis CI:
    //   1. Generate OAuth token on GitHub > Settings > Application page
    //   2. Encrypt and save that token into the `.travis.yml` file by running:
    //      `travis encrypt GITHUB_TOKEN="<your-oauth-token>" --add`

    return gulp.src(paths.to.build + '**/*')
        .pipe($.if('**/robots.txt', !argv.production ? $.replace('Disallow:', 'Disallow: /') : $.util.noop()))
        .pipe($.ghPages({
            remoteUrl: 'https://' + process.env.GITHUB_TOKEN +
                    '@github.com/' + config.GHPAGES.username + '/' + config.GHPAGES.repo + '.git',
                    branch: 'gh-pages'
        }));
});
