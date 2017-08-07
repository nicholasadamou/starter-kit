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
			in: src + config.js + '/**/*.js',
			out: dest + 'assets/' + config.js
		},
		images: {
			in: src + config.images + '/**/*.*',
			out: dest + config.images
        },
       	vendors: {
       		in: src + config.vendors,
       		out: dest + config.vendors
       	},
		favicons: {
			in: src + config.favicons + '/**/*.*',
			out: dest + config.favicons
		}
	}
};