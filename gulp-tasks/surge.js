module.exports = function(gulp, $, log, config) {
    return function() {
        log('-> Deploying ./build to ' + config.SURGE.domain)

        return $.surge(config.SURGE);
    }
}