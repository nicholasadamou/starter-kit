'use-strict';

var config = require('./config.js')();

var src = config.root + config.src;
var dest = config.root + config.dist;

module.exports = {
	to: {
		src: src,
        dist: dest,
		pug: {
			in: src +  config.views + '*.pug',
			out: dest
		},
		sass: {
			in: src + config.sass,
			out: dest + config.css
		},
		js: {
			in: src + config.js.dir + "*.js",
			out: dest + 'assets/' + config.js.dir
		},
		images: {
			in: src + config.images + '/**/*.*',
			out: dest + config.images
		},
		docs : {
        	in: src + config.docs + '/*.pdf',
        	out: dest + config.docs
        },
       	vendors: {
       		sass: src + config.vendors + '/**/*.min.css',
   			js: src + config.vendors + '/**/*.min.js'
       	},
		favicons: {
			in: src + config.favicons + '/*.*',
			out: dest + config.favicons
		}
	}
};