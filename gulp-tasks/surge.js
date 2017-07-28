module.exports = function(config) {
    return function() {
        console.log('-> Deploying ./build to ' + config.SURGE.domain)

        return $.surge(config.SURGE);
    }
}