'use-strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: true }),
    argv = require('argv');

var path = require('../../paths.js'),
    config = require('../../config.js')();

gulp.task('ghpages', function() {
    console.log('->  Deploying to Github Pages');
    // To deploy with Travis CI:
    //   1. Generate OAuth token on GitHub > Settings > Application page
    //   2. Encrypt and save that token into the `.travis.yml` file by running:
    //      `travis encrypt GITHUB_TOKEN="<your-oauth-token>" --add`

    const 
        USERNAME = 'USERNAME',
        REPO = 'REPO';

    return gulp.src(path.to.dist + '**/*')
        .pipe($.if('**/robots.txt', !argv.production ? $.replace('Disallow:', 'Disallow: /') : $.util.noop()))
        .pipe($.ghPages({
            remoteUrl: 'https://' + process.env.GITHUB_TOKEN + 
                    '@github.com/' + USERNAME + '/' + REPO + '.git',
                    branch: 'gh-pages'
        }));
});