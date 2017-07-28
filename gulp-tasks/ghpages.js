module.exports = function(gulp, $, log, config) {
    return function() {
        log('->  Deploying to Github Pages');
        // To deploy with Travis CI:
        //   1. Generate OAuth token on GitHub > Settings > Application page
        //   2. Encrypt and save that token into the `.travis.yml` file by running:
        //      `travis encrypt GITHUB_TOKEN="<your-oauth-token>" --add`

        const 
            USERNAME = 'USERNAME',
            REPO = 'REPO';

        return gulp.src(config.build + '**/*')
            .pipe($.if('**/robots.txt', !argv.production ? $.replace('Disallow:', 'Disallow: /') : $.util.noop()))
            .pipe($.ghPages({
                remoteUrl: 'https://' + process.env.GITHUB_TOKEN + 
                        '@github.com/' + USERNAME + '/' + REPO + '.git',
                        branch: 'gh-pages'
            }));
    }
}